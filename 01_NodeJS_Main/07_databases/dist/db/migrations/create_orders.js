import { DataTypes } from 'sequelize';
const createOrders = {
    finalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        default: 0,
    },
};
export { createOrders };
