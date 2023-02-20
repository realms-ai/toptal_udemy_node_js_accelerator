import { Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { createOrders } from '../../db/migrations/create_orders.js';
import { User } from './user.js';
import { OrderItem } from './order-item.js';
import { Product } from './product.js';
class Order extends Model {
    // RELATIONSHIPS
    static relationships = () => {
        Order.belongsTo(User, { foreignKey: 'userId' });
        Order.belongsToMany(Product, {
            through: OrderItem,
            foreignKey: 'orderId',
            otherKey: 'productId',
        });
        Order.hasMany(OrderItem, { foreignKey: 'orderId' });
    };
}
Order.init(createOrders, {
    freezeTableName: true,
    tableName: 'orders',
    getterMethods: {},
    setterMethods: {},
    sequelize,
});
export { Order };
