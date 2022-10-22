# Infrastructure & Deployment

_The infrastructure only needs to be setup once for both `node-express-rest-api` template and `react-mui-rtk`, it's the same README for both_

## Infrastructure - Pulumi

We are using pulumi to create our needed AWS infrastructure and deploy to it.<br>
The Pulumi setup will use an s3 bucket as it's backend.<br>
The Pulumi is divided into to 2 project with one stack each (a stack is like an environment).

1. under the folder `node-express-rest-api/infra` we have the `node-rest-api` project with `rest-api-dev` stack
1. under the folder `react-mui-rtk/infra` we have the `react-frontend` project with `frontend-dev` stack, notice that the frontend stack refers to the rest-api stack, so api must be created first

## Deployment - Github Actions

Currently the following github actions exist for both frontend and backend

1. build.yaml - will build the project each commit & PR to `main` branch
2. release.yaml - will create the AWS resources needed and deploy to them when creating a tag with the following structure `v*.*.*`

## Prerequisites

- Download pulumi cli from [here](https://www.pulumi.com/docs/get-started/install/)
- Download aws cli from [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions)
- An AWS account
- Cloning both `node-express-rest-api` and `react-mui-rtk` templates and renaming them for you project

## Configure AWS

1. Create an AWS user for pulumi to use ([go to IAM](https://us-east-1.console.aws.amazon.com/iamv2/home#/users))

   call the user `pulumi-access-key`
   Check "Access key - Programmatic access" checkbox
   Go to "attach existing policies directly" choose the following:

   - AmazonS3FullAccess
   - CloudFrontFullAccess
   - AmazonEC2FullAccess
   - AmazonEC2ContainerRegistryFullAccess
   - AmazonECS_FullAccess
   - AmazonRDSFullAccess
   - CloudWatchFullAccess

   **_download the CSV or copy the Access key ID & Secret access key_**

2. Go to [S3](https://s3.console.aws.amazon.com/s3/buckets?region=eu-west-1) and create a bucket named `{project-name}-pulumi-infra` (it has to be globally unique) choose **eu-west-1** region, then the "Create bucket" button

## Configure github action

1. Go to `.github/release.yaml` in both projects and replace the `cloud-url` param with the bucket name you just created `s3://{project-name}-pulumi-infra`
2. Go to both your github repositories and in Settings tab -> Actions -> New repository secret and create the following secrets:

   - AWS_ACCESS_KEY_ID - from the csv
   - AWS_SECRET_ACCESS_KEY - from the csv
   - AWS_REGION - preferably eu-west-1
   - PULUMI_CONFIG_PASSPHRASE - whatever you want

# Configure pulumi

1. You can change the pulumi project name in `Pulumi.yaml`, `Pulumi.rest-api-dev.yaml` & `Pulumi.frontend-dev.yaml` to match you project, it's preferable to do so before setting the secrets and environment variables
2. Setting up Pulumi locally and adding secrets
   - In you terminal export the following environment variable same as above
   ```sh
   $ export AWS_ACCESS_KEY_ID=
   $ export AWS_SECRET_ACCESS_KEY=
   $ export AWS_REGION=
   $ export PULUMI_CONFIG_PASSPHRASE=
   ```
   - Connect pulumi to use our bucket as a backend
   ```sh
   $ pulumi login s3://{project-name}-pulumi-infra
   $ cd node-express-rest-api/infra # path may vary depending on where you clone it
   $ pulumi stack init rest-api-dev
   $ cd react-mui-rtk/infra # path may vary depending on where you clone it
   $ pulumi stack init frontend-dev
   ```
   - Now set pulumi secrets
   ```sh
   $ pulumi config set --secret dbPassword <some-password>
    # notice the -- and the '' otherwise setting an RSA key from terminal WILL NOT work
   $ pulumi config set --secret jwtPrivateKey -- '<some-rsa-private-key>'
   $ pulumi config set --secret jwtPublicKey -- '<some-rsa-public-key>'
   ```
   - Notice that Pulumi has additional environment variable defined in `Pulumi.rest-api-dev.yaml` & `Pulumi.frontend-dev.yaml` you can change them manually in the yaml.
