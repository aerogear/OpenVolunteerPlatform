# Create the app building stage where compilation occures

FROM node:14-alpine as compiler

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 alpine-sdk bash && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools 

WORKDIR /usr/src/app
COPY . .

RUN npm install && npm run build


# Create a production ready app with only prod dependencies
FROM node:14-alpine as builder
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 alpine-sdk bash && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools 
WORKDIR /usr/src
COPY package.json . 
RUN npm install --only=production


# Create a production ready app with only prod dependencies and compiled src
FROM node:14-alpine

WORKDIR /usr/src

COPY package.json . 
ENV NODE_ENV=production
COPY --from=compiler /usr/src/app/dist app
COPY --from=builder  /usr/src/node_modules node_modules 

COPY admin admin
COPY website website
COPY src/config/keycloak.json app/config
COPY mongodump mongodump
COPY model model
COPY .env app

EXPOSE 4000
CMD [ "node", "app/index.js" ]
