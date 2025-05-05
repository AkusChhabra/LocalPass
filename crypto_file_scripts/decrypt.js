const crypto = require("crypto");
const fs = require("fs");

const direc = "./files/";
const file_inp = "encrypted.enc";
const file_out = "decrypted.enc";

const secret = "myPass";
const algorithm = 'aes-256-cbc';

createDir(direc);
checkBaseFile(direc, file_inp);

function decrypt(plaintext) {
  const iv = crypto.randomBytes(16);
  const key = getCipherKey(plaintext);
  let input = fs.createReadStream(direc + file_inp, { start: 0 });
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let output = fs.createWriteStream(direc + file_out);

  input.pipe(decipher).pipe(output);

  output.on('finish', function() {
  console.log('Decrypted file written to disk!');
  });
  output.on('error', (err) => {
      console.error('Error during decryption:', err);
  });
}

function getCipherKey(password) {
  return crypto.createHash('sha256').update(password).digest();
}

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Directory created at ${dir}`);
  } else {
    console.log(`Directory already exists at ${dir}`);
  }
}

function checkBaseFile(dir, file) {
  const path = direc + file;
  if (!fs.existsSync(path)) {
    console.error(`Error: ${file} cannot be decrypted as the encrypted file does not exist`)
  }
}

decrypt(secret);