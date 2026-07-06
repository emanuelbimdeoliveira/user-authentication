import sqlite from "sqlite3";

const sqlite3 = sqlite.verbose();

const db = new sqlite3.Database("./database/users.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log("Banco conectado!");
  }
});

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        creation_date TEXT NOT NULL
    )
`);

export default db;
