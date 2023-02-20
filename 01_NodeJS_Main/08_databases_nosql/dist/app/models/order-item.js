import { Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { createOrderItems } from '../../db/migrations/create_order_items.js';
import { Product } from './product.js';
import { Order } from './order.js';
class OrderItem extends Model {
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
export { OrderItem };
