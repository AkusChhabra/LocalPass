const crypto = require("crypto");
const fs = require("fs");
const stream  = require("stream");
const { buffer } = require("stream/consumers");
//const zlib = require("zlib");

const direc = "./files"

//var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
var secret = "myPass";
//const key = crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32);
//const key_salt = crypto.scryptSync(secret, 'salt', 32);


function decrypt(plaintext) {

    const key = getCipherKey(plaintext);
    let input = fs.createReadStream(direc + '/encrypted.enc', { start: 0 });
    let iv = Buffer.alloc(16);
    let file_inp = fs.readFileSync(direc + '/encrypted.enc');
    //console.log(Buffer.from(file_inp,'base64').slice(16));
    iv = Buffer.from(file_inp, 'base64').slice(0,16);
    //const iv = crypto.randomBytes(16);
    console.log(iv)
    console.log(iv.toString())
    //let input = new stream(Buffer.from(file_inp,'base64').slice(16)); 
    
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    //let decrypted = Buffer.concat([iv, decipher.update(plaintext)]);
    //var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
    //console.log(input)
    //fs.readSync(fs.openSync(direc + '/encrypted.enc', 'r'), iv, 0, 16, 0);
    let output = fs.createWriteStream(direc + '/decrypted.enc');
    //const gzipStream = zlib.createGzip();

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

decrypt(secret);