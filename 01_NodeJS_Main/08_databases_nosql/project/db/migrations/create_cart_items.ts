import { DataTypes } from 'sequelize';

const createCartItems = {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export { createCartItems };
