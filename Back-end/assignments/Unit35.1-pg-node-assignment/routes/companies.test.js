process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

const company1 = {'code' : 'apple',
                'name' : 'Apple Computer', 
                'description' : 'Maker of OSX.'}

const company2 = {'code' : 'ibm',
                'name' : 'IBM', 
                'description' : 'Big blue.'}

code1 = company1.code
code2 = company2.code
name1 = company1.name
name2 = company2.name


beforeEach(async () => {
    const result = await db.query(`
        DROP TABLE IF EXISTS companies; 
        CREATE TABLE companies (
            code text PRIMARY KEY,
            name text NOT NULL UNIQUE,
            description text); 
            INSERT INTO companies VALUES ('${company1.code}', '${company1.name}', '${company1.description}'), ('${company2.code}', '${company2.name}', '${company2.description}');`
      )
})

describe("GET /companies", () => {
    test("Get a list of all companies", async () => {
        const res = await request(app).get('/companies')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ companies : [{code: code1, name : name1},                         {code : code2, name : name2}] })
    })
})

describe("POST /companies", () => {
    test("Add a new company", async () => {
        const res = await request(app).post('/companies').send({ code: "pepsi", name: "PepsiCo", description: "One of the original American beverage companies." })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({
            company : { code: "pepsi", name: "PepsiCo", description: "One of the original American beverage companies." }
          })
    })
})

afterAll(async () => {
    db.end()
})
