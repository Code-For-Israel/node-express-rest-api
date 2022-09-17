# Node Express Rest Api Template

### The stack

1. node - runtime
2. express - Framework
3. prisma - ORM
4. postgres - DB

---

## Configuration

In order to run the server, you must create a .env file
It is not in the repo.

### create one by running:

```sh
echo "NODE_ENV=development
PORT=3000
JWT_PRIVATE_KEY=<RSA PRIVATE KEY>
JWT_PUBLIC_KEY=<RSA PUBLIC KEY>
JWT_TOKEN_EXPIRY=1h
JWT_REFRESH_TOKEN_EXPIRY=7d
DATABASE_URL=postgresql://template_db_user:Aa123456@localhost:5432/template_db?schema=public
" > .env
```

### Notice that in the file above requires a RSA public and private keys:

```sh
$ openssl genrsa -out private.pem 2048
$ openssl rsa -in private.pem -pubout -out public.pem

# copies the key as 1 line to your clipboard,
# paste this one instead of <RSA PRIVATE KEY>
$ awk -v ORS='\\n' '1' private.pem | pbcopy

# paste this one instead of <RSA PUBLIC KEY>
$ awk -v ORS='\\n' '1' public.pem | pbcopy
```

## Getting started

Without docker-compose:

```sh
$ npm install
$ npm run start:dev:migrate
```

With docker-compose (creates postgres & pgadmin for you):

```sh
$ docker-compose up
```

## Useful commands

```sh
# Runs pending migrations them starts the server in dev mode with nodemon
$ npm run start:dev:migrate

# Generates a new migration after updating prisma schema
$ npm run migrations:generate <migration-name>

# Gemerates prisma client again after updating prisma schema
$ npx prisma generate
```
