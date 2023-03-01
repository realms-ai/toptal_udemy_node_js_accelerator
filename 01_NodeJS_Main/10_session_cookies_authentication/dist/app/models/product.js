import { model } from 'mongoose';
import { productsSchema } from '../../db/migrations/create_products.js';
// mongoose takes the model name and convert it to lower case along with pluralization
const Product = model('Product', productsSchema);
export { Product };
