import express from 'express';
import { app } from '../application.js';
import path from 'path';

// Adding static path of assets
const staticPaths = () => {
  app.use(express.static(path.join(__dirname, 'dist/public/assets')));
};

export { staticPaths };
