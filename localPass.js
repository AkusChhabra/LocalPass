const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");

const algorithm = 'aes-256-cbc';

class createPassword {
    constructor(website,password) {
        this.website;
        this.password
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const askQuestion = (question) => {
return new Promise((resolve) => {
    rl.question(question, (answer) => {
    resolve(answer);
    });
});
};

const main = async () => {

    const input_pass = await askQuestion('Enter your new password: ');
    if (input_pass !== null && input_pass !== "") {
        const newPass = new createPassword("www.akuschhabra.com", input_pass);
        console.log("Password created!")
    } else {
        console.log("Unable to process input.")
    }

    rl.close();
};

main();