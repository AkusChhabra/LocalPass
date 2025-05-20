const crypto = require("crypto");

const password = "password123";
const algorithm = "aes-256-cbc";
const ivLength = 16;
const keyLength = 32;
const iterations = 100000;

const keyGen = (pw, salt) => {
    const key = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
    return key;
}

function encrypt(plaintext) {
    const iv = crypto.randomBytes(ivLength);
    const salt = crypto.randomBytes(ivLength);
    const key = keyGen(password, salt);

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf-8'), cipher.final()]);
    const encrypted_new = Buffer.concat([salt, iv, encrypted]);

    const enc = encrypted_new.toString('base64');

    return enc;
}

function decrypt(encryptedtext) {
    const enc = Buffer.from(encryptedtext,'base64')
    const salt = enc.subarray(0,ivLength);
    const iv = enc.subarray(ivLength,ivLength*2);
    const encrypted = enc.subarray(ivLength*2);

    checkEncryptionValid(iv, encrypted);
    const key = keyGen(password, salt);

    const encryptedData = Buffer.from(encrypted, 'utf-8');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "utf8"), Buffer.from(iv, "utf8"));
    let decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  
    return decrypted.toString();
}

function checkEncryptionValid(iv, encrypted) {
    if (!iv || !encrypted) {
        throw new Error("Cipher is not valid.");
    }
    return;
}

const message = "this is a test message";

const encrypted = encrypt(message);
console.log(encrypted);

const decrypted = decrypt(encrypted);
console.log(decrypted);