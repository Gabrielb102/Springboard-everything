"use strict";

/** Shared config for application; can be required many places. */

// Requirements doc
// dotenv is used to load contents from the .env file into process.env automatically
// But I don't see a .env file anywhere
// colors allows us to color text in the console
require("dotenv").config();
require("colors");

// Config variables doc
// SECRET_KEY is used for creating hashes and signing tokens in the app, kept here for security
// PORT is the port from which the server serves, assignable here
// DATABASE_URL Specifies Database: Use dev database, testing database, or via env var, production database
// BCRYPT_WORK_FACTOR: How many times Bcrypt hashes, which differs if being used for test
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "jobly_test"
      : process.env.DATABASE_URL || "jobly";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

// Annunciation of Config variables in the console
console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
