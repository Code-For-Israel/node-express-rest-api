import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'

const config = new pulumi.Config()

// Optional config
const dbPort = config.getNumber('dbPort') || 5432
const containerPort = config.getNumber('containerPort') || 3001
const cpu = config.getNumber('cpu') || 512
const memory = config.getNumber('memory') || 512
const nodeEnvironment = config.get('nodeEnvironment') || 'development'

// mandatory config and secrets
const dbUserName = config.require('dbUserName')
const dbName = config.require('dbName')
const dbPassword = config.requireSecret('dbPassword')
const jwtPrivateKey = config.requireSecret('jwtPrivateKey')
const jwtPublicKey = config.requireSecret('jwtPublicKey')

const prefix = `${pulumi.getProject()}-${pulumi.getStack()}`

// Get the default VPC
const vpc = new awsx.ec2.DefaultVpc('defaultVpc')

// An ECS cluster to deploy into
const cluster = new awsx.classic.ecs.Cluster('cluster', {
  name: `${prefix}-cluster`,
})

// Create a new subnet group for the database.
const subnetGroup = new aws.rds.SubnetGroup('dbsubnets', {
  subnetIds: vpc.publicSubnetIds,
})

// Create a new database, using the subnet and cluster groups.
const db = new aws.rds.Instance('db', {
  port: dbPort,
  engine: 'postgres',
  instanceClass: aws.rds.InstanceTypes.T3_Micro,
  allocatedStorage: 10,
  dbSubnetGroupName: subnetGroup.id,
  vpcSecurityGroupIds: cluster.securityGroups.map(g => g.id),
  username: dbUserName,
  password: dbPassword,
  skipFinalSnapshot: true,
  dbName: dbName,
  identifier: `${prefix}-db`,
})

// An ALB to serve the container endpoint to the internet
const loadbalancer = new awsx.lb.ApplicationLoadBalancer('loadbalancer', {
  name: `${prefix}-lb`,
  defaultTargetGroup: {
    name: `${prefix}-tg`,
    port: containerPort,
    protocol: 'HTTP',
    targetType: 'ip',
  },
})

// An ECR repository to store our application's container image
const repo = new awsx.ecr.Repository('repository', {
  name: `${prefix}-repo`,
  lifecyclePolicy: {
    rules: [{ tagStatus: 'untagged', maximumAgeLimit: 14, description: 'Remove untagged images older than 14 days' }],
  },
})

// Build and publish our application's container image from ./app to the ECR repository
const image = new awsx.ecr.Image('image', {
  repositoryUrl: repo.url,
  path: '../',
  env: {
    PORT: containerPort.toString(),
  },
})

// Deploy an ECS Service on Fargate to host the application container
const service = new awsx.ecs.FargateService('service', {
  name: `${prefix}-service`,
  cluster: cluster.cluster.arn,
  taskDefinitionArgs: {
    container: {
      image: image.imageUri,
      cpu: cpu,
      memory: memory,
      essential: true,
      portMappings: [
        {
          containerPort: containerPort,
          hostPort: containerPort,
          targetGroup: loadbalancer.defaultTargetGroup,
        },
      ],
      healthCheck: {
        command: ['CMD-SHELL', `curl -f http://127.0.0.1:${containerPort}/health-check || exit 1`],
      },
      environment: [
        { name: 'NODE_ENV', value: nodeEnvironment },
        { name: 'PORT', value: containerPort.toString() },
        { name: 'JWT_PRIVATE_KEY', value: jwtPrivateKey },
        { name: 'JWT_PUBLIC_KEY', value: jwtPublicKey },
        { name: 'JWT_TOKEN_EXPIRY', value: '1h' },
        { name: 'JWT_REFRESH_TOKEN_EXPIRY', value: '7d' },
        {
          name: 'DATABASE_URL',
          value: pulumi.interpolate`postgresql://${dbUserName}:${dbPassword}@${db.address}:${db.port}/${dbName}?schema=public`,
        },
      ],
    },
  },
})

// The URL at which the container's HTTP endpoint will be available
export const url = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`
export const dbUrl = pulumi.interpolate`${db.address}:${db.port}`
