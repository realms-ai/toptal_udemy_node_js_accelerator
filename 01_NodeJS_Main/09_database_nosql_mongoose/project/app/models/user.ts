import mongoose, { Model, model } from 'mongoose';
import { Product, ProductType } from './product.js';
import { ObjectId } from 'mongodb';
import { userSchema } from '../../db/migrations/create_users.js';

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
  console.log('In add to cart method');
  console.log('Product ID: ', productId);
  console.log('Cart: ', this.cart);
  console.log('Product in Cart: ', this.cart[productId]);
  if (this?.cart?.[productId]) this.cart[productId] += 1;
  else this.cart[productId] = 1;
  console.log('Saving the cart: ', this);
  await this?.save()
    .then((sresult: UserModel) => {
      console.log('Saved Result: ', sresult);
    })
    .catch(console.error());
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
    console.log('Items: ', items);
    const data = {
      items: items,
      index: this.orders.length + 1,
      costPrice: 0,
      taxes: 0,
      finalPrice: 0,
      totalProducts: items.length,
    };
    items.forEach((item) => (data.costPrice += item.price * item.quantity));
    console.log('Cost Price: ', data.costPrice);
    data.taxes = data.costPrice * 0.05;
    data.finalPrice = data.costPrice * 1.05;
    console.log('Data: ', data);
    this.orders?.push(data);
    this.cart = {};
    await this.save();
    return;
  }
});

const User = mongoose.model<UserType, UserModel>('User', userSchema);

export { UserModel, UserMethods, UserType, CartItemType, OrderType };
export { User };
