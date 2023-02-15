import fs from 'fs';
import path from 'path';

import { Constants } from '../../config/constants.js';
import { Product, ProductType } from './product.js';

const { __dirname } = Constants;
let cart: ProductType[] = [];

class Cart {
  constructor() {}

  static save(id: number) {
    const product = Product.fetchOne(id);
    cart.push(product);
  }

  static fetch() {
    return cart;
  }

  static delete(id: number) {
    cart.splice(id, 1);
    return cart;
  }
}

export { Cart };
