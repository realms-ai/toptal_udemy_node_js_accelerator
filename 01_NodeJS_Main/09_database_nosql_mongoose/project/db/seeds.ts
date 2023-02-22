import { faker } from '@faker-js/faker';

import { mongooseConnect } from '../config/database.js';
import { User, UserType } from '../app/models/user.js';
import { Product, ProductType } from '../app/models/product.js';
import { ObjectId } from 'mongodb';

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
    price: +faker.finance.amount(1, 15, 2),
  };
};

const createDummyUsers = async (count: number = 1) => {
  const data: UserType[] = [];
  await Array.from({ length: count }).forEach(async () => {
    data.push((await createRandomUser()) as UserType);
  });
  console.log('User Data: ', data);
  await User.insertMany(data);
};

const createDummyProducts = async (count: number = 10) => {
  const [user] = await User.find();
  const userId = await new ObjectId(user._id);
  const data: ProductType[] = [];
  await Array.from({ length: count }).forEach(async () => {
    data.push({
      ...((await createRandomProduct()) as ProductType),
      userId: userId,
    });
  });
  await Product.insertMany(data);
};

const main = async () => {
  await mongooseConnect();
  await createDummyUsers();
  await createDummyProducts();
};

main();
