import fs from 'fs';
import path from 'path';

import { Constants } from '../../config/constants.js';

interface ProductType {
  title: string;
  imageUrl: string;
  price: number;
  description: string;
}

const { __dirname } = Constants;
const productDBPath = path.join(__dirname, 'dist/log/product.json');
let products: ProductType[] = [];

class Product {
  static fetch(): ProductType[] {
    if (products.length === 0) this.prototype.read();
    return products;
  }

  static fetchOne(id: number): ProductType {
    if (products.length === 0) this.prototype.read();
    return products[id];
  }

  static update(id: number, data: ProductType) {
    products[id] = data;
    this.prototype.write();
  }

  static delete(id: number) {
    products.splice(id, 1);
    this.prototype.write();
  }

  constructor(private product: ProductType) {
    if (products.length === 0) this.read();
  }

  save() {
    products.push(this.product);
    this.write();
  }

  private read() {
    fs.readFile(productDBPath, (err, data) => {
      if (err) console.log('Read file error: ', err);
      else products = JSON.parse(data.toString());
    });
    console.log('Products: ', products);
  }

  private write() {
    fs.writeFile(productDBPath, JSON.stringify(products), {}, (err) => {
      if (err) console.log('Write file error: ', err);
    });
  }
}

export { Product, ProductType };
