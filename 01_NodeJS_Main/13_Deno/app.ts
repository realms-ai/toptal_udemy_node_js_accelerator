import { Application } from 'https://deno.land/x/oak@v12.1.0/mod.ts';
import { green, yellow } from 'https://deno.land/std@0.53.0/fmt/colors.ts';
import debug from 'npm:debug@4.3.4';

import { todosRouter } from './src/routes/todos.ts';

const app = new Application();
const log = debug('app:main');
const errLog = debug('app:error');

try {
  app.addEventListener('listen', ({ secure, hostname, port = 8000 }) => {
    const protocol = secure ? 'https://' : 'http://';
    const url = `${protocol}${hostname ?? 'localhost'}:${port}`;
    log(`${yellow('Listening on:')} ${green(url)}`);
  });

  app.use(async (ctx, next) => {
    try {
      if (ctx.request.hasBody) {
        const data = await ctx.request.body();
        log('Request Data: ', JSON.stringify(data));
        log(`body ${JSON.stringify(await data?.value)}`);
      }
      log('Some middleware in between');
      ctx.response.headers.set('Content-Type', 'application/json');
      next();
    } catch (error) {
      errLog(error);
      next();
    }
  });

  app.use((ctx, next) => {
    ctx.response.headers.set('Access-Control-Allow-Orgin', '*');
    ctx.response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE'
    );
    ctx.response.headers.set(
      'Access-Control-Allow_Headers',
      'Content-Type, Authorization'
    );
  });

  app.use(todosRouter.routes());
  app.use(todosRouter.allowedMethods());

  log('Server going to run on PORT: 8000');
  await app.listen({ port: 8000 });
} catch (error) {
  app.use((ctx, next) => {
    errLog(error);
    ctx.response.status = 500;
    ctx.response.body = {
      message: 'Error occurred',
      error: error,
    };
  });
}
