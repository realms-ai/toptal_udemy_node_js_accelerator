import { Schema } from 'mongoose';
const postsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    content: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
}, {
    timestamps: true,
});
export { postsSchema };
