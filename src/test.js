import * as crypto from 'crypto';

const encryption_key = crypto.scryptSync('fZZZsz', '', 32); // Must be 32 characters
const initialization_vector = 'X05IGQ5qdBnIqAWD'; // Must be 16 characters

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(encryption_key),
    Buffer.from(initialization_vector)
  );
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const b64encode = (text) => Buffer.from(text, 'utf8').toString('base64');
const hexencode = (text) => Buffer.from(text, 'utf8').toString('hex');

const hex2int = (text) => BigInt(parseInt(text, '16')).toString();
const hex2ascii = (text) => Buffer.from(text, 'hex').toString('ascii');

// encrypt - b64encode - hexencode - hex2int - "filter" - hex2ascii

const filterHex = (hex) => {
  const hexSplitted = hex.match(/..?/g);
  const hexFiltered = hexSplitted.filter(
    (hex) => parseInt(hex) >= 21 && parseInt(hex) <= 79
  );
  return hexFiltered.join('');
};

console.log(
  '🚀 ~ ',
  hex2ascii(filterHex(hex2int(hexencode(b64encode(encrypt('snap'))))))
);
