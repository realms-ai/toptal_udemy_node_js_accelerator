import { Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

import { createOrderItems } from '../../db/migrations/create_order_items.js';
import { Product } from './product.js';
import { Order } from './order.js';

interface OrderItemType {
  readonly id: number;
  readonly productId: number;
  readonly orderId: number;
  quantity: number;
  priceBeforeTax: number;
  taxes: number;
  finalPrice: number;
}

class OrderItem extends Model {
  declare readonly id: number;
  declare readonly productId: number;
  declare readonly OrderId: number;
  declare quantity: number;
  declare priceBeforeTax: number;
  declare taxes: number;
  declare finalPrice: number;

  // RELATIONSHIPS
  static relationships = () => {
    OrderItem.belongsTo(Order, {
      constraints: true,
      onDelete: 'CASCADE',
      foreignKey: 'orderId',
    });
    OrderItem.belongsTo(Product, {
      constraints: true,
      onDelete: 'CASCADE',
      foreignKey: 'productId',
    });
  };
}

OrderItem.init(createOrderItems, {
  freezeTableName: true,
  tableName: 'order_items',
  getterMethods: {},
  setterMethods: {},
  sequelize,
});

export { OrderItem, OrderItemType };
