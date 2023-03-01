import path from 'node:path';
import url from 'url';
// FUNCTIONS
const getDirectoryPath = () => {
    try {
        const filePath = url.fileURLToPath(import.meta.url);
        const dirPath = path.dirname(filePath);
        let dirname = path.join(dirPath, '..', '..');
        return dirname;
    }
    catch (error) {
        return '';
    }
};
export const Constants = {
    space: '\n',
    NODE_ENV: process.env.NODE_ENV || 'development',
    __dirname: getDirectoryPath(),
    domain: process.env.PROJECT_DOMAIN || 'http://localhost:3000',
    MONGODB_URL: 'mongodb://192.168.0.20:27017' ||
        process.env.MONGODB_URL ||
        'mongodb+srv://<username>:<password>@<atlas_db>.9wxaszh.mongodb.net',
    MONGODB_URL_QUERY: '?retryWrites=true&w=majority',
    mongodb_name: 'cookies_sessions',
    SECRET: 'test',
};
