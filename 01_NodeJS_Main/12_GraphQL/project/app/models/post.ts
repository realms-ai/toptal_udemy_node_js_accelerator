import mongoose, { Model, model } from 'mongoose';

import { ObjectId } from 'mongodb';
import { postsSchema } from '../../db/migrations/create_posts.js';

interface PostType {
  readonly _id: ObjectId;
  title: string;
  imageUrl: string;
  content: string;
  readonly userId: ObjectId;
  _doc: any;
  createdAt: Date;
  updatedAt: Date;
}

interface PostMethods {}

type PostModel = Model<PostType, {}, PostMethods>;
// mongoose takes the model name and convert it to lower case along with pluralization
const Post = model('Post', postsSchema);

export { Post, PostType, PostMethods, PostModel };
