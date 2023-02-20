import { getDb } from '../../config/database.js';

import { ObjectId } from 'mongodb';

interface ProductType {
  readonly _id: ObjectId;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  readonly userId: ObjectId;
}

class Productm {
  declare readonly _id: ObjectId;
  declare title: string;
  declare imageUrl: string;
  declare description: string;
  declare price: number;
  declare readonly userId: ObjectId;

  constructor(public product: Partial<ProductType>) {}

  async save(id?: string) {
    console.log('Product Data: ', this.product);
    const db = await getDb();
    if (id)
      await db
        .collection('products')
        .updateOne({ _id: new ObjectId(id) }, { $set: this.product });
    else await db.collection('products').insertOne(this.product);
  }

  static async fetchAll(query: { [k: string]: any } = {}, userId?: string) {
    if (userId) query['userId'] = new ObjectId(userId);
    const db = await getDb();
    console.log('Query: ', query);
    return await db.collection('products').find(query).toArray();
    // db.collection('products').find({_id: {_in: pids}}).toArray();
  }

  static async findById(id: string) {
    const db = await getDb();
    console.log('Id: ', id);
    return await db
      .collection('products')
      .find({ _id: new ObjectId(id) })
      .toArray();
  }

  static async deleteById(id: string) {
    const db = await getDb();
    await db.collection('products').deleteOne({ _id: new ObjectId(id) });
  }
}

export { Productm, ProductType };
