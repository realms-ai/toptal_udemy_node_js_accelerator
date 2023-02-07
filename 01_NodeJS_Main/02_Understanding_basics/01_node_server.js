const http = require('http');
const routes = require('./02_routes');

// Way 1
// function rqListener(req, res) {}

// http.createServer(rqListener);

// Way 2
// http.createServer(function (req, res) {});

// Way 3
// const server = http.createServer((req, res) => {
//   // console.log(req)

//   // Read URL, Method (GET, POST, PUT) and Headers.
//   const [url, method] = [req.url, req.method];
//   console.log('\nNew Request\n');
//   console.log('Url: ', url, '\nMethod: ', method, '\nHeaders: ', req.headers);

//   // Routing the request to ROUTES file
//   routes(req, res);

//   // exit the code after the 1st request
//   // process.exit();
// });
const server = http.createServer(routes);

server.listen(3000);
