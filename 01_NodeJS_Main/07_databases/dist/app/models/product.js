// import { query } from 'express';
// import { Constants } from '../../config/constants.js';
// import { db, db2 } from '../../config/database.js';
import { Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { createProducts } from '../../db/migrations/create_products.js';
import { User } from './user.js';
import { CartItem } from './cart-item.js';
import { Cart } from './cart.js';
import { OrderItem } from './order-item.js';
import { Order } from './order.js';
class Product extends Model {
    // RELATIONSHIPS
    static relationships = () => {
        Product.belongsTo(User, {
            constraints: true,
            onDelete: 'CASCADE',
            foreignKey: 'userId',
        });
        Product.belongsToMany(Cart, {
            through: CartItem,
            foreignKey: 'productId',
            otherKey: 'cartId',
        });
        Product.belongsToMany(Order, {
            through: OrderItem,
            foreignKey: 'productId',
            otherKey: 'orderId',
        });
        Product.hasMany(CartItem, { foreignKey: 'productId' });
    };
}
Product.init(createProducts, {
    freezeTableName: true,
    tableName: 'products',
    getterMethods: {},
    setterMethods: {},
    sequelize,
});
export { Product };
// CLASS WITH RAW MYSQL
// class Product {
//   static readonly _defaultQuery = 'SELECT * FROM products';
//   static fetch = async (): Promise<ProductType[]> => {
//     console.log('Fetching Products');
//     console.log('Default Query: ', this._defaultQuery);
//     const products: ProductType[] = await this.prototype.read();
//     return products;
//   };
//   static fetchOne = async (id: number): Promise<ProductType> => {
//     const query = `${this._defaultQuery} where id = ?`;
//     const params = [id];
//     const [product] = await this.prototype.read(query, params);
//     return product;
//   };
//   static saveUpdate = async (
//     id: number,
//     product: ProductType
//   ): Promise<void> => {
//     await this.prototype.update(product, id);
//   };
//   static delete = async (id: number): Promise<void> => {
//     await this.prototype.destroy(id);
//   };
//   constructor(private product: ProductType) {}
//   save = async (): Promise<void> => {
//     await this.write(this.product);
//     console.log('Product saved in the DB(products table)');
//   };
//   private async read(
//     query = Product._defaultQuery,
//     params?: Array<any>
//   ): Promise<ProductType[]> {
//     console.log('Reading DB for Products Table');
//     console.log('Query: ', query, Product._defaultQuery);
//     const [result, fields] = await db2.execute(query, params);
//     return result as ProductType[];
//   }
//   private async write(product: ProductType): Promise<void> {
//     const { title, price, description, imageUrl } = product;
//     await db2.execute(
//       'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
//       [title, price, description, imageUrl]
//     );
//   }
//   private async update(product: ProductType, id: number): Promise<void> {
//     // Read data and check which params have changed
//     // Update only those params
//     const { title, price, description, imageUrl } = product;
//     console.log('Product to update: ', product);
//     const query =
//       'UPDATE products SET title = ? , price = ? , description = ? , imageUrl = ? WHERE id = ?';
//     const values = [title, price, description, imageUrl, id];
//     await db2.query(query, values);
//   }
//   private async destroy(id: number): Promise<void> {
//     await db2.execute('DELETE FROM products WHERE id = ?', [id]);
//   }
// }
