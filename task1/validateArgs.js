const commander = require('commander');
const fs = require('fs');

commander.storeOptionsAsProperties(true);

commander
  .requiredOption('-a, --action <action>')
  .option('-i, --input <file>', 'input file')
  .option('-o, --output <file>', 'output file')
  .requiredOption('-s, --shift <number>')
  .parse(process.argv);

module.exports = function validateArgs() {
  let inputStream;
  let outputStream;
  if (
    (commander.action !== 'encode' && commander.action !== 'decode') ||
    isNaN(Number(commander.shift))
  ) {
    console.error(
      'Please, use the following format: "$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt"'
    );
    process.exitCode = 1;
  } else if (commander.input && commander.output) {
    inputStream = fs.createReadStream(commander.input, 'utf-8');
    outputStream = fs.createWriteStream(commander.output, { flags: 'a' });
  } else if (commander.input && !commander.output) {
    inputStream = fs.createReadStream(commander.input, 'utf-8');
    outputStream = process.stdout;
  } else if (!commander.input && commander.output) {
    inputStream = process.stdin;
    outputStream = fs.createWriteStream(commander.output, { flags: 'a' });
  } else {
    inputStream = process.stdin;
    outputStream = process.stdout;
  }
  return { inputStream, outputStream };
};
