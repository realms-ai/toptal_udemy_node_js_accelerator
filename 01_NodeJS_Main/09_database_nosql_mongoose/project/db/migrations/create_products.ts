import { Schema } from 'mongoose';
import {
  ProductMethods,
  ProductModel,
  ProductType,
} from '../../app/models/product.js';

const productsSchema = new Schema<ProductType, ProductModel, ProductMethods>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export { productsSchema };
