const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const commonBeforeAll = async () => {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM companies");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(`
    INSERT INTO companies(handle, name, num_employees, description, logo_url)
    VALUES ('c1', 'C1', 1, 'Desc1', 'http://c1.img'),
           ('c2', 'C2', 2, 'Desc2', 'http://c2.img'),
           ('c3', 'C3', 3, 'Desc3', 'http://c3.img')`);

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);
      
  await db.query(`
    INSERT INTO jobs (title, salary, equity, company_handle)
    VALUES ('janitor', 25000, 0, 'c1'), 
           ('software developer', 80000, 1, 'c2'),
           ('trash person', 70000, 0, 'c3'),
           ('skydiving instructor', 45000, 0, 'c2')`);
}

const commonBeforeEach = async () => {
  await db.query("BEGIN");
}

const commonAfterEach = async () => {
  await db.query("ROLLBACK");
}

const commonAfterAll = async () => {
  await db.end();
}

// Get the ids for the test jobs
const getJobIds = async () => {
  jobIds = [];
  const result = await db.query(`SELECT id FROM jobs`);
  for (let n in result.rows) {
    jobIds.push(result.rows[n].id);
  }
  return jobIds
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  getJobIds
};