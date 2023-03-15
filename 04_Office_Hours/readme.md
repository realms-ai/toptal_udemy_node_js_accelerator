# Office Hours notes

This notes include things which are not in the notes

## Week 1

- Recording 1

  - [Auth0](https://auth0.com/): To use tokens to authenticate the application
  - [NestJS](https://nestjs.com/) Framework to build the app

- Recording 2

  - [Monorepo](https://monorepo.tools/) What is Monorepo?
  - [Nx](https://nx.dev/): Learn aboutn build system / generator for monorepo apps
  - [Turbo](https://turbo.build/) Incremental bundler and build system optimized for JS and TS
  - [Netlify](https://www.netlify.com/blog/2020/04/21/deploying-nx-monorepos-to-netlify/) How to deploy nx monorepos to Netlify
  - [VS Code Debugging](https://code.visualstudio.com/docs/typescript/typescript-debugging)
  - Some **NPM** Packages
    - nodemon
    - dotenv
    - chance: help to mock data for your tests
    - commitizen: git commit with conventions
    - prettier
    - np: a better npm publish
    - @eslint/config: analyses your code and help you find issues
    - ts-node: Typescript execution environment & REPL for node.js
    - **helmet**: helps secure express apps by setting various HTTP headers
    - mutler: multipart upload files

  ```
    yarn global add express
    npm i -g nx nodemon
    yarn list
    yarn list --depth=n
    yarn outdated
    yarn update
    npx create-nx-workspace
    yarn install -D @nrwl/node @nrwl/express
    nx g @nrwl/node:application pure-ts-app
    nx serve pure-ts-app
    nx g @nrwl/express:app users
    nx serve users
    yarn add -D nodemon commitizen prettier np eslint ts-node
    yarn add dotenv chance
  ```

## Week 2

- Recording 1

  - Understand difference between below by adding 3 different requests in express app
    - ReadFileSync
    - ReadFile
    - CreateReadStream(filename, 'utf-8'); readable.pipe(res);
  - Node Events
    - Use of **nx node library** to create _custom events_

  ```
    nx g lib ts_event

  ```

- Recording 2
  - [JWT](https://jwt.io/)
  - [JOI](https://www.npmjs.com/package/joi): Data validator for JS
  - [ZOD](https://www.npmjs.com/package/zod): Data validator for TS
  - [Express Validator](https://www.npmjs.com/package/express-validator): Express.js middleware that wraps _validator.js_ validator and sanitizer functions
  - [Node Framework start](https://github.com/VanoDevium/node-framework-stars)
  - Keep all micro-services in monorepo
  - **express.json()** to tell the application of _Content-Type_
  - Use of **all** in express middleware _.all()_

## Week 3

- Recording 1: Rest APIs

- Recording 2: MongoDB and Relationship databases

## Week 4

- Recording 1: **User Authentication**

  - Manage Auth0 (24.50 mins)
  - Applications => (SSO Integrations)

    - Applications => Regular Web Applications

      - ```
          write a config
          app.use(auth(config))
        ```
      - Go to the application
        - Quickstart (for callback)
        - Settings for config data
        - Connections for db, fb, gmail
        - Organizations

    - APIs
      - create API
      - Machine to machine application
        - attach the application name
        - with permissions

  - Authentication
  - Auth0, Cognito, Firebase, keycloak
    - Database connections
    - Social connections (Fb/Gmail)
  - User Management
    - Users
      - Define metadata in _Details_
    - Roles
      - Define roles and assign to the users
  - Branding
    - Universal Login
    - Email Templates
  - Auth Pipeling

    - Rules
    - Hooks

  - Actions (1:14:00)

    - Flows
    - Library

  - Packages (45:00 mins)
    - express-oauth2-jwt-bearer
    - middleware to check and validate the access tokens
  - Auth Controller (routes)
    - Login
    - Profile
  - Auth Routes (45:36 mins)
    - import {requiresAuth} from 'express-openid-connect' (For checking auth at profile)
  - Auth Service (48:00 mins, 53:30 mins)
    - import {ManagementClient, Role} from 'auth0'
    - create new user (1:03:30 mins)

- Recording 2
  - Passport module in nestjs
  - Integrate with Auth0 (32:15 mins)
  - Payload (41:00 mins)
  - @nestjs/common (PermissionRestGuard) (43:00 mins)
  - add permissions to routes
  - middelware
  - interceptor

## Week 5

- Recording 1: **Microservices NestJS** (Session)

  - Manage API gateway with Node.JS
    - http-proxy-middleware
    - express-gateway
    - GraphQL (Apollo Federation)
    - Kafkajs NPM (32:00 mins)
  - Create API gateway nest app (1:00:00 mins)
    - nx g @nrwl/nest:app api-gateway
    - Create proxy middleware for users and products (1:03:00 mins)
    - On proxy request (NEST)
      - take JWT
      - validate JWT
      - find a wy to send relevant user decoded data to user micro-services
      - use CORS with origin (API Gateway only)
    - ON proxy request (Express)
    - docker-compose (1:21:16 mins)

- Recording 2
  - Information on products task
  - NPM library
    - serverless-http
  - Plugins
    - serverless-webpack
    - serverless-offline
  - Github Actions Serverless

## Week 6

- Recording 1

  - Apollo Graph Developer
  - Complete udemy optional course
  - Avoid N+1 problem with dataloader
  - npm i @nestjs/passport passport passport-jwt @nestjs/jwt
  - autogenerate FE application (Pg 8)
  - JwtGQLAuthGuard to save products with authentication

- Recording 2 (Internal Microservice Communication with GraphQL)
  - Microservices (NAT protocol)
  - GraphQL Federation Module
  - https://github.com/makinhs/nestjs-graphql-medium
  - SupergraphSdl
  - Joi (Express validation package), express-joi-validation
  - class-validator class-transformer in NestJS

## Week 7 (Testing)

- Recording 1

  - supertest
  - assert
  - @jest/globals
  - chance (For random data)

- Recording 2
  -Auth 0 (Management API)
  - @nestjs/testing (under the hood use JEST)
  - jest watch, jest coverage (to see code which is not covered)
  -

## Week 8

- Recording 1 (CI/CD)
  - Github Action
  - Bitbucket CI/CD
  - Circle CI/CD
  - AWS Codepipeline
  -
