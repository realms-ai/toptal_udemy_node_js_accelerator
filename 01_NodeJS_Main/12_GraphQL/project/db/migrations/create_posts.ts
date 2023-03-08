import { Schema } from 'mongoose';
import { PostMethods, PostModel, PostType } from '../../app/models/post.js';

const postsSchema = new Schema<PostType, PostModel, PostMethods>(
  {
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
  },
  {
    timestamps: true,
  }
);

export { postsSchema };
