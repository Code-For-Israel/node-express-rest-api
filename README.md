# Node Express Rest Api Template

### The stack

1. TypeScript
2. node - runtime
3. express - Framework
4. prisma - ORM
5. postgres - DB

---

### The infra (AWS)

1. Pulumi - The infra framework
2. RDS (Postgres) - DB
3. ECR - To store your docker images
4. ECS Task - To run your Rest API container
5. Load Balancer - To expose your Rest API to the world

---

## Configuration

In order to run the server, you must create a .env file
It is not in the repo.

### create one by running:

```sh
echo "NODE_ENV=development
IS_CLOUD=false
PORT=3001
JWT_PRIVATE_KEY=<RSA PRIVATE KEY>
JWT_PUBLIC_KEY=<RSA PUBLIC KEY>
JWT_TOKEN_EXPIRY=1h
JWT_REFRESH_TOKEN_EXPIRY=7d
DATABASE_URL=postgresql://template_db_user:Aa123456@localhost:5432/template_db?schema=public" > .env
```

### Notice that in the file above requires a RSA public and private keys:

```sh
$ openssl genrsa -out private.pem 2048
$ openssl rsa -in private.pem -pubout -out public.pem
```

LINUX:

```sh
# copies the key as 1 line to your clipboard,
# paste this one instead of <RSA PRIVATE KEY>
$ awk -v ORS='\\n' '1' private.pem | pbcopy

# paste this one instead of <RSA PUBLIC KEY>
$ awk -v ORS='\\n' '1' public.pem | pbcopy

```

Windows: :cry:

```sh
# copies the key as 1 line to your clipboard,
# paste this one instead of <RSA PRIVATE KEY>
$ cat private.pem | tr -d '\n' | clip

# paste this one instead of <RSA PUBLIC KEY>
$ cat public.pem | tr -d '\n' | clip

```

---

## Getting started

**(RECOMMENDED)** With docker-compose (creates postgres & pgadmin for you):

```sh
$ nvm use # This will use the node version from .nvmrc
$ npm install
$ npx prisma generate
# --build is necessary on the first time or after the Dockerfile was changed
$ docker-compose up --build
```

#### After the server is up, you can attach and debug with VSCode by pressing "Attach Docker Debugger"

<br> Without docker-compose:
<br> _Notice that without docker-compose you will need to have your own postgres_

```sh
$ nvm use # This will use the node version from .nvmrc
$ npm install
$ npx prisma generate
# Don't forget to bring your own postgres and set it in the .env file
$ npm run start:dev:migrate # Or run "Debug Locally" in VSCode
```

---

## Other useful commands

```sh
# Runs pending migrations them starts the server in dev mode with nodemon
$ npm run start:dev:migrate

# Generates a new migration after updating prisma schema
$ npm run migrations:generate <migration-name>

# Generates prisma client again after updating prisma schema
$ npx prisma generate

# SSH into a docker container (without docker-compose)
$ docker ps
# Copy you CONTAINER ID from the output of this command
$ docker exec -it <container id hash> sh

# Alternatively you can just (api is the name in our docker-compose file)
$ docker-compose run api sh
```

---

## Still missing:

- [ ] Style guide explaining the different layers and features of the template

---

## Possible additions to the template (Please PR):

### Code:

- [ ] Swagger documentation using jsdoc comments use this [article](https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do) for reference
- [ ] Validation of request DTOs using class-transformer & class-validator
- [ ] Redis integration as cache
- [ ] A separate process for running tasks using [BullMQ](https://github.com/taskforcesh/bullmq) with integrated UI (this depends on redis)

### Infra:

- [ ] Change the infra to Terraform
- [ ] Support separate pipelines github actions for "Release" & "Deploy"

---

## Infrastructure and Deployment

[Read more](infra/README.md)

## Need help?

Contact [Doron Feldman](https://github.com/doronfeldman) At [doron@gotech.io](mailto:doron@gotech.io)
