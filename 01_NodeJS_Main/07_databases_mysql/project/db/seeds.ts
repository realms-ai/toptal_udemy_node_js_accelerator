import { sequelize } from '../config/database.js';
import { faker } from '@faker-js/faker';

import { Product } from '../app/models/product.js';
import { User } from '../app/models/user.js';
import { tableRelationships } from './relationships.js';

// Use of NPM package Faker-JS to create dummy data
const createRandomUser = () => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
  };
};

const createRandomProduct = () => {
  return {
    title: faker.word.noun(),
    imageUrl: faker.image.image(),
    description: faker.company.catchPhraseDescriptor(),
    price: faker.finance.amount(1, 15, 2),
  };
};

const createDummyUsers = (count: number = 1) => {
  Array.from({ length: count }).forEach(async () => {
    const data = createRandomUser();
    console.log('User Data: ', data);
    await User.create(data);
  });
};

const createDummyProducts = (count: number = 10) => {
  Array.from({ length: count }).forEach(() => {
    const data = { ...createRandomProduct(), userId: 1 };
    console.log('Product Data: ', data);
    Product.create(data);
  });
};

const main = async () => {
  await tableRelationships();
  await createDummyUsers();
  createDummyProducts();
};

main();
