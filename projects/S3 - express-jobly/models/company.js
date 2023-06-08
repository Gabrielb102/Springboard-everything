"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Company {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database. */

  static async create({ handle, name, description, numEmployees, logoUrl }) {
    const duplicateCheck = await db.query(
          `SELECT handle
           FROM companies
           WHERE handle = $1`,
        [handle]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate company: ${handle}`);

    const result = await db.query(
          `INSERT INTO companies
           (handle, name, description, num_employees, logo_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
        [
          handle,
          name,
          description,
          numEmployees,
          logoUrl,
        ],
    );
    const company = result.rows[0];
    return company;
  }

  /** Find all companies.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...] 
   * filter is optional, and can contain one or all of these parameters: 
   * {name : string, minEmployees : num, maxEmployees : num }*/

  static async findAll(filter) {
    let filters = [];
    let whereClause = '';
    let name, minEmployees, maxEmployees
    let ns = [];
    let prepareStatement = ''

    // Creation notes: 
    // I attempted to create a sqlForFilter function but opted not to,
    // because making simple string additions would be simpler to implement (even if I have to do it twice for the user search route)
    // and simpler to change in the case that more search fields were offered in the future of the app
    if (filter) {
      ({name, minEmployees, maxEmployees} = filter);
      filters = [name, minEmployees, maxEmployees].filter((filt) => filt ? true : false);
    }

    // Check for conflicting min/max employees 
    if (minEmployees && maxEmployees) {
      if (minEmployees > maxEmployees) {
        throw new BadRequestError("Conflicting min and max employees filters");
      }
    }

    // create a WHERE clause
    if (filters.length) {
      whereClause = `WHERE `;

      let n = 1;
      if (name) {
        name = `%${name}%`
        whereClause += `LOWER(name) LIKE $${n} `;
        n++;
        ns.push(`$${n}`);
      }
      if (minEmployees) {
        if (name) whereClause += `AND `;
        whereClause += `num_employees > $${n} `
        n++;
        ns.push(`$${n}`);
      }
      if (maxEmployees) {
        if (name || minEmployees) whereClause += `AND `;
        whereClause += `num_employees > $${n} `
      }
      ns.push(`$${n}`);
      // prepareStatement = `PREPARE ps (TEXT, INT) AS `
    };

    const sqlQuery = `${prepareStatement}SELECT handle,
                name,
                description,
                num_employees AS "numEmployees",
                logo_url AS "logoUrl"
                FROM companies ${whereClause}
                ORDER BY name`;

    const companiesRes = await db.query(sqlQuery, filters)
    return companiesRes.rows;
  }

  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
   *
   * Throws NotFoundError if not found. */

  static async get(handle) {
    const companyRes = await db.query(
          `SELECT c.handle,
                  c.name,
                  c.description,
                  c.num_employees AS "numEmployees",
                  c.logo_url AS "logoUrl"
           FROM companies c
           WHERE c.handle = $1`,
        [handle]);
    
    // Notes on adding jobs functionality
    // at first I decided to do a join query, but this fragmented approach proved to not only
    // Be easier SQL, but it was an easier modification to my node.js code
    // There would be no yeild to having the SQL join besides having more concise code
    // However this is more readable, and easier to write error handling for

    const jobsRes = await db.query(
      `SELECT j.id,
            j.title,
            j.salary,
            j.equity 
      FROM jobs j 
      WHERE company_handle = $1`,
      [handle]);

    const company = companyRes.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    company["jobs"] = jobsRes.rows
    return company;
  }

  /** Update company data with `data`.
   *
   * Param: handle is the company handle of comp which you would like to update
   *
   * Data can include: {name : newName, description : newDescription, numEmployees : newNum, logoUrl : newURL}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found. */

  static async update(handle, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          numEmployees: "num_employees",
          logoUrl: "logo_url",
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE companies 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING handle, 
                                name, 
                                description, 
                                num_employees AS "numEmployees", 
                                logo_url AS "logoUrl"`;
    const result = await db.query(querySql, [...values, handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found. **/

  static async remove(handle) {
    const result = await db.query(
          `DELETE
           FROM companies
           WHERE handle = $1
           RETURNING handle`,
        [handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);
  }
}


module.exports = Company;
