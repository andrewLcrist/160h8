const express = require('express');
const app = express();

app.locals.hate = []

if (!module.parent) {
  app.listen(3000, () => {
    console.log('160h8 is running on (http://localhost:3000)');
  });
}

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.get('/hate', (request, response) => {
  response.send({ hate: app.locals.hate });
});

app.post('/hate', (request, response) => {
  const hate = request.body.hate;

  hate.id = hate.id || Date.now();
  app.locals.hate.push(hate);

  response.status(201).send({ hate: hate });
});

module.exports = app;
