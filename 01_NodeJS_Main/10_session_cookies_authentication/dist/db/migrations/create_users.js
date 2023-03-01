import { Schema } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: String,
    cart: {
        type: Schema.Types.Mixed,
        default: {},
    },
    orders: [
        {
            items: [
                {
                    _id: {
                        type: Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        min: 1,
                        required: true,
                    },
                    title: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: Number,
                        min: 0,
                        required: true,
                    },
                    imageUrl: {
                        type: String,
                        required: true,
                    },
                    description: String,
                },
            ],
            costPrice: {
                type: Number,
                min: 0,
                required: true,
            },
            taxes: {
                type: Number,
                min: 0,
                required: true,
            },
            finalPrice: {
                type: Number,
                min: 0,
                required: true,
            },
            totalProducts: {
                type: Number,
                min: 0,
                required: true,
            },
            index: {
                type: Number,
                min: 0,
            },
        },
    ],
}, {
    timestamps: true,
});
export { userSchema };
