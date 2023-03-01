import mongoose from 'mongoose';
import { Product } from './product.js';
import { ObjectId } from 'mongodb';
import { userSchema } from '../../db/migrations/create_users.js';
import debug from 'debug';
const log = debug('app:User:Model');
userSchema.method('getCartItems', async function (productId) {
    // Another Way where you can ref product
    // this.populate('cart.productId').execPopulate()
    // user: {cart: [{productId: ObjectId, quantity: number}]}
    log('In Get Cart Items Function');
    log('User: ', this);
    let result = [];
    const cart = this?.cart;
    if (cart && Object.keys(cart).length > 0) {
        const products = await Product.find({
            _id: { $in: Object.keys(this.cart).map((i) => new ObjectId(i)) },
        }, '_id title price imageUrl description');
        return products.map((pdt) => {
            return {
                quantity: cart?.[pdt?._id?.toString() || ''] || 1,
                ...pdt._doc,
                // _id: pdt?._id,
                // title: pdt?.title,
                // imageUrl: pdt?.imageUrl,
                // price: pdt?.price,
                // description: pdt?.description,
            };
        });
    }
    return [];
});
userSchema.method('addToCart', async function (productId) {
    log('In add to cart method');
    log('Product ID: ', productId);
    log('Cart: ', this.cart);
    log('Product in Cart: ', this.cart[productId]);
    if (this?.cart?.[productId])
        this.cart[productId] += 1;
    else
        this.cart[productId] = 1;
    log('Saving the cart: ', this);
    const result = await this.save();
    log('Result: ', result);
    return;
});
userSchema.methods.removeFromCart = async function (productId) {
    if (this.cart?.[productId]) {
        delete this.cart[productId];
        await this?.save();
        return;
    }
};
userSchema.method('generateOrder', async function () {
    if (Object.keys(this.cart).length > 0) {
        const items = await this.getCartItems();
        log('Items: ', items);
        const data = {
            items: items,
            index: this.orders.length + 1,
            costPrice: 0,
            taxes: 0,
            finalPrice: 0,
            totalProducts: items.length,
        };
        items.forEach((item) => (data.costPrice += item.price * item.quantity));
        log('Cost Price: ', data.costPrice);
        data.taxes = data.costPrice * 0.05;
        data.finalPrice = data.costPrice * 1.05;
        log('Data: ', data);
        this.orders?.push(data);
        this.cart = {};
        await this.save();
        return;
    }
});
const User = mongoose.model('User', userSchema);
export { User };
