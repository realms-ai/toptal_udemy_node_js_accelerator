import { DataTypes } from 'sequelize';
const createProducts = {
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
};
export { createProducts };
// To play with "createdAt", "updatedAt" Timestamps
// https://sebhastian.com/sequelize-timestamps/
