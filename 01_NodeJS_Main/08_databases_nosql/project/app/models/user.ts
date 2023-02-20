import { getDb } from '../../config/database.js';
import { ProductType, Productm } from './product.js';
import { ObjectId } from 'mongodb';

interface CartItemType extends Partial<ProductType> {
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
  readonly id: number;
  readonly _id: ObjectId;
  name: string;
  email: string;
  cart: CartItemType[];
  cartItems: { [k: string]: number };
  orders: OrderType[];
}

class Userm {
  declare readonly _id: ObjectId;
  declare name: string;
  declare email: string;
  declare cart: Partial<CartItemType>[];
  declare cartItems: { [k: string]: number };
  declare orders: OrderType[];

  constructor(public user: Partial<UserType>) {}

  async save(id?: string) {
    console.log('user Data: ', this.user);
    const db = await getDb();
    if (id)
      await db
        .collection('users')
        .updateOne({ _id: new ObjectId(id) }, { $set: this.user });
    else await db.collection('users').insertOne(this.user);
  }

  static async fetchAll() {
    const db = await getDb();
    return await db.collection('users').find().toArray();
  }

  static async findById(id: string) {
    const db = await getDb();
    console.log('Id: ', id);
    return await db
      .collection('users')
      .find({ _id: new ObjectId(id) })
      .toArray();
  }

  static async deleteById(id: string) {
    const db = await getDb();
    await db.collection('users').deleteOne({ _id: new ObjectId(id) });
  }

  async addToCartnew(productId: string) {
    const db = await getDb();
    if (!this.user.cartItems) this.user.cartItems = {};
    if (this.user.cartItems[productId]) this.user.cartItems[productId] += 1;
    else this.user.cartItems[productId] = 1;
    await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this.user._id) },
        { $set: { cartItems: this.user.cartItems } }
      );
  }

  async removeFromCartNew(productId: string) {
    if (!this.user?.cartItems?.[productId]) return;
    delete this.user.cartItems?.[productId];

    const db = await getDb();
    await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this.user._id) },
        { $set: { cartItems: this.user.cartItems } }
      );
  }

  async fetchCartItems(): Promise<CartItemType[] | []> {
    const cart = await this.user.cartItems;
    if (cart) {
      const products = await Productm.fetchAll({
        _id: { $in: Object.keys(cart).map((i) => new ObjectId(i)) },
      });
      console.log('Products: ', products);
      return await products.map((pdt) => {
        return { ...pdt, quantity: cart[pdt._id.toString()] };
      });
    } else return [];
  }

  async addToCart(productId: string) {
    const db = await getDb();
    const [product] = await Productm.findById(productId);
    const pId: ObjectId = new ObjectId(productId);
    if (product) {
      let boolean = false;
      if (this.user.cart) {
        const index = await this.user.cart.findIndex((item: CartItemType) => {
          return item._id?.equals(pId);
        });
        if (index >= 0) this.user.cart[index].quantity += 1;
        else this.user.cart.push({ ...product, quantity: 1 });
      } else {
        this.user.cart = [];
        this.user.cart.push({ ...product, quantity: 1 });
      }
      await db
        .collection('users')
        .updateOne(
          { _id: new ObjectId(this.user._id) },
          { $set: { cart: this.user.cart } }
        );
    }
  }

  async removeFromCart(productId: string) {
    const db = await getDb();
    const pId: ObjectId = new ObjectId(productId);
    if (this.user.cart) {
      const index = await this.user.cart.findIndex((item: CartItemType) => {
        return item._id?.equals(pId);
      });
      if (index >= 0) {
        this.user.cart.splice(index, 1);
        await db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this.user._id) },
            { $set: { cart: this.user.cart } }
          );
      }
    }
  }

  async generateOrder() {
    if (Object.keys(this?.user?.cartItems || {}).length > 0) {
      const items: CartItemType[] = await this.fetchCartItems();
      if (!this.user.orders) this.user.orders = [];
      const orders = this.user.orders;
      const data: OrderType = {
        items: items,
        index: orders.length + 1,
        finalPrice: 0,
        taxes: 0,
        costPrice: 0,
        totalProducts: items.length,
      };
      await items.forEach(
        (item) => (data.costPrice += (item?.price || 0) * item.quantity)
      );
      data.taxes = data.costPrice * 0.05;
      data.finalPrice = data.costPrice * 1.05;
      this.user.orders?.push(data);

      const db = await getDb();
      await db
        .collection('users')
        .updateOne(
          { _id: new ObjectId(this.user._id) },
          { $set: { orders: this.user.orders, cartItems: {} } }
        );
    }
  }
}

export { Userm, UserType, CartItemType, OrderType };
