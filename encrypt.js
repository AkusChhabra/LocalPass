const crypto = require("crypto");
const fs = require("fs");
const zlib = require("zlib");

const direc = "./files";

//var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
const secret = "myPass";
//const key_salt = crypto.scryptSync(secret, 'salt', 32);

function encrypt(plaintext) {
  const iv = crypto.randomBytes(16);
  const key = getCipherKey(plaintext);
  //const key = crypto.createHash('sha256').update(String(plaintext)).digest('base64').substring(0, 32);
  let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  //let encrypted = Buffer.concat([iv]);
  //let encrypted = Buffer.concat([iv, cipher.update(plaintext,'utf-8'), cipher.final()]);
  //let data = encrypted.toString('base64url');
  let input = fs.createReadStream(direc + '/test.txt'); // "try_to_decode_this"
  let output = fs.createWriteStream(direc + '/encrypted.enc');
  //const gzipStream = zlib.createGzip();
  
  console.log(iv);
  console.log(iv.toString());
  
  output.write(iv);

  input.pipe(cipher).pipe(output)

  output.on('finish', function() {
    console.log('Encrypted file written to disk!');
  });
}

function getCipherKey(password) {
  return crypto.createHash('sha256').update(password).digest();
}

encrypt(secret);