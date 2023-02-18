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
        const user = req.cookies.user;
        const products = await user.getProducts(); //Product.findAll();
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
    router.post('/', async (req, res) => {
        console.log(space, 'Adding product middleware');
        // console.log(req.body);
        if (req.body?.title) {
            // const data = { ...req.body, userId: req.cookies.user.id };
            // await Product.create(data);
            // OR
            const user = req.cookies.user;
            user.createProduct(req.body);
        }
        res.redirect(`${domain}/products`);
    });
};
const edit = () => {
    router.get('/:id', async (req, res) => {
        console.log(space, 'Middleware is in Edit Product Page');
        const id = +req.params.id;
        const user = req.cookies.user;
        const [product] = await user.getProducts({ where: { id: id } }); // Product.findByPk(id) OR Product.findAll({where: {id: id}});
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
    router.put('/:id', async (req, res) => {
        console.log(space, 'Middleware is in Update Product Page');
        const id = +req.params.id;
        const data = req.body;
        const product = await Product.update(data, { where: { id: id } });
        console.log('Product: ');
        // OR
        // let product = await Product.findByPk(id);
        // product?.setAttributes(data);
        // console.log('Product: ', product?.changed());
        // await product?.save();
        res.redirect(`${domain}/products`);
    });
};
const destroy = () => {
    router.delete('/:id', async (req, res) => {
        console.log(space, 'Middleware is in Delete Product Page');
        const id = +req.params.id;
        await Product.destroy({ where: { id: id } });
        // OR
        // const product = await Product.findByPk();
        // await product?.destroy();
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
