// https://deno.land/std@0.178.0/http/mod.ts?s=Server

import * as mod from 'https://deno.land/std@0.178.0/http/mod.ts';

const server = mod.serve((_req) => new Response('Hello, world'), {
  port: 3000,
});

// for await (const req of server) {
//   req.responsd({ body: 'Hello World from Server 1\n' });
// }

// OR
import { Server, serve } from 'https://deno.land/std@0.178.0/http/server.ts';

const port = 3001;
const handler = (request: Request) => {
  const body = `Your user-agent is:\n\n${
    request.headers.get('user-agent') ?? 'Unknown'
  }`;
  return new Response(body, { status: 200 });
};

const server_1 = new Server({ port, handler });

console.log(`server listening on http://localhost:${port}`);

const port2 = 3002;

const server_2 = serve((_req) => new Response('Hello World from server 2'), {
  port: port2,
});

server_2.catch((err) => {
  console.log('Error');
});

await server_1.listenAndServe();
