import { DataTypes } from 'sequelize';

const createOrderItems = {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priceBeforeTax: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  taxes: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  finalPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
};

export { createOrderItems };
