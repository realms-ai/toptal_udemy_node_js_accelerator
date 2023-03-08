import { Context } from 'https://deno.land/x/oak@v12.1.0/context.ts';
import { Router } from 'https://deno.land/x/oak@v12.1.0/mod.ts';
import debug from 'npm:debug@4.3.4';
import { v1 } from 'https://deno.land/std@0.178.0/uuid/mod.ts';

const router = new Router();
const log = debug('app:controller:todos');

interface Todo {
  id: string;
  task: string;
}

interface Data {
  type: string;
  value: Partial<Todo>;
}

let todos: Array<Todo> = [];

const index = (ctx: any, next: () => Promise<unknown>) => {
  log('In Todos List Route');
  // ctx.response.status = 200;
  ctx.response.body = {
    todos: todos,
  };
};

const show = async (ctx: any, next: () => Promise<unknown>) => {
  log('In Todos single show route');
  const id = await ctx.params.id;
  log('Params ID: ', id);

  // ctx.response.status = 200;
  ctx.response.body = {
    todo: todos[id],
  };
};

const create = async (ctx: any, next: () => Promise<unknown>) => {
  log('In Todos create route');
  const data = ctx.request.body();

  let newTodo: Todo = await data.value;
  newTodo.id = (await v1.generate()) as string;
  log('Value: ', newTodo);

  todos.push(newTodo);
  log('Returning Response: ', todos);

  ctx.response.status = 201;
  ctx.response.body = {
    message: 'Added new Todo to the list',
    id: todos.length,
  };
};

const update = async (ctx: any, next: Function) => {
  log('In Todos update route');
  const data = await ctx.request.body();

  const value = await data.value;
  const id = await ctx.params.id;
  log('Params ID: ', id);

  const todo = todos[id];
  if (todo) {
    log('Todo: ', todo);
    todo.task = value.task;
    todos[id] = todo;
  }

  log('Returning Response: ', todos);

  // ctx.response.status = 200;
  ctx.response.body = {
    message: 'Updated the Todo list',
    id: todo?.id,
  };
};

const destroy = async (
  { params, response }: { params: { id: string }; response: any },
  next: () => Promise<unknown>
) => {
  log('In Todos destroy route');
  const id = await +params.id;
  log('Params ID: ', id);

  const todo = todos[id];
  if (todo) {
    log('Deleting a todo task');
    await todos.splice(id, 1);
  }
  log('Todos: ', todos);

  response.status = 200;
  response.body = {
    success: true,
    message: 'deleted the todo task',
  };
};

router
  .get('/', index)
  .get('/:id', show)
  .post('/', create)
  .put('/:id', update)
  .delete('/:id', destroy);

router.use('/todos', router.routes());

export { router as todosRouter };
