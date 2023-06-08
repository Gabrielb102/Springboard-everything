// Destructure it so you can just call it
const { Client } = require("pg");

let DB_URI;

// If we're running in test "mode", use our test db
// Make sure to create both databases!
if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///usersdb_test";
} else {
  DB_URI = "postgresql:///usersdb";
}

// The client instance (to access the db) must be created
let db = new Client({
  connectionString: DB_URI
});

//Connect to postgreSQL on your machine
db.connect();

// Export so that it is importable
module.exports = db;