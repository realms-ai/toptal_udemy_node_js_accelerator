import path from 'node:path';
import url from 'url';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// FUNCTIONS
const getDirectoryPath = () => {
  try {
    const filePath = url.fileURLToPath(import.meta.url);
    const dirPath = path.dirname(filePath);
    let dirnamee = path.join(dirPath, '..', '..');

    // OR
    const __filename: string = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return dirnamee || __dirname;
  } catch (error) {
    return '';
  }
};

export const Constants = {
  space: '\n',
  NODE_ENV: process.env.NODE_ENV || 'development',
  __dirname: getDirectoryPath(),
  domain: process.env.PROJECT_DOMAIN || 'http://localhost:3000',
  MONGODB_URL:
    'mongodb://192.168.0.20:27017' ||
    process.env.MONGODB_URL ||
    'mongodb+srv://<username>:<password>@<atlas_db>.9wxaszh.mongodb.net',
  MONGODB_URL_QUERY: '?retryWrites=true&w=majority',
  mongodb_name: 'cookies_sessions',
  SECRET: 'test',
  CRYPTO_KEY:
    '7b46d698504461a43f46fdb7ebfdd9455745094679153a8bb13d4c39e9679182',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
};
