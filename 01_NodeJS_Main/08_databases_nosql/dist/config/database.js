import { MongoClient } from 'mongodb';
import { Constants } from './constants.js';
const { MONGODB_URL, mongodb_name } = Constants;
let _db;
console.log('MongoDB URL: ', MONGODB_URL);
const client = new MongoClient(MONGODB_URL, {
// serverApi: ServerApiVersion.v1,
});
const mongoConnect = (callback) => {
    client
        .connect()
        .then((result) => {
        console.log('connected to mongoDB');
        _db = client.db(mongodb_name);
        callback(client);
    })
        .catch((err) => {
        console.log('Error occured while connected to MongoDB: ', err);
        throw err;
    });
};
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
};
export { mongoConnect, getDb };
