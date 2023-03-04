import express from 'express';
// import { app } from './application.js';
import { productRoutes } from '../app/controllers/products.js';
import { userRoutes } from '../app/controllers/users.js';
import { Constants } from './constants.js';
import { homeRoutes } from '../app/controllers/home.js';
import { app } from './application.js';
import { cartRoutes } from '../app/controllers/cart.js';
import { orderRoutes } from '../app/controllers/orders.js';
import { authRouter } from './middleware.js';
import { apiHomeRoutes } from '../app/controllers/api/home.js';
import { apiPostRoutes } from '../app/controllers/api/posts.js';
const router = express.Router();
const { space, __dirname } = Constants;
const routes = () => {
    // Initiating API Routes
    app.use('/api/posts', authRouter, apiPostRoutes);
    // app.use('/api/users', apiuserRoutes);
    // app.use('/api/cart', apicartRoutes);
    // app.use('/api/orders', apiorderRoutes);
    app.use('/api', apiHomeRoutes);
    // Initiating View Routes
    app.use('/products', authRouter, productRoutes);
    app.use('/users', userRoutes);
    app.use('/cart', cartRoutes);
    app.use('/orders', orderRoutes);
    app.use('/', homeRoutes);
};
export { routes };
