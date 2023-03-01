import { Schema } from 'mongoose';
const productsSchema = new Schema({
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
export { productsSchema };
