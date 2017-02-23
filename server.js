const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.hateList = []

if (!module.parent) {
  app.listen(3000, () => {
    console.log('160h8 is running on (http://localhost:3000)');
  });
}

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.get('/hateList', (request, response) => {
  response.send({ hateList: app.locals.hateList });
});

app.post('/hateList', (request, response) => {
  const hated = request.body.hated;

  hated.id = hated.id || Date.now();
  app.locals.hateList.push(hated);

  response.status(201).send({ hated: hated });
});

app.put('/hateList/:id', (request, response) => {
  const hated = request.body.hated;
  const id = parseInt(request.params.id, 10);
  const index = app.locals.hateList.findIndex((m) => m.id === id);

  if (index === -1) { return response.sendStatus(404); }

  const formerHated = app.locals.hateList[index];
  app.locals.hateList[index] = Object.assign(formerHated, hated);

  return response.sendStatus(204);
});

module.exports = app;
