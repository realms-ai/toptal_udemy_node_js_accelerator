import { Constants } from '../../config/constants.js';
import { Product } from './product.js';
const { __dirname } = Constants;
let cart = [];
class Cart {
    constructor() { }
    static save(id) {
        const product = Product.fetchOne(id);
        cart.push(product);
    }
    static fetch() {
        return cart;
    }
    static delete(id) {
        cart.splice(id, 1);
        return cart;
    }
}
export { Cart };
