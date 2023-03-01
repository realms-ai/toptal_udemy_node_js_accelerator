import mongoose, { Model, model } from 'mongoose';

import { ObjectId } from 'mongodb';
import { productsSchema } from '../../db/migrations/create_products.js';

interface ProductType {
  readonly _id: ObjectId;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  readonly userId: ObjectId;
  _doc: any;
}

interface ProductMethods {}

type ProductModel = Model<ProductType, {}, ProductMethods>;
// mongoose takes the model name and convert it to lower case along with pluralization
const Product = model('Product', productsSchema);

export { Product, ProductType, ProductMethods, ProductModel };
