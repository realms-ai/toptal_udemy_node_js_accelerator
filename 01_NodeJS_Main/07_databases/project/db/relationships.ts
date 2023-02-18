import { CartItem } from '../app/models/cart-item.js';
import { Cart } from '../app/models/cart.js';
import { OrderItem } from '../app/models/order-item.js';
import { Order } from '../app/models/order.js';
import { Product } from '../app/models/product.js';
import { User } from '../app/models/user.js';

export const tableRelationships = () => {
  Product.relationships();
  User.relationships();
  Cart.relationships();
  CartItem.relationships();
  Order.relationships();
  OrderItem.relationships();
};
