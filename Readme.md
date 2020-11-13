# Introduction 

A sample code to do full text search using meilisearch.

In order to setup meilisearch first of all you need to install it.

First of all:

```sh

curl -L https://install.meilisearch.com | sh
./meilisearch

```

Once the server starts then in order to start server ``` yarn start:server ```
after that you can start client by ``` yarn start:client```

## Server

Server is a simple fastify server and it seeds the fake data which is store as a json file in the server folder. It listens to port 3000

## Client

Client application is using react.