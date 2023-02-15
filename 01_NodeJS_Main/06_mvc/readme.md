# MVC structuring, Dynamic Routing & Modelling

## How to start

1. Project development is done in a folder **project**, where developers write the code in Typescript, SASS and that code is compiled to JS, CSS in **dist** folder

2. Once development is done, **dist** folder could be used to minify the files for _production_ deployment

3. **project** folder structure

   - app: (Organizes the application components in MVC format)
   - config: contains all the configuration of the project
     - you can add global middleware configuration in **application.ts** file and use **environment** folder to add environment specific configurations
   - db: store migration files
   - lib: libraries which are not part of the project but needed for interaction. e.g. Payment gateways, or interaction with 3rd party apps.
   - public: this will be used to store minify files for production environment
   - test: used to write and run test cases
   - tmp: used to store temporary files for intermediate processing
   - log: used to write log files

4. [More on MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

5. [Express Routing Docs](https://expressjs.com/en/guide/routing.html)

## How to run the project

1. Check _package.json, project/tsconfig.json, project/app/assets/tsconfig.json_ file for configurations and scripts

2. **project/app/views** folder is a symlink of folder **dist/app/views**

   ```
      ln -sr dist/app/views project/app/
   ```

3. Have stored the environment variables in a file

   - **config/constants** (created environment variables for secrets and calling them in a file via _process.env_)

     - If you are using bash profile
       ```
         echo "export NODE_ENV=test" >> ~/.bashrc && source ~/.bashrc
         exec bash
       ```
     - If you are using zsh profile
       ```
         echo "export NODE_ENV=test" >> ~/.zshrc && source ~/.zshrc
         exec zsh
       ```

   - Another way is to use **dist/.env** file to store the variables
     - _Note:_ Never store your secrets in .env file rather import them via **process.env**
