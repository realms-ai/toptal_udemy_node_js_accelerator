import { writeFile } from 'node:fs/promises';

const text = 'This is a test - and it should be stored in a file';

writeFile('./node_test.txt', text).then(() => {
  console.log('Wrote to a file');
});

import express from 'express';
import bodyParser from 'body-parser';
import { todosRouter } from './routes/todos.js';
import debug from 'debug';

const app = express();
const log = debug('app:startFile');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  log('Some Middleware');
  next();
});
app.use('/todos', todosRouter);
log('App running at PORT: 3000');
app.listen(3000);
