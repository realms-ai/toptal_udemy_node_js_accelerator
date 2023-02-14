import express from 'express';
import { space } from '../app.js';
const router = express.Router();
const products = [];
// FUNCTIONS
// index: list all the products
// show/:id: will show only one product w.r.t ID
// create(POST): will add one product to DB
// update/:id(PUT/PATCH): will update a product w.r.t ID
// delete/:id(DELETE): will delete a product w.r.t ID
const index = () => {
    router.get('/', (req, res) => {
        console.log(space, 'Middleware is in Product Page');
        // res.send(`
        //     <h1>Product Page</h1>
        //     <form action="/products" , method="POST">
        //       <input type="text" name="title" />
        //       <button type="submit">Add Product</button>
        //     </form>
        //   `);
        // OR
        // res.sendFile(path.join(__dirname, 'views', 'product.html'));
        // OR
        res.render('product', {
            headTitle: 'Products',
            path: 'products',
            activeProduct: true,
        });
    });
};
const create = () => {
    router.post('/', (req, res) => {
        console.log(space, 'Adding product middleware');
        // debugger;
        console.log(req.body);
        if (req.body?.title)
            products.push({ title: req.body.title });
        res.redirect('./products');
    });
};
const main = () => {
    index();
    // show()
    create();
    // update()
    // delete()
};
main();
export { router as productRoutes, products };
