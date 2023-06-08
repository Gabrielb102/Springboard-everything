"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Company = require("../models/company");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM companies");

  await Company.create(
      {
        handle: "c1",
        name: "C1",
        numEmployees: 1,
        description: "Desc1",
        logoUrl: "http://c1.img",
      });
  await Company.create(
      {
        handle: "c2",
        name: "C2",
        numEmployees: 2,
        description: "Desc2",
        logoUrl: "http://c2.img",
      });
  await Company.create(
      {
        handle: "c3",
        name: "C3",
        numEmployees: 3,
        description: "Desc3",
        logoUrl: "http://c3.img",
      });

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: true,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

  await db.query(`
  INSERT INTO jobs (title, salary, equity, company_handle)
  VALUES ('janitor', 25000, 0, 'c1'), 
        ('software developer', 80000, 1, 'c2'),
        ('trash person', 70000, 0, 'c3'),
        ('skydiving instructor', 45000, 0, 'c2')`);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

// Get the ids for the test jobs
const getJobIds = async () => {
  let jobIds = [];
  const result = await db.query(`SELECT id FROM jobs`);
  for (let n in result.rows) {
    jobIds.push(result.rows[n].id);
  }
  return jobIds
}

const userToken = createToken({ username: "u1", isAdmin: false });
const adminToken = createToken({username: "u2", isAdmin: true});
const otherUserToken = createToken({ username: "u3", isAdmin: false });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  getJobIds,
  userToken, adminToken, otherUserToken
};
