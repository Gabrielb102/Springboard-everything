"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job {

    static async all(filter) {
        let filters = [];
        let whereClause = '';
        let title, minSalary, hasEquity;

        if (filter) {
            ({title, minSalary, hasEquity} = filter);
            filters = [title, minSalary, hasEquity].filter((filt) => filt ? true : false);
          }

        if (filters.length) {
            whereClause = 'WHERE ';

            let n = 1;
            if (title) {
                // for some reason, title = `%${title}%` wasn't working, but it works in the Company.findAll() method
                filters[0] = `%${title}%`
                whereClause += `LOWER(title) LIKE $${n} `;
                n++;
            }
            if (minSalary) {
                if (title) whereClause += 'AND ';
                whereClause += `salary > $${n} `;
                n++
            }
            if (hasEquity) {
                if (title || minSalary) whereClause += 'AND ';
                eqFilter = hasEquity ? 1 : 0;
                whereClause += `equity = $${n}`;
            }
        }

        const sqlQuery = `SELECT id, title, salary, equity, company_handle
                        FROM jobs ${whereClause}`;

        const result = await db.query(sqlQuery, filters);
        return result.rows;
    }

    static async get(id) {
        const result = await db.query(`
            SELECT id, title, salary, equity, company_handle 
            FROM jobs
            WHERE id = $1`,
            [id]
        );
        if (!result.rows[0]){
            throw new NotFoundError("No job with that id");
        } 
        return result.rows[0];
    }

    static async create(jobData) {
        const { title, salary, equity, company_handle } = jobData;
        const result = await db.query(`
            INSERT INTO jobs (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle`,
            [title, salary, equity, company_handle])
        if (!result.rows[0]) {
            throw new NotFoundError("No job with that id")
        }
        return result.rows[0];
    }

    static async update(jobData, id) {
        const result = await db.query(`
            SELECT title, salary, equity
            FROM jobs 
            WHERE id = $1`,
            [id]);

        const currentJob = result.rows[0];

        if (!result.rows[0]) { 
            throw new NotFoundError("No job with that id")
        }
        const updatedTitle = jobData.title || currentJob.title;
        const updatedSalary = jobData.salary || currentJob.salary;
        const updatedEquity = jobData.equity || currentJob.equity;

        const updatedJob = await db.query(`
            UPDATE jobs SET title = $2, salary = $3, equity = $4
            WHERE id = $1
            RETURNING (id, title, salary, equity, company_handle)`,
            [id, updatedTitle, updatedSalary, updatedEquity])
        return updatedJob;
    }

    static async remove(id) {
        const result = await db.query(`
            DELETE FROM jobs
            WHERE id = $1
            RETURNING title`,
            [id])
        if (!result.rows[0]) {
            throw new NotFoundError("No job with that id")
        }
        return;
    }
};

module.exports = Job;