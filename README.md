# Haverim Lerefua Backend

## Tech Stack
* Node.js - TypeScript (Runtime)
* Express (Framework)
* Prisma (ORM)
* Postgres (DB)

### The Infra (AWS)
* [Serverless](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml) (IaC Framework)
* Lambda with API Gateway
* RDS (Postgres)

## Getting Started

### Prerequisite
* [Git](https://git-scm.com/download/win)
* [Node.js Version 18](https://nodejs.org/en/download)
* [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)
* Serverless: ```npm install -g serverless```
* [AWS CLI V2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* AWS Credentials Setup: ```aws configure```
* AWS Profiles Setup at: ```~/.aws/credentials```
* For local debugging: ```npm install -g nodemon```

### Run Locally
* Uncomment dev configuration in .env file
* Start the express server and listen to changes: ```nodemon```
* Access by ```localhost:<your port from .env file>```

### Deployment
* Install dependencies: ```npm install```
* Deploy to AWS: ```npm run deploy```


If you're behind a proxy, use this workaround: ```$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"```