const { error } = require("console");
const crypto = require("crypto");
const fs = require("fs");

const direc = "./files/";
const file_inp = "test.txt";
const file_out = "encrypted.enc";

const secret = "myPass";
const algorithm = 'aes-256-cbc';

createDir(direc);
checkBaseFile(direc, file_inp);

function encrypt(plaintext) {
  const iv = crypto.randomBytes(16);
  const key = getCipherKey(plaintext);
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let input = fs.createReadStream(direc + file_inp);
  let output = fs.createWriteStream(direc + file_out);

  output.write(iv);

  input.pipe(cipher).pipe(output);

  output.on('finish', function() {
    console.log('Encrypted file written to disk!');
  });
}

function getCipherKey(password) {
  return crypto.createHash('sha256').update(password).digest();
}

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Directory created at ${dir}`);
  }
}

function checkBaseFile(dir, file) {
  const path = direc + file;
  if (!fs.existsSync(path)) {
    console.error(`Error: ${file} cannot be encrypted as it does not exist.`)
  }
}

encrypt(secret);