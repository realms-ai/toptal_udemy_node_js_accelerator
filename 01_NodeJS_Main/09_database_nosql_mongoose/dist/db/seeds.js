import { faker } from '@faker-js/faker';
import { mongooseConnect } from '../config/database.js';
import { User } from '../app/models/user.js';
import { Product } from '../app/models/product.js';
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
const createDummyUsers = async (count = 1) => {
    const data = [];
    await Array.from({ length: count }).forEach(async () => {
        data.push((await createRandomUser()));
    });
    console.log('User Data: ', data);
    await User.insertMany(data);
};
const createDummyProducts = async (count = 10) => {
    const [user] = await User.find();
    const userId = await new ObjectId(user._id);
    const data = [];
    await Array.from({ length: count }).forEach(async () => {
        data.push({
            ...(await createRandomProduct()),
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
