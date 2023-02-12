import express from 'express';

import { space, __dirname } from '../app.js';
import path from 'node:path';

const router = express.Router();

router.use('/', (req, res) => {
  console.log(space, 'Middleware is in User Page');
  // res.send('<h1>user Page</h1>');
  res.sendFile(path.join(__dirname, 'views', 'user.html'));
});

export { router as userRoutes };
