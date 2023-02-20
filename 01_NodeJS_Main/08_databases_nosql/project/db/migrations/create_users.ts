import { DataTypes } from 'sequelize';

const createUsers = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export { createUsers };
