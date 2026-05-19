import sqlite3 from "sqlite3";

const sqlite =
  sqlite3.verbose();

const db =
  new sqlite.Database(
    "./pyaccess.db"
  );

db.serialize(() => {

  /* PRODUCTS */

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      sku TEXT,
      category TEXT,
      stock INTEGER,
      cost REAL,
      margin REAL,
      price REAL
    )
  `);

  /* SALES */

  db.run(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL,
      date TEXT
    )
  `);

  /* CUSTOMERS */

  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      address TEXT
    )
  `);

  /* CASHFLOW */

  db.run(`
    CREATE TABLE IF NOT EXISTS cashflow (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      description TEXT,
      amount REAL,
      date TEXT
    )
  `);

});

export default db;