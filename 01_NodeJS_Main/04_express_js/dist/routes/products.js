import express from 'express';
import { space, __dirname } from '../app.js';
import path from 'node:path';
const router = express.Router();
router.get('/', (req, res) => {
    console.log(space, 'Middleware is in Product Page');
    // res.send(`
    //     <h1>Product Page</h1>
    //     <form action="/products" , method="POST">
    //       <input type="text" name="title" />
    //       <button type="submit">Add Product</button>
    //     </form>
    //   `);
    res.sendFile(path.join(__dirname, 'views', 'product.html'));
});
router.post('/', (req, res) => {
    console.log(space, 'Adding product middleware');
    // debugger;
    console.log(req.body);
    res.redirect('./products');
});
export { router as productRoutes };
