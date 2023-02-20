import { Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { createCartItems } from '../../db/migrations/create_cart_items.js';
import { Product } from './product.js';
import { Cart } from './cart.js';
class CartItem extends Model {
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
export { CartItem };
