import mongoose, { Model, model } from 'mongoose';
import { Product, ProductType } from './product.js';
import { ObjectId } from 'mongodb';
import { userSchema } from '../../db/migrations/create_users.js';
import debug from 'debug';

const log = debug('app:User:Model');

interface CartItemType extends ProductType {
  quantity: number;
}

interface OrderType {
  items: CartItemType[];
  finalPrice: number;
  taxes: number;
  costPrice: number;
  totalProducts: number;
  index: number;
}

interface UserType {
  readonly _id: ObjectId;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  cart: { [k: string]: number };
  orders: OrderType[];
}

interface UserMethods {
  getCartItems(): Promise<CartItemType[]>;
  addToCart(productId: string): Promise<void>;
  removeFromCart(productId: string): Promise<void>;
  generateOrder(): Promise<void>;
}

type UserModel = Model<UserType, {}, UserMethods>;

userSchema.method('getCartItems', async function (productId: string) {
  // Another Way where you can ref product
  // this.populate('cart.productId').execPopulate()
  // user: {cart: [{productId: ObjectId, quantity: number}]}
  log('In Get Cart Items Function');
  log('User: ', this);
  let result: CartItemType[] = [];
  const cart: { [k: string]: number } = this?.cart;
  if (cart && Object.keys(cart).length > 0) {
    const products = await Product.find(
      {
        _id: { $in: Object.keys(this.cart).map((i) => new ObjectId(i)) },
      },
      '_id title price imageUrl description'
    );

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

userSchema.method('addToCart', async function (productId: string) {
  log('In add to cart method');
  log('Product ID: ', productId);
  log('Cart: ', this.cart);
  log('Product in Cart: ', this.cart[productId]);
  if (this?.cart?.[productId]) this.cart[productId] += 1;
  else this.cart[productId] = 1;
  log('Saving the cart: ', this);
  const result = await this.save();
  log('Result: ', result);
  return;
});

userSchema.methods.removeFromCart = async function (productId: string) {
  if (this.cart?.[productId]) {
    delete this.cart[productId];
    await this?.save();
    return;
  }
};

userSchema.method('generateOrder', async function () {
  if (Object.keys(this.cart).length > 0) {
    const items: CartItemType[] = await this.getCartItems();
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

const User = mongoose.model<UserType, UserModel>('User', userSchema);

export { UserModel, UserMethods, UserType, CartItemType, OrderType, User };
