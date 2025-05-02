const crypto = require("crypto");
const fs = require("fs");
//const zlib = require("zlib");

const direc = "./files"

//var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
var secret = "myPass";
//const key = crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32);
const key = crypto.scryptSync(secret, 'salt', 32);


//const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
//var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
var input = fs.createReadStream(direc + '/encrypted.txt');
//const gzipStream = zlib.createGzip();
var output = fs.createWriteStream(direc + '/decrypted.txt');

input.pipe(decipher).pipe(output);

output.on('finish', function() {
  console.log('Decrypted file written to disk!');
});
output.on('error', (err) => {
    console.error('Error during decryption:', err);
});