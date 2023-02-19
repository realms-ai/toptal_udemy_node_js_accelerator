import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('node_practice', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 2,
    idle: 60000,
    evict: 300,
  },
});

// IF you are working with raw mysql without sequelize, then below is the way to do so.
// import mysql from 'mysql2';
// import * as mysqlPromise from 'mysql2/promise';

// const connectionOptions = {
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'node_practice',
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
// };

// export const db = mysql.createPool(connectionOptions);

// export const db1 = db.promise();

// export const db2 = mysqlPromise.createPool(connectionOptions);

// *********************************************************
// EXECUTE BELOW CODE TO FETCH DATA WITH DIFFERENT JS STYLES
// import { db, db1, db2 } from './database.js';
// const data = async () => {
//   db.execute('SELECT * FROM products', (err, result) => {
//     if (err) console.log('DB Error: ', err);
//     else console.log('Products from Callback DB: ', result);
//   });

//   db1
//     .execute('SELECT * FROM products')
//     .then(([result, fields]) => {
//       console.log('Products from Promise DB: ', result);
//     })
//     .catch(console.log);

//   const [products, fields] = await db2.execute('SELECT * FROM products');
//   console.log('Products from Async Await DB: ', products);
// };
// data();
