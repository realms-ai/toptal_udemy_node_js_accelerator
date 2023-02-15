import express from 'express';
import { Constants } from '../../config/constants.js';
import { Product } from '../models/product.js';
const router = express.Router();
const { space, domain } = Constants;
// FUNCTIONS
// index: list all the products
// show/:id: will show only one product w.r.t ID
// add: show a form to add a new product
// create(POST): will add one product to DB
// edit: show a form to edit an existing product
// update/:id(PUT/PATCH): will update a product w.r.t ID
// delete/:id(DELETE): will delete a product w.r.t ID
const index = () => {
    router.get('/', async (req, res) => {
        console.log(space, 'Middleware is in Product Page');
        const products = await Product.fetch();
        res.render('products/index', {
            headTitle: 'Products',
            path: 'products',
            activeProduct: true,
            products: products,
            diplayProducts: products.length > 0,
            domain: domain,
        });
    });
};
const create = () => {
    router.post('/', (req, res) => {
        // console.log(space, 'Adding product middleware');
        // console.log(req.body);
        if (req.body?.title) {
            const product = new Product(req.body);
            product.save();
        }
        res.redirect(`${domain}/products`);
    });
};
const edit = () => {
    router.get('/:id', async (req, res) => {
        console.log(space, 'Middleware is in Edit Product Page');
        const id = +req.params.id;
        const product = await Product.fetchOne(id);
        res.render('products/edit', {
            headTitle: 'Products',
            path: 'products',
            activeProduct: true,
            product: product,
            id: id,
            domain: domain,
        });
    });
};
const update = () => {
    router.put('/:id', (req, res) => {
        console.log(space, 'Middleware is in Update Product Page');
        const id = +req.params.id;
        Product.update(id, req.body);
        res.redirect(`${domain}/products`);
    });
};
const destroy = () => {
    router.delete('/:id', (req, res) => {
        console.log(space, 'Middleware is in Delete Product Page');
        const id = +req.params.id;
        Product.delete(id);
        res.redirect(`${domain}/products`);
    });
};
const main = () => {
    index();
    // show()
    // add();
    create();
    destroy();
    edit();
    update();
};
main();
export { router as productRoutes };
