// db.js
import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve("./data.sqlite"));

// Создаем таблицу, если её нет
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cargoName TEXT,
    loadPlace TEXT,
    unloadPlace TEXT,
    length REAL,
    width REAL,
    height REAL,
    weight REAL,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    privacy INTEGER,
    date TEXT,
    tg_id TEXT,
    tg_first_name TEXT,
    tg_last_name TEXT,
    tg_username TEXT
  )
`
).run();

export default db;
