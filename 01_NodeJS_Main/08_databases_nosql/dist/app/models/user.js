import { getDb } from '../../config/database.js';
import { Productm } from './product.js';
import { ObjectId } from 'mongodb';
class Userm {
    user;
    constructor(user) {
        this.user = user;
    }
    async save(id) {
        console.log('user Data: ', this.user);
        const db = await getDb();
        if (id)
            await db
                .collection('users')
                .updateOne({ _id: new ObjectId(id) }, { $set: this.user });
        else
            await db.collection('users').insertOne(this.user);
    }
    static async fetchAll() {
        const db = await getDb();
        return await db.collection('users').find().toArray();
    }
    static async findById(id) {
        const db = await getDb();
        console.log('Id: ', id);
        return await db
            .collection('users')
            .find({ _id: new ObjectId(id) })
            .toArray();
    }
    static async deleteById(id) {
        const db = await getDb();
        await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    }
    async addToCartnew(productId) {
        const db = await getDb();
        if (!this.user.cartItems)
            this.user.cartItems = {};
        if (this.user.cartItems[productId])
            this.user.cartItems[productId] += 1;
        else
            this.user.cartItems[productId] = 1;
        await db
            .collection('users')
            .updateOne({ _id: new ObjectId(this.user._id) }, { $set: { cartItems: this.user.cartItems } });
    }
    async removeFromCartNew(productId) {
        if (!this.user?.cartItems?.[productId])
            return;
        delete this.user.cartItems?.[productId];
        const db = await getDb();
        await db
            .collection('users')
            .updateOne({ _id: new ObjectId(this.user._id) }, { $set: { cartItems: this.user.cartItems } });
    }
    async fetchCartItems() {
        const cart = await this.user.cartItems;
        if (cart) {
            const products = await Productm.fetchAll({
                _id: { $in: Object.keys(cart).map((i) => new ObjectId(i)) },
            });
            console.log('Products: ', products);
            return await products.map((pdt) => {
                return { ...pdt, quantity: cart[pdt._id.toString()] };
            });
        }
        else
            return [];
    }
    async addToCart(productId) {
        const db = await getDb();
        const [product] = await Productm.findById(productId);
        const pId = new ObjectId(productId);
        if (product) {
            let boolean = false;
            if (this.user.cart) {
                const index = await this.user.cart.findIndex((item) => {
                    return item._id?.equals(pId);
                });
                if (index >= 0)
                    this.user.cart[index].quantity += 1;
                else
                    this.user.cart.push({ ...product, quantity: 1 });
            }
            else {
                this.user.cart = [];
                this.user.cart.push({ ...product, quantity: 1 });
            }
            await db
                .collection('users')
                .updateOne({ _id: new ObjectId(this.user._id) }, { $set: { cart: this.user.cart } });
        }
    }
    async removeFromCart(productId) {
        const db = await getDb();
        const pId = new ObjectId(productId);
        if (this.user.cart) {
            const index = await this.user.cart.findIndex((item) => {
                return item._id?.equals(pId);
            });
            if (index >= 0) {
                this.user.cart.splice(index, 1);
                await db
                    .collection('users')
                    .updateOne({ _id: new ObjectId(this.user._id) }, { $set: { cart: this.user.cart } });
            }
        }
    }
    async generateOrder() {
        if (Object.keys(this?.user?.cartItems || {}).length > 0) {
            const items = await this.fetchCartItems();
            if (!this.user.orders)
                this.user.orders = [];
            const orders = this.user.orders;
            const data = {
                items: items,
                index: orders.length + 1,
                finalPrice: 0,
                taxes: 0,
                costPrice: 0,
                totalProducts: items.length,
            };
            await items.forEach((item) => (data.costPrice += (item?.price || 0) * item.quantity));
            data.taxes = data.costPrice * 0.05;
            data.finalPrice = data.costPrice * 1.05;
            this.user.orders?.push(data);
            const db = await getDb();
            await db
                .collection('users')
                .updateOne({ _id: new ObjectId(this.user._id) }, { $set: { orders: this.user.orders, cartItems: {} } });
        }
    }
}
export { Userm };
