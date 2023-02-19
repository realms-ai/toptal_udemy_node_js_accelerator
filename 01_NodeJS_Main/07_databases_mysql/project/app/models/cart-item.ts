import { Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

import { createCartItems } from '../../db/migrations/create_cart_items.js';
import { Product, ProductType } from './product.js';
import { Cart } from './cart.js';

interface CartItemType {
  readonly id: number;
  quantity: number;
  readonly productId: number;
  readonly cartId: number;
  Product: ProductType;
}

class CartItem extends Model {
  declare readonly id: number;
  declare quantity: number;
  declare readonly productId: number;
  declare readonly cartId: number;
  declare Product: Product;

  // RELATIONSHIPS
  static relationships = () => {
    CartItem.belongsTo(Cart, {
      constraints: true,
      onDelete: 'CASCADE',
      foreignKey: 'cartId',
    });
    CartItem.belongsTo(Product, {
      constraints: true,
      onDelete: 'CASCADE',
      foreignKey: 'productId',
    });
  };
}

CartItem.init(createCartItems, {
  freezeTableName: true,
  tableName: 'cart_items',
  getterMethods: {},
  setterMethods: {},
  sequelize,
});

export { CartItem, CartItemType };
