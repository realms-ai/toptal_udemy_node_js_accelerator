import express from 'express';
import { Constants } from '../../config/constants.js';
import { Product } from '../models/product.js';
const router = express.Router();
const { space, domain } = Constants;
const index = () => {
    // Get all data
    router.get('/', async (req, res) => {
        const orders = await getUserOrders(req.cookies.user);
        const firstOrderItems = await getItems(orders[1]);
        res.render('orders/index', {
            headTitle: 'Orders',
            path: 'orders',
            domain: domain,
            orders: orders,
            orderItems: firstOrderItems,
        });
    });
};
const show = () => {
    router.get('/:id', async (req, res) => {
        const [orders, order] = await getUserOrders(req.cookies.user, +req.params.id);
        let orderItems = [];
        console.log('Order: ', order);
        if (order)
            orderItems = await getItems(order);
        res.render('orders/index', {
            headTitle: 'Orders',
            path: 'orders',
            domain: domain,
            orders: orders,
            orderItems: orderItems,
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
        const user = await req.cookies.user;
        const cart = await user.getCart();
        const cartProducts = await cart.getProducts();
        if (cartProducts.length > 0) {
            const order = await user.createOrder({ finalPrice: 0 });
            let orderFinalPrice = 0;
            const defaultTaxPercentage = 0.05;
            // BULK CREATE
            order.addProducts(cartProducts.map((item) => {
                item.OrderItem = {
                    quantity: item.CartItem.quantity,
                    priceBeforeTax: item.price * (item.CartItem.quantity || 1),
                    taxes: item.price * (item.CartItem.quantity || 1) * defaultTaxPercentage,
                    finalPrice: item.price *
                        (item.CartItem.quantity || 1) *
                        (1 + defaultTaxPercentage),
                };
                orderFinalPrice += item.OrderItem.finalPrice || 0;
                return item;
            }));
            // cartProducts.forEach(async (item: Product) => {
            //   data = {
            //     productId: item.id,
            //     quantity: item.CartItem.quantity,
            //     priceBeforeTax: item.price * item.CartItem.quantity,
            //     taxes: item.price * item.CartItem.quantity * defaultTaxPercentage,
            //     finalPrice:
            //       item.price * item.CartItem.quantity * (1 + defaultTaxPercentage),
            //   };
            //   orderFinalPrice += data.finalPrice || 0;
            //   await order.addProduct({ ...item, OrderItem: data });
            //   await item.CartItem.destroy();
            // });
            //
            // DELETING ALL PRODUCTS FROM CART ITEMS FOR SPECIFIC CART
            cart.setProducts(null);
            await order.update({ finalPrice: orderFinalPrice });
            res.redirect(`${domain}/orders`);
        }
        // OR
        // const cartItems = await cart.getCartItems({ include: Product });
        // if (cartItems.length > 0) {
        //   const order = await user.createOrder({ finalPrice: 0 });
        //   let orderFinalPrice = 0;
        //   const defaultTaxPercentage = 0.05;
        //   let data: Partial<OrderItemType>;
        //   cartItems.forEach(async (item: CartItem) => {
        //     data = {
        //       productId: item.productId,
        //       quantity: item.quantity,
        //       priceBeforeTax: item.Product.price * item.quantity,
        //       taxes: item.Product.price * item.quantity * defaultTaxPercentage,
        //       finalPrice:
        //         item.Product.price * item.quantity * (1 + defaultTaxPercentage),
        //     };
        //     orderFinalPrice += data.finalPrice || 0;
        //     await order.createOrderItem(data);
        //     await item.destroy();
        //   });
        //   await order.update({ finalPrice: orderFinalPrice });
        //   res.redirect(`${domain}/orders`);
        // }
        else {
            res.redirect(`${domain}/cart`);
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
    router.delete('/:id', (req, res) => {
        // Delete existing data from the table
        res.redirect('./');
    });
};
const main = () => {
    index();
    show();
    // add();
    create();
    // edit();
    // update();
    // destroy();
};
main();
const getUserOrders = async (user, orderId) => {
    const orders = await user.getOrders({ include: Product });
    // EAGER LOADING orders = await user.getOrders({include: ['products']})
    if (orderId) {
        const [order] = await user.getOrders({
            where: { id: orderId },
        });
        return [orders, order];
    }
    return orders;
};
const getItems = async (order) => {
    return await order.getOrderItems({ include: Product });
};
export { router as orderRoutes };
