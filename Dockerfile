FROM node:16.17.0-alpine as base

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN mkdir /opt/app && chown node:node /opt/app
WORKDIR /opt/app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./

RUN rm -rf dist && rm -rf node_modules
RUN npm install
COPY --chown=node:node . .
RUN npx prisma generate 
RUN npm run build

USER node
EXPOSE $PORT
CMD [ "npm", "run", "start:dist:migrate" ]