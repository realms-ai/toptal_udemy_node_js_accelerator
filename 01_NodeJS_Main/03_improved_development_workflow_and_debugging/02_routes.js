// *** Creating a route file to segregate the code from single file to multiple files ***
const fs = require('fs');
const path = '.';
const fileName = `${path}/message.txt`;
const usersDb = `${path}/users.txt`;

const htmlContent = (body) => {
  return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            
            <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,400i|Nunito:300,300i" rel="stylesheet">
            
            <title>node server</title>
        </head>
        <body class="container">
            ${body}
        </body>
    </html>`;
};

const requestHandler = (req, res) => {
  const [url, method] = [req.url, req.method];
  // Sending a response
  let body = 'Testing Node Server';
  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    body = `
      <h1> Add a message </h1>
      <form action='/message' method='POST'>
        <input type='text' name='message'>
        <button type='submit'>
          Submit
        </button>
      </form>
      </br>
      <h1> Create a new User </h1>
      <form action='/users' method='POST'>
        <input type='text' name='user'>
        <button type='submit'>
          Submit
        </button>
      </form>
      </br>
      <a href='/users'>Show all users</a>
    `;
    res.write(htmlContent(body));
    return res.end();
  } else if (url === '/message' && method === 'POST') {
    try {
      // Parsing request data
      const body = [];
      req.on('data', (chunk) => {
        console.log('Chunk: ', chunk);
        body.push(chunk);
      });
      req.on('end', () => {
        let message = Buffer.concat(body).toString();
        console.log('parsedData', message);
        message = message.split('=')[1];

        // fs.writeFile(fileName, `New Message: ${message}\n`);

        // ** SYNC ** stops further methods from execution until and unless this process is not done. Should be avoided as it stops listening to coming requests on the server

        // fs.appendFileSync(fileName, `New Message: ${message}\n`);

        // fs.appendFile(fileName, `New Message: ${message}\n`, 'utf-8', (err) => {
        //   res.writeHead(302, { Location: '/' });
        //   return res.end();
        // });

        fs.promises
          .appendFile(fileName, `New Message: ${message}\n`)
          .then(() => {
            console.log('Message stored');
            // res.statusCode = 302;
            // res.setHeader('Location', '/');
            res.writeHead(302, { Location: '/' });
            return res.end();
          })
          .catch((err) => {
            console.log('Error occured while storing the message', err);
          });
      });
    } catch (err) {}
    // ** 2 methods to redirect the request **
  } else if (url === '/users' && method === 'GET') {
    // Read users from the file and list them
    fs.promises
      .readFile(usersDb, 'utf-8')
      .then((data) => {
        console.log('Data: ', data);
        data = data.split('\n');
        let usersList = '';
        data.forEach((user) => {
          usersList += `<li> ${user} </li>`;
        });
        return usersList;
      })
      .then((usersList) => {
        console.log('Users List: ', usersList);
        const body = `
          <h1> List of Users </h1>
          <ul>
            ${usersList}
          </ul>
          <a href='/'> Home Page </a>
        `;
        res.write(htmlContent(body));
        return res.end();
      })

      .catch((err) => {
        console.log('Error Occured: ', err);
      });
  } else if (url === '/users' && method === 'POST') {
    // Write new users to the file
    const body = [];
    req.on('data', (chunk) => {
      console.log('Chunk: ', chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      let user = Buffer.concat(body).toString();
      user = user.split('=')[1];
      console.log('User', user);
      fs.promises
        .appendFile(usersDb, `${user}\n`)
        .then(() => {
          console.log('User stored');
          // res.statusCode = 302;
          // res.setHeader('Location', '/');
          res.writeHead(302, { Location: '/users' });
          return res.end();
        })
        .catch((err) => {
          console.log('Error occured while storing the user', err);
        });
    });
  } else {
    res.write(htmlContent(body));
    return res.end();
  }
};

// Different ways of exporting objects
module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: 'some hard coded text',
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';
