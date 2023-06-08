// the Smarter OO model, where the class can be instantiated
// This allows for static methods
// as well as methods that can affect only one instance
// that way the effect is controllable, and the code is kept simple
// one constructor functions lets us avoid much more complicated code.
// You can also get info from this, rather than making the SQL Query.

const db = require("../db")
const ExpressError = require("../expressError")

class Dog{
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  static async getAll() {
    const results = await db.query(`SELECT id, name, age FROM dogs`);
    if (results.rows.length === 0) {
      throw new ExpressError("No Dogs Found", 404)
    }
    const dogs = results.rows.map(r => new Dog(r.id, r.name, r.age))
    return dogs;
  }

  static async getById(id) {
    const result = await db.query(`SELECT id, name, age FROM dogs WHERE id = $1`, [id]);
    const d = result.rows[0];
    if (!d) {
      throw new ExpressError("Dog not found", 404)
    }
    return new Dog(d.id, d.name, d.age);
  }

  static async create(newName, newAge) {
    if (!newName || !newAge) {
      throw new ExpressError("Insufficient Data", 400);
    }
    const result = await db.query(`
    INSERT INTO dogs (name, age) 
    VALUES ($1, $2) 
    RETURNING name, age`, [newName, newAge]);
    const { id, name, age } = result.rows[0];
    return new Dog(id, name, age);
  }

  async remove() {
    await db.query(`
    DELETE FROM dogs
    WHERE id = $1`,
    [this.id]);
    console.log(this.name + ' ' + this.id + ' deleted :(')
  }

  async save() {
    await db.query(`
    UPDATE dogs
    SET name = $1, 
    age = $2
    WHERE id = $3
    RETURNING id, name, age`, 
    [this.name, this.age, this.id]);
  }

  speak() {
    console.log(`${this.name} says woof!`)
  }
}

module.exports = Dog;