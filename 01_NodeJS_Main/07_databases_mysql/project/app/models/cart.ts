import { Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

import { createCarts } from '../../db/migrations/create_carts.js';
import { User } from './user.js';
import { CartItem } from './cart-item.js';
import { Product } from './product.js';

interface CartType {
  readonly id: number;
  readonly userId: number;
}

class Cart extends Model {
  declare readonly id: number;
  declare readonly userId: number;

  // RELATIONSHIPS
  static relationships = () => {
    Cart.belongsTo(User, { foreignKey: 'userId' });
    Cart.belongsToMany(Product, {
      through: CartItem,
      foreignKey: 'cartId',
      otherKey: 'productId',
    });
    Cart.hasMany(CartItem, { foreignKey: 'cartId' });
  };
}

Cart.init(createCarts, {
  freezeTableName: true,
  tableName: 'carts',
  getterMethods: {},
  setterMethods: {},
  sequelize,
});

export { Cart, CartType };
