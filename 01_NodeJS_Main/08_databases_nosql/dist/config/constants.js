import path from 'node:path';
import url from 'url';
// FUNCTIONS
const getDirectoryPath = () => {
    const filePath = url.fileURLToPath(import.meta.url);
    const dirPath = path.dirname(filePath);
    let dirname = path.join(dirPath, '..', '..');
    return dirname;
};
// Below are the different ways of exporting constants
// 1. Class
// *********                                  *********
// export class Constants {
//   static readonly space = '\n';
//   static readonly NODE_ENV = process.env.NODE_ENV || 'development';
//   static readonly __dirname: getDirectoryPath(),
// }
// import Constants from "./constants.ts"
// console.log(Constants.space)
// OR
// For Big Projects
// LINK: https://medium.com/codex/how-to-share-constants-in-typescript-project-8f76a2e40352
// 2. Namespace
// *********                                  *********
// export namespace Constants {
//   export const space = '\n';
//   export const NODE_ENV = process.env.NODE_ENV || 'development';
//   export const __dirname: getDirectoryPath();
// }
// import Constants from "./constants.ts"
// console.log(Constants.space)
// IMPORT WITH DESTRUCTURING
// import {space, NODE_ENV} from "./constants.ts"
// console.log(space)
// OR
// 3. As const
// *********                                  *********
export const Constants = {
    space: '\n',
    NODE_ENV: process.env.NODE_ENV || 'development',
    __dirname: getDirectoryPath(),
    domain: process.env.PROJECT_DOMAIN || 'http://localhost:3000',
    MONGODB_URL: 'mongodb://localhost:27017' ||
        process.env.MONGODB_URL ||
        'mongodb+srv://<username>:<password>@<atlas_db>.9wxaszh.mongodb.net/?retryWrites=true&w=majority',
    mongodb_name: 'mongodb_practice',
};
// console.log(' NODE_ENV: ', process.env.NODE_ENV);
// import Constants from "./constants.ts"
// console.log(Constants.space)
