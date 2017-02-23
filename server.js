const express = require('express');
const app = express();

app.locals.hate = []

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(3000, () => {
  console.log('160h8 is running on (http://localhost:3000)');
});
