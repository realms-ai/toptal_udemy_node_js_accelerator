import { graphqlHTTP } from 'express-graphql';
import debug from 'debug';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { schema } from '../schema/01_basics.js';
import { User } from '../../models/user.js';
import { Constants } from '../../../config/constants.js';
import { Post } from '../../models/post.js';
const log = debug('app:graphql');
const errLog = debug('app:error:graphql');
const inputValidator = validator.default;
const { SECRET } = Constants;
const hello_1 = () => {
    log('In hello_1 function');
    return 'Hello World!';
};
const hello_2 = () => {
    log('In hello_2 function');
    return {
        text: 'Hello World',
        views: 100,
    };
};
const createUser = async ({ userInput }, req) => {
    const { email, username, password } = userInput;
    log('In Create User route');
    log('User Input: ', userInput);
    try {
        // Checking validations
        const errors = [];
        const emailValidation = inputValidator.isEmail(email);
        const passwordValidation = [
            !inputValidator.isEmpty(password),
            inputValidator.isLength(password, { min: 5 }),
        ];
        log('Password Validation: ', passwordValidation);
        if (!emailValidation)
            errors.push({ message: 'Email is invalid' });
        if (passwordValidation.includes(false))
            errors.push({ message: 'Password too short' });
        if (errors.length > 0) {
            errLog('Errors: ', errors);
            const error = new Error('Invalid Input');
            error.cause = {
                data: errors,
                code: 422,
            };
            throw error;
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const error = new Error('User exists already');
            throw error;
        }
        log('Hashing Password');
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            username: username,
            password: hashedPassword,
        });
        const createdUser = await user.save();
        log('User Created in SignUp');
        return { ...createdUser._doc, _id: createdUser._id.toString() };
    }
    catch (error) {
        errLog('Caught error in Try/Catch', error);
        throw error;
    }
};
const login = async ({ userInput }, req) => {
    const { email, password } = userInput;
    log('In Login Route');
    log('Input Data: Email: ', email, ', Password: ', password);
    // Checking Validation
    const errors = [];
    const emailValidation = inputValidator.isEmail(email);
    const passwordValidation = [
        !inputValidator.isEmpty(password),
        inputValidator.isLength(password, { min: 5 }),
    ];
    log('Password Validation: ', passwordValidation);
    if (!emailValidation)
        errors.push({ message: 'Email is invalid' });
    if (passwordValidation.includes(false))
        errors.push({ message: 'Password too short' });
    log('Checking validation and errors: ', errors);
    if (errors.length > 0) {
        errLog('Errors: ', errors);
        const error = new Error('Invalid Input');
        error.cause = {
            data: errors,
            code: 422,
        };
        throw error;
    }
    log('Finding User adn comparing password');
    const user = await User.findOne({ email: email });
    if (user) {
        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
            const token = jwt.sign({ email: user.email, userId: user._id.toString() }, SECRET, { expiresIn: '1h' });
            return {
                token: token,
                userId: user._id.toString(),
            };
        }
    }
    log('Returning error if user not found or password incorrect');
    const error = new Error('Invalid credentials');
    error.cause = {
        code: 401,
    };
    throw error;
};
const createPost = async ({ userInput }, req) => {
    log('In create post route');
    log('Data: ', userInput);
    if (!req.cookies.isAuth) {
        log('Not authorized to access the route');
        const error = new Error('Unauthorized Access');
        error.cause = {
            code: 401,
        };
        throw error;
    }
    const user = await User.findById(req.cookies.userId);
    if (!user) {
        log('User not found');
        const error = new Error('Unauthorized Access');
        error.cause = {
            code: 401,
        };
        throw error;
    }
    const { title, content, imageUrl } = userInput;
    // Checking Validation
    const errors = [];
    const titleValidation = [
        !inputValidator.isEmpty(title),
        inputValidator.isLength(title, { min: 5 }),
    ];
    log('Title Validation: ', titleValidation);
    if (titleValidation.includes(false)) {
        errors.push('Invalid Title');
    }
    if (errors.length > 0) {
        const error = new Error('Invalid input');
        error.cause = {
            data: errors,
            code: 422,
        };
        throw error;
    }
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        userId: req.cookies.userId,
    });
    const createdPost = await post.save();
    createdPost.populate('userId');
    log('Returning create post response');
    return {
        ...createdPost._doc,
        _id: createdPost._id.toString(),
        createdAt: createdPost.createdAt.toISOString(),
        updatedAt: createdPost.updatedAt.toISOString(),
    };
};
const rootValues = {
    hello_1: hello_1,
    hello_2: hello_2,
    createUser: createUser,
    login: login,
    createPost: createPost,
};
const route = graphqlHTTP({
    schema: schema,
    rootValue: rootValues,
    graphiql: true,
    // formatError(err) {   (Deprecated)
    //   if (!err.originalError) return err;
    //   const errCause = err.cause as { data: object[]; code: number };
    //   const data = errCause.data;
    //   const message = err.message || 'An error occurred';
    //   const code = errCause.code;
    //   return {
    //     message: message,
    //     status: code,
    //     data: data,
    //   };
    // },
    customFormatErrorFn(err) {
        if (!err.originalError)
            return err;
        errLog(err);
        const errCause = err.cause;
        const data = errCause?.data ? errCause.data : [];
        const message = err.message || 'An error occurred';
        const code = errCause?.code ? errCause.code : 500;
        return {
            message: message,
            status: code,
            data: data,
        };
    },
});
export { route as basicRoutes };
