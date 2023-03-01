import mongoose from 'mongoose';

import { Constants } from './constants.js';

const { MONGODB_URL, mongodb_name, MONGODB_URL_QUERY } = Constants;

const mongooseConnect = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(`${MONGODB_URL}/${mongodb_name}${MONGODB_URL_QUERY}`);
};

export { mongooseConnect };

// import { Db, MongoClient, ServerApiVersion } from 'mongodb';

// let _db: Db;
// console.log('MongoDB URL: ', MONGODB_URL);

// const client = new MongoClient(MONGODB_URL, {
//   // serverApi: ServerApiVersion.v1,
// });

// const mongoConnect = async () => {
//   await client.connect();
//   _db = await client.db(mongodb_name);
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw 'No database found';
// };
