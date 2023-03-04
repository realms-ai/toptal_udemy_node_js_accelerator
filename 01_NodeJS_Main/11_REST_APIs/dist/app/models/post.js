import { model } from 'mongoose';
import { postsSchema } from '../../db/migrations/create_posts.js';
// mongoose takes the model name and convert it to lower case along with pluralization
const Post = model('Post', postsSchema);
export { Post };
