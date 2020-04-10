const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

function handleError(err, res) {
  logger.error(err);
  const { statusCode, message } = err;
  if (statusCode) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
}

process.on('uncaughtException', error => {
  logger.error(error);
  throw new Error(`captured error: ${error.message}`);
});

process.on('unhandledRejection', reason => {
  logger.error(reason);
  throw new Error(`Unhandled rejection detected: ${reason.message}`);
});

module.exports = { ErrorHandler, handleError };
