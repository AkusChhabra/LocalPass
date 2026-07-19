// Initialize SQLite database

const Database = require('better-sqlite3');

const db = new Database('app.db', { verbose: console.log });

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    website TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL,
    lastUpdated TEXT NOT NULL
  )
`).run();

const insertUser = db.prepare('INSERT INTO users (website, username, password, lastUpdated) VALUES (?, ?, ?, ?)');
const info = insertUser.run('Google', 'john.doe@example.com', '****', 'Now');
console.log(`Inserted row ID: ${info.lastInsertRowid}`);

/*
const findUser = db.prepare('SELECT * FROM users WHERE email = ?');
const user = findUser.get('john.doe@example.com');
console.log('Found user:', user);

const allUsers = db.prepare('SELECT * FROM users').all();
console.log('All database users:', allUsers);
*/

db.close();
