import express, { Request, Response } from 'express';
import fs from 'fs';

import { Constants } from '../../../config/constants.js';
import { Post, PostType } from '../../models/post.js';
import { check, body, validationResult } from 'express-validator';

const router = express.Router();
const { space, domain } = Constants;
import debug from 'debug';
import { fstat } from 'fs';
const log = debug('app:Posts:Controller');

// FUNCTIONS
// index: list all the Posts
// show/:id: will show only one Post w.r.t ID
// add: show a form to add a new Post
// create(POST): will add one Post to DB
// edit: show a form to edit an existing Post
// update/:id(PUT/PATCH): will update a Post w.r.t ID
// delete/:id(DELETE): will delete a Post w.r.t ID

const all = () => {
  log('In Post all route');
  router.use((req, res, next) => {
    // if (req.cookies?.user) next();
    // else res.redirect(`${domain}`);
    next();
  });
};

const index = () => {
  router.get('/', async (req, res, next) => {
    try {
      log(space, 'Middleware is in Post Index Route Page');
      const userId = req.cookies?.userId;
      const posts = await Post.find({ userId: userId })
        .select('title imageUrl content')
        .populate('userId')
        .select('email username _id');
      log('Posts: ', posts);
      res.status(200).json({
        posts: posts,
      });
    } catch (err) {
      throw err;
      next();
    }
  });
};

const create = () => {
  // Defined the validations
  const titleValidation = body('title')
    .isAlphanumeric()
    .isLength({ min: 3 })
    .trim();
  const imageUrlValidation = body('imageUrl').isURL();
  // const priceValidation = body('price').isFloat();
  const descriptionValidation = body('content')
    .isLength({ min: 5, max: 400 })
    .trim();
  const PostCreateValidations = [
    titleValidation,
    // imageUrlValidation,
    // priceValidation,
    descriptionValidation,
  ];

  router.post(
    '/',
    PostCreateValidations,
    async (req: Request, res: Response) => {
      log('POST request of post route');
      const userId = req.cookies?.userId;
      const errors = validationResult(req);
      log('Request Body: ', req.body);
      if (!errors.isEmpty()) {
        log('Validation Errors: ', errors.array());
        return res.status(422).json({
          errors: errors.array().map((err) => `${err.param}: ${err.msg}`),
        });
      }
      const data = { ...req.body, userId: userId };
      const image = await req.file;
      log('File Image: ', image);
      if (image) {
        data.imageUrl = image.filename;
      } else {
        delete data.imageUrl;
      }

      const post = await new Post(data);
      await post.save();
      post.populate('userId');
      res.status(201).send({ post: post });
    }
  );
};

const show = () => {
  router.get('/:id', async (req, res) => {
    log(space, 'Middleware is in Show Post Page');
    const id: string = req.params.id;
    // const user = req.cookies?.user;
    log('Finding the Post', id);
    const post = await Post.findOne({ _id: id, userId: req.cookies.userId })
      .populate('userId')
      .select('email username _id'); // Post.findByPk(id) OR Post.findAll({where: {id: id}});
    log('Post: ', Post);
    res.status(200).json({
      post: post,
    });
  });
};

const update = () => {
  router.put('/:id', async (req, res) => {
    log(space, 'Middleware is in Update Post Page');
    const id: string = req.params.id;
    const data: Partial<PostType> = req.body;
    const image = await req.file;
    log('File Image: ', image);
    // if (!image) {
    //   const post = await Post.findById(id);
    //   return res.status(422).json({
    //     errorMessage: 'Attached file is not an image',
    //     validationErrors: [],
    //   });
    // }
    if (image?.destination) data.imageUrl = image.filename;
    else delete data.imageUrl;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    post?.populate('userId');
    res.status(200).json({ post: post });
  });
};

const destroy = () => {
  router.delete('/:id', async (req, res) => {
    log(space, 'Middleware is in Delete Post Page');
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    // Delete the image file on edit and delete
    // fs.unlink(filepath, (err) => {
    //   if(err) throw(err)

    // })
    // user.posts.pull(post._id)  // This will only happen if we have a nested child POSTS in USERS document
    res.status(200).json({
      post: post,
    });
  });
};

const main = () => {
  all();
  index();
  show();
  // add();
  create();
  destroy();
  update();
};

main();

export { router as apiPostRoutes };
