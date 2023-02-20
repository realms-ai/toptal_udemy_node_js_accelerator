import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
class Products extends Model {
}
Products.init({
    title: DataTypes.STRING,
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize });
// const ProductTable = sequelize.define('products', {
//   title: DataTypes.STRING,
//   price: {
//     type: DataTypes.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
console.log('Comparing Product Table: ', Products === sequelize.models.products);
export { Products };
// To play with "createdAt", "updatedAt" Timestamps
// https://sebhastian.com/sequelize-timestamps/
