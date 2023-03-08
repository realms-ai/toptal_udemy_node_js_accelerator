import express from 'express';

const router = express.Router();

const todos = [];

const index = (req, res, next) => {
  res.status(200).json({
    todos: todos,
  });
};

const show = (req, res, next) => {
  res.status(200).json({
    todo: todos[req.params.id],
  });
};

const create = (req, res, next) => {
  todos.push(req.body);
  res.status(201).json({
    message: 'Added new Todo to the list',
    id: todos.length,
  });
};

const update = (req, res, next) => {
  todos[req.params.id] = req.body;
  res.status(200).json({
    message: 'Updated the existing Todo list',
    id: req.params.id,
  });
};

const destroy = (req, res, next) => {
  todos.splice(req.params.id, 1);
  res.status(200).json({
    message: 'deleted the todo list',
    id: req.params.id,
  });
};

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

export { router as todosRouter };
