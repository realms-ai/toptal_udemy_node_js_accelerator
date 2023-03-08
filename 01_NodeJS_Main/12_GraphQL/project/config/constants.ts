import path from 'node:path';
import url from 'url';

// FUNCTIONS
const getDirectoryPath = () => {
  try {
    const filePath = url.fileURLToPath(import.meta.url);
    const dirPath = path.dirname(filePath);
    let dirname = path.join(dirPath, '..', '..');
    return dirname;
  } catch (error) {
    return '';
  }
};

export const Constants = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3001,
  SOCKET_PORT: process.env.SOCKET_PORT
    ? parseInt(process.env.SOCKET_PORT)
    : 3002,
  space: '\n',
  NODE_ENV: process.env.NODE_ENV || 'development',
  __dirname: getDirectoryPath(),
  domain: process.env.PROJECT_DOMAIN || 'http://localhost:3000',
  MONGODB_URL:
    'mongodb://192.168.0.20:27017' ||
    process.env.MONGODB_URL ||
    'mongodb+srv://<username>:<password>@<atlas_db>.9wxaszh.mongodb.net',
  MONGODB_URL_QUERY: '?retryWrites=true&w=majority',
  mongodb_name: process.env.MONGODB_NAME || 'cookies_sessions',
  SECRET:
    process.env.NODE_SECRET ||
    'l8JTM2QJ4sdRx+Ql/lhpZqo6zws53l0FI8LWV67yDxF07aZH8Tt/K4Tldcln8t4b2TaDn2NoQVx6SmO6Ufiogrn4VnQLO6nk8xhXzXPq1sEDfh4mnBTXHDBDqBQ6LLHLxv0MWB3lvR5T/pw5orlBWJW2zR4P5u++u3UvuHRiTocqeHuCvado6KZbX5vEjMUIGZ+DOsLHmN5mrIJOJXSYAwIcdEDi7F9eANxanSn/IETuBVIWwpPODSuj4NpMeWhKd8YxRFIhrGBnWGgfMaC2cappIuw1+3dLoQUFWK8deJcJCBvP5TJhxg/cUWSYFBOGTL1OzQAPplKNn1HWQXo2Ig==',
  CRYPTO_KEY:
    process.env.NODE_CRYPTO_KEY ||
    '7b46d698504461a43f46fdb7ebfdd9455745094679153a8bb13d4c39e9679182',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
};
