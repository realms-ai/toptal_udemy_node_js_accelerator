import { faker } from '@faker-js/faker';
import debug from 'debug';
import { mongooseConnect } from '../config/database.js';
import { User } from '../app/models/user.js';
import { Product } from '../app/models/product.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
const log = debug('app:db:seeds');
const errLog = debug('error:db:seeds');
// Use of NPM package Faker-JS to create dummy data
const createRandomUser = async () => {
    try {
        log('Creating Random User');
        return bcrypt.hash('password', 13).then((hashedPassword) => {
            log('Hashed Password: ', hashedPassword);
            return {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: hashedPassword,
            };
        });
    }
    catch (error) {
        errLog(error);
    }
};
const createRandomProduct = () => {
    return {
        title: faker.word.noun(),
        imageUrl: faker.image.image(),
        description: faker.company.catchPhraseDescriptor(),
        price: +faker.finance.amount(1, 15, 2),
    };
};
const createDummyUsers = async (count = 10) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const result = await createRandomUser();
        log('User Result: ', result);
        data.push(result);
    }
    log('User Data: ', data);
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
    log('Products: ', data);
    await Product.insertMany(data);
};
const main = async () => {
    await mongooseConnect();
    await createDummyUsers();
    await createDummyProducts();
};
main();
