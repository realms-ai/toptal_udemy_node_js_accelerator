import { faker } from '@faker-js/faker';

import { ProductType, Productm } from '../app/models/product.js';
import { UserType, Userm } from '../app/models/user.js';
import { mongoConnect } from '../config/database.js';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { Constants } from '../config/constants.js';

const { MONGODB_URL, mongodb_name } = Constants;
const client = new MongoClient(MONGODB_URL);

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

const createDummyUsers = async (client: Db, count: number = 1) => {
  const data: UserType[] = [];
  await Array.from({ length: count }).forEach(async () => {
    data.push((await createRandomUser()) as UserType);
  });
  console.log('User Data: ', data);
  await client.collection('users').insertMany(data);
};

const createDummyProducts = async (client: Db, count: number = 10) => {
  const [user] = await Userm.fetchAll();
  const userId = await new ObjectId(user._id);
  const data: ProductType[] = [];
  await Array.from({ length: count }).forEach(async () => {
    data.push({
      ...((await createRandomProduct()) as ProductType),
      userId: userId,
    });
  });
  await client.collection('products').insertMany(data);
};

const main = async () => {
  await mongoConnect(async (client: MongoClient) => {
    const db = client.db(mongodb_name);
    await createDummyUsers(db);
    await createDummyProducts(db);
    await client.close();
  });
};

main();
