# MVC structuring, Dynamic Routing & Modelling

## How to start

1. Project development is done a folder **project**
2. **project** folder structure

   - app: (Organizes the application components in MVC format)
   - config: contains all the configuration of the project
   - db: store migration files
   - lib: libraries which are not part of the project but needed for interaction. e.g. Payment gateways, or interaction with 3rd party apps.
   - public: this will be used to store minify files for production
   - test: used to write and run test cases
   - tmp: used to store temporary files for intermediate processing
   - log: used to write log files

3. [More on MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

4. [Express Routing Docs](https://expressjs.com/en/guide/routing.html)
