const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');
const { createWriteStream } = require('fs');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

morgan.token('body', req => {
  return JSON.stringify(req.body);
});

morgan.token('query', req => {
  return JSON.stringify(req.query);
});

app.use(
  morgan(':url :query :body', { stream: createWriteStream('requests.log') })
);

app.use(express.json());
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  if (statusCode) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
  }
  next(err);
});
app.use((err, req, res) => {
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

module.exports = app;
