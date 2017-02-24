const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)

app.locals.hateList = [{ id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 'December 31, 1969' }]

app.listen(process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (request, response) => {
  response.sendfile(__dirname + '/public/index.html')
});

app.get('/hateList', (request, response) => {
  response.send( app.locals.hateList );
});

app.get('/hateList/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const index = app.locals.hateList.findIndex((m) => m.id === id);

  if (index === -1) { return response.sendStatus(404); }

  response.send({ hateList: app.locals.hateList[index] });
});

app.post('/hateList', (request, response) => {
  const { hated } = request.body;

  hated.id = hated.id || Date.now();
  hated.forgive = hated.forgive || false

  app.locals.hateList.push(hated);

  response.status(201).send({ hated: hated });
});

app.put('/hateList/:id', (request, response) => {
  const hated = request.body
  const id = parseInt(request.params.id, 10);
  const index = app.locals.hateList.findIndex((m) => m.id === id);

  if (index === -1) { return response.sendStatus(404); }

  const formerHated = app.locals.hateList[index];
  app.locals.hateList[index] = Object.assign(formerHated, hated);

  response.status(204).send({ hateList: app.locals.hateList[index] });
});

module.exports = app;
