const commander = require('commander');
const { pipeline } = require('stream');
const stream = require('stream');
const encode = require('./transform');
const validateArgs = require('./validateArgs');

const { inputStream, outputStream } = validateArgs();
const transformStream = new stream.Transform({ transform: caesarCipher });

if (inputStream) {
  pipeline(inputStream, transformStream, outputStream, err => {
    if (err) {
      console.error(
        'Your input file is invalid. Please, check it an try again.'
      );
      process.exitCode = 1;
    } else {
      console.log('Process finished successfully!');
    }
  });
}

function caesarCipher(chunk, encoding, callback) {
  chunk = chunk.toString('utf8');
  if (commander.action === 'encode') {
    outputStream.write(encode(chunk, commander.shift));
  } else {
    outputStream.write(encode(chunk, 26 - commander.shift));
  }
  callback();
}
