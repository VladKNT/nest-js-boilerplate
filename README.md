<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A server-side boilerplate using  <a href="https://typeorm.io/#/">TypeOrm</a> and a progressive <a href="http://nodejs.org" target="blank">Node.js</a>
    framework for building efficient and scalable server-side applications, heavily inspired by 
    <a href="https://angular.io" target="blank">Angular</a>.
   </p>

## Description

[Nest.js](https://github.com/nestjs/nest) boilerplate starter repository.

## Installation

```bash
$ yarn
```
[Docker](https://docs.docker.com/v17.09/engine/installation/) and [Docker Compose](https://docs.docker.com/compose/install/) installation.

```bash
$ docker-compose up
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# run watch mode in docker container
$ docker-compose up

# run watch mode in docker container and run TypeORM migrations
$ cd scripts/
$ ./start.sh

```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run TypeORM commands
```bash
# If you don't use Docker

# create migration
$ yarn run typeorm:create "YOUR MIGRATION NAME"

# generate migration
$ yarn run typeorm:generate "YOUR MIGRATION NAME"

# run migrations
$ yarn run typeorm:run

# revert migrations
$ yarn run typeorm:revert


# If you use Docker
$ cd scripts/typeorm

# create migration
$ ./create-migration "YOUR MIGRATION NAME"

# generate migration
$ ./generate-migration "YOUR MIGRATION NAME"

# run migrations
$ ./run-nigrations

# revert migrations
$ ./revert-nigrations
```

## Run Nest commands
```bash
# If you don't use Docker, make sure that you run
$ npm i -g @nestjs/cli

#create module
$ nest g module "YOUR MODULE NAME"

#create service
$ nest g service "YOUR SERVICE NAME"

#create controller
$ nest g controller "YOUR CONTROLLER NAME"

# If you use Docker
$ cd scripts/nest

#create module
$ ./create-module "YOUR MODULE NAME"

#create service
$ ./create-service "YOUR SERVICE NAME"

#create controller
$ ./create-controller "YOUR CONTROLLER NAME"

```
