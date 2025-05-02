const crypto = require("crypto");
const fs = require("fs");
//const zlib = require("zlib");

const direc = "./files"

//var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
const secret = "myPass";
//const key = crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32);
const key = crypto.scryptSync(secret, 'salt', 32);

//const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
var cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
//var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
var input = fs.createReadStream(direc + '/test.txt'); // "try_to_decode_this"
//const gzipStream = zlib.createGzip();
var output = fs.createWriteStream(direc + '/encrypted.txt');

input.pipe(cipher).pipe(output);

output.on('finish', function() {
  console.log('Encrypted file written to disk!');
});