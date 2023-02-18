import { Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

import { createUsers } from '../../db/migrations/create_users.js';
import { Product } from './product.js';
import { Cart } from './cart.js';
import { Order } from './order.js';

interface UserType {
  readonly id: number;
  name: string;
  email: string;
}

class User extends Model {
  declare readonly id: number;
  declare name: string;
  declare email: string;
  declare createCart: Function;
  declare getOrders: Function;

  // RELATIONSHIPS
  static relationships = () => {
    User.hasMany(Product, { foreignKey: 'userId' });
    User.hasOne(Cart, { foreignKey: 'userId' });
    User.hasMany(Order, { foreignKey: 'userId' });
  };
}

User.init(createUsers, {
  freezeTableName: true,
  tableName: 'users',
  getterMethods: {},
  setterMethods: {},
  sequelize,
});

User.afterSave(async (user, options) => {
  user?.createCart();
});

export { User, UserType };
