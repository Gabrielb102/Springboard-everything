"use strict";
/** Database setup for jobly. */

// PG allows for writing SQL straight to PostgreSQL
// getDatabaseUri() specifies which database to use
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

// I think this just makes the app less bug prone to make the assignment easier, 
// Correct me if I'm wrong, we haven't studied this yet
if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

db.connect();

module.exports = db;