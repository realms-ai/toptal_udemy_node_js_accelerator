import path from 'node:path';
import url from 'url';
// FUNCTIONS
const getDirectoryPath = () => {
    const filePath = url.fileURLToPath(import.meta.url);
    const dirPath = path.dirname(filePath);
    let dirname = path.join(dirPath, '..', '..');
    return dirname;
};
export const Constants = {
    space: '\n',
    NODE_ENV: process.env.NODE_ENV || 'development',
    __dirname: getDirectoryPath(),
    domain: process.env.PROJECT_DOMAIN || 'http://localhost:3000',
    MONGODB_URL: 'mongodb://localhost:27017' ||
        process.env.MONGODB_URL ||
        'mongodb+srv://<username>:<password>@<atlas_db>.9wxaszh.mongodb.net/?retryWrites=true&w=majority',
    mongodb_name: 'mongoose_practice',
};
