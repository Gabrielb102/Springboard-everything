// This will just be a collection of static methods
// Static methods can be called from the class itself
// rather than being called on a particular instance
// Class need not be instantiated for this to work.

const db = require("../db")
const ExpressError = require("../expressError")

// This will house all the functions that make the queries
// so db is necessary here, rather in the router file
// This file will contain all the pg syntax

class Cat{
    static async getAll() {
        let result = await db.query("SELECT id, name, age FROM cats");
        return result.rows;
    }


    // we can also incorporate the error handling right here in the method
    static async getById(id) {
        let result = await db.query("SELECT id, name, age FROM cats WHERE id = $1", [id])
        if (result.rows.length === 0) {
            throw new ExpressError("Cat not found", 404)
        }
        return result.rows[0];
    }

    
    static async create(name, age) {
        if (!name || !age) {
            throw new ExpressError("Missing required data", 400)
        }
        let result = await db.query(`INSERT INTO cats (name, age) VALUES ($1, $2) 
        RETURNING id, name, age`, [name, age])
        return result.rows[0];
    }


    static async delete(id) {
        if (!id) {
            throw new ExpressError("id is required for delete", 400)
        }
        let result = await db.query("DELETE FROM cats WHERE id = $1 RETURNING id", [id])
        if (result.rows.length === 0) {
            throw new ExpressError("Cat not found", 404);
        }
        return
    }


    static async update(newName, newAge, id) {
        let result = await db.query(`UPDATE cats SET name = $1, age = $2 WHERE id = $3
        RETURNING id, name, age`, [newName, newAge, id])
        if (result.rows.length === 0) {
            throw new ExpressError("Cat not found", 404);
        }    
        return result.rows[0]
    }

    static async makeOlder(id) {
        let result = await db.query(`UPDATE cats SET age = age + 1 WHERE id = $1
        RETURNING id, name, age`, [id])
        if (result.rows.length === 0) {
            throw new ExpressError("Cat not found", 404);
        }    
        return result.rows[0]
    }
}

module.exports = Cat;