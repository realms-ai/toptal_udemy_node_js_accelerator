import fs from 'fs';
import path from 'path';
import { Constants } from '../../config/constants.js';
const { __dirname } = Constants;
const productDBPath = path.join(__dirname, 'dist/log/product.json');
let products = [];
class Product {
    product;
    static fetch() {
        if (products.length === 0)
            this.prototype.read();
        return products;
    }
    static fetchOne(id) {
        if (products.length === 0)
            this.prototype.read();
        return products[id];
    }
    static update(id, data) {
        products[id] = data;
        this.prototype.write();
    }
    static delete(id) {
        products.splice(id, 1);
        this.prototype.write();
    }
    constructor(product) {
        this.product = product;
        if (products.length === 0)
            this.read();
    }
    save() {
        products.push(this.product);
        this.write();
    }
    read() {
        fs.readFile(productDBPath, (err, data) => {
            if (err)
                console.log('Read file error: ', err);
            else
                products = JSON.parse(data.toString());
        });
        console.log('Products: ', products);
    }
    write() {
        fs.writeFile(productDBPath, JSON.stringify(products), {}, (err) => {
            if (err)
                console.log('Write file error: ', err);
        });
    }
}
export { Product };
