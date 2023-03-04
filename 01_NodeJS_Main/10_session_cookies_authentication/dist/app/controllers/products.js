import express from 'express';
import { Constants } from '../../config/constants.js';
import { Product } from '../models/product.js';
import { body, validationResult } from 'express-validator';
const router = express.Router();
const { space, domain } = Constants;
import debug from 'debug';
const log = debug('app:Products:Controller');
// FUNCTIONS
// index: list all the products
// show/:id: will show only one product w.r.t ID
// add: show a form to add a new product
// create(POST): will add one product to DB
// edit: show a form to edit an existing product
// update/:id(PUT/PATCH): will update a product w.r.t ID
// delete/:id(DELETE): will delete a product w.r.t ID
const all = () => {
    log('In Product all route');
    router.use((req, res, next) => {
        // if (req.cookies?.user) next();
        // else res.redirect(`${domain}`);
        next();
    });
};
const index = () => {
    router.get('/', async (req, res, next) => {
        try {
            log(space, 'Middleware is in Product Page');
            const user = req.cookies?.user;
            const products = await Product.find({ userId: user._id })
                .select('title price imageUrl description')
                .populate('userId', 'name');
            log('Products: ', products);
            res.render('products/index', {
                headTitle: 'Products',
                path: 'products',
                activeProduct: true,
                products: products,
                diplayProducts: products.length > 0,
                domain: domain,
                // loggedIn: req.session?.isLoggedIn,
                // csrfToken: req.csrfToken(),
            });
        }
        catch (err) {
            throw err;
            next();
        }
    });
};
const create = () => {
    // Defined the validations
    const titleValidation = body('title')
        .isAlphanumeric()
        .isLength({ min: 3 })
        .trim();
    const imageUrlValidation = body('imageUrl').isURL();
    const priceValidation = body('price').isFloat();
    const descriptionValidation = body('description')
        .isLength({ min: 5, max: 400 })
        .trim();
    const productCreateValidations = [
        titleValidation,
        imageUrlValidation,
        priceValidation,
        descriptionValidation,
    ];
    router.post('/', productCreateValidations, async (req, res) => {
        log(space, 'Adding product middleware');
        const user = req.cookies?.user;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            log('Validation Errors: ', errors);
            log('Validation Errors: ', errors.array());
            const products = await Product.find({ userId: user._id })
                .select('title price imageUrl description')
                .populate('userId', 'name');
            return res.status(422).render(`${domain}/products`, {
                headTitle: 'products',
                path: 'products',
                domain: domain,
                products: products,
                diplayProducts: products.length > 0,
                errors: errors.array().map((err) => `${err.param}: ${err.msg}`),
                // csrfToken: req.csrfToken(),
            });
        }
        // log(req.body);
        if (req.body?.title) {
            // const data = { ...req.body, userId: req.cookies?.user.id };
            // await Product.create(data);
            // OR
            const data = { ...req.body, userId: user };
            const product = await new Product(data);
            await product.save();
        }
        res.redirect(`${domain}/products`);
    });
};
const edit = () => {
    router.get('/:id', async (req, res) => {
        log(space, 'Middleware is in Edit Product Page');
        const id = req.params.id;
        const user = req.cookies?.user;
        log('Finding the product', id);
        const product = await Product.findById(id); // Product.findByPk(id) OR Product.findAll({where: {id: id}});
        log('Product: ', product);
        res.render('products/edit', {
            headTitle: 'Products',
            path: 'products',
            activeProduct: true,
            product: product,
            id: id,
            domain: domain,
            // loggedIn: req.session?.isLoggedIn,
            // csrfToken: req.csrfToken(),
        });
    });
};
const update = () => {
    router.put('/:id', async (req, res) => {
        log(space, 'Middleware is in Update Product Page');
        const id = req.params.id;
        const data = req.body;
        const image = await req.file;
        log('File Image: ', image);
        if (!image) {
            const product = await Product.findById(id);
            return res.status(422).render('products/edit', {
                headTitle: 'Products',
                path: 'products',
                activeProduct: true,
                product: product,
                id: id,
                domain: domain,
                errorMessage: 'Attached file is not an image',
                validationErrors: [],
            });
        }
        if (image?.destination)
            data.imageUrl = image.filename;
        const product = await Product.findByIdAndUpdate(id, req.body);
        res.redirect(`${domain}/products`);
    });
};
const destroy = () => {
    router.delete('/:id', async (req, res) => {
        log(space, 'Middleware is in Delete Product Page');
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        // Delete the image file on edit and delete
        // fs.unlink(filepath, (err) => {
        //   if(err) throw(err)
        // })
        res.redirect(`${domain}/products`);
    });
};
const main = () => {
    all();
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
