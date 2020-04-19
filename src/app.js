const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');
const { createWriteStream } = require('fs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { handleError } = require('./errorHandler');
const { logger } = require('./errorHandler');
const { MONGO_CONNECTION_STRING } = require('./common/config');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const mongoose = require('mongoose');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', async () => {
    console.log("we're connected!");
    await db.dropDatabase();
    cb();
  });
};

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
  handleError(err, res);
  next();
});

process.on('uncaughtException', error => {
  logger.error({ statusCode: 500, message: error.message });
  const exit = process.exit;
  logger.on('finish', () => {
    exit(1);
  });
});

process.on('unhandledRejection', reason => {
  logger.error({ statusCode: 500, message: reason });
});

module.exports = { app, connectToDB };
