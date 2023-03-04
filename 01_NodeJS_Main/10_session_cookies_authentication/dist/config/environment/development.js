import express from 'express';
import { app } from '../application.js';
import path from 'path';
import { Constants } from '../constants.js';
const { __dirname } = Constants;
// Adding static path of assets
const staticPaths = () => {
    // console.log('Static Path', path.join(__dirname, 'dist/app/assets'));
    app.use('/', express.static(path.join(__dirname, 'dist/app/assets'), {
        etag: false,
        index: false,
    }));
    app.use('/', express.static(path.join(__dirname, 'dist/lib/public/images'), {
        etag: false,
        index: false,
    }));
    // If we store the path of the file in the db, then use the below middleware to trigger static assets
    app.use('/orders', express.static(path.join(__dirname, 'dist/lib/public/pdf/orders'), {
        etag: false,
        index: false,
    }));
};
export { staticPaths };
