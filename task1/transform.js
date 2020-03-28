const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

module.exports = function encode(str, shift) {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    let symbol = str[i];
    if (symbol.match(/[a-z]/i)) {
      const currentIndex = alphabet.indexOf(symbol.toLowerCase());
      let finalIndex = currentIndex + Number(shift);
      if (finalIndex > 25) {
        finalIndex = finalIndex - 26;
      }
      if (symbol === symbol.toUpperCase()) {
        symbol = alphabet[finalIndex].toUpperCase();
      } else {
        symbol = alphabet[finalIndex];
      }
    }
    result += symbol;
  }
  return result;
};
