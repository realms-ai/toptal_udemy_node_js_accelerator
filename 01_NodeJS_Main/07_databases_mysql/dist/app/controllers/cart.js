import express from 'express';
import { Constants } from '../../config/constants.js';
import { Product } from '../models/product.js';
const router = express.Router();
const { space, domain } = Constants;
const index = () => {
    // Get all data
    router.get('/', async (req, res) => {
        const user = await req.cookies.user;
        let cart = await user.getCart();
        if (!cart)
            cart = await user.createCart();
        const cartItems = await cart.getCartItems({ include: Product });
        console.log('Image Url: ', JSON.stringify(cartItems));
        res.render('cart/index', {
            headTitle: 'Cart',
            path: 'cart',
            domain: domain,
            cart: cart,
            cartItems: cartItems,
            cartItemsLen: cartItems.length,
        });
    });
};
const show = () => {
    router.get('/:id', (req, res) => {
        // Get Data of specific column of the table
        res.render('x/index', {
            headTitle: '',
            path: '',
            domain: domain,
        });
    });
};
const add = () => {
    router.get('/', (req, res) => {
        // Display form to add new data to the table
        res.render('x/add', {
            headTitle: '',
            path: '',
            domain: domain,
        });
    });
};
const create = () => {
    router.post('/', async (req, res) => {
        try {
            // Add new data to the table
            const user = await req.cookies.user;
            const cart = await user.getCart();
            // Find if product already exist in the cart
            const productId = +req.body.id;
            // const [cartItem] = await cart.getCartItems({
            //   where: { productId: productId },
            // });
            // if (cartItem) {
            //   cartItem.quantity += 1;
            //   cartItem.save();
            // } else {
            //   cart.createCartItem({ productId: productId, quantity: 1 });
            // }
            // OR
            let [product] = await cart.getProducts({
                where: { id: productId },
            });
            if (!product)
                product = await Product.findByPk(productId);
            await cart.addProduct(product, {
                through: { quantity: (product?.CartItem?.quantity || 0) + 1 },
            });
            res.redirect('./');
        }
        catch (e) {
            console.log(e);
        }
    });
};
const edit = () => {
    router.get('/:id', (req, res) => {
        // Display form to edit existing data in the table
        res.render('x/edit', {
            headTitle: '',
            path: '',
            domain: domain,
        });
    });
};
const update = () => {
    router.put('/:id', (req, res) => {
        // Edit existing data in the table
        res.redirect('./');
    });
};
const destroy = () => {
    router.delete('/:id', async (req, res) => {
        console.log('In Delete Cart Route');
        // Delete existing data from the table
        const user = await req.cookies.user;
        const cart = await user.getCart();
        const productId = +req.params.id;
        const [cartItem] = await cart.getCartItems({
            where: { productId: productId },
        });
        console.log('Cart Item to Delete', cartItem);
        if (cartItem)
            await cartItem.destroy();
        res.redirect(`${domain}/cart`);
    });
};
const main = () => {
    index();
    // show();
    add();
    create();
    // edit();
    // update();
    destroy();
};
main();
export { router as cartRoutes };
