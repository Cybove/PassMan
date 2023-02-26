const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("PassMan.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL
);`);

db.run(`CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    site TEXT ,
    user_id INTEGER ,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`);

module.exports = db;



