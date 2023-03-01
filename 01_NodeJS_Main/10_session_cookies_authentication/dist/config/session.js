import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import { Constants } from './constants.js';
const { MONGODB_URL, mongodb_name, SECRET } = Constants;
const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore({
    uri: `${MONGODB_URL}/${mongodb_name}`,
    collection: 'appSessions',
});
// Catch errors
store.on('error', function (error) {
    console.log(error);
});
// console.log(require('crypto').randomBytes(256).toString('base64'));   // To Generate Secret
// Handling Session
// Session is stored at server side
// Cookie is stored at browser side where only ID is send whose value is kept at memoryStore on server side
const serverSession = (app) => {
    const cookieAge = 60 * 60 * 1000; // 1 hour
    app.use(session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            expires: new Date(Date.now() + cookieAge),
            maxAge: cookieAge,
            path: '/',
            httpOnly: true,
        },
        store: store,
    }));
};
export { serverSession };
