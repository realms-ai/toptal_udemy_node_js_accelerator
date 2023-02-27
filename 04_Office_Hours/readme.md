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
