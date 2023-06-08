process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

const invoice1 = {'comp_code' : 'apple', 
'amt' : '2400',
'paid' : 'false',
'paid_date' : 'null'};

const { comp_code1, amt1, paid1, paid_date1 } = invoice1

const invoice2 = {'comp_code' : 'ibm', 
    'amt' : '5000',
    'paid' : 'f',
    'paid_date' : 'null'}

const { comp_code2, amt2, paid2, paid_date2 } = invoice2

const invoice3 = {'comp_code' : 'apple', 
    'amt' : '300',
    'paid' : 'true',
    'paid_date' : '2018-01-01'}

const { comp_code3, amt3, paid3, paid_date3 } = invoice3

const invoice4 = {'comp_code' : 'ibm', 
    'amt' : '400',
    'paid' : 'false',
    'paid_date' : 'null'}

const { comp_code4, amt4, paid4, paid_date4 } = invoice4

const today = new Date()

beforeEach(async () => {
    await db.query(`
    DROP TABLE IF EXISTS invoices; 
    CREATE TABLE invoices (
        id serial PRIMARY KEY,
        comp_code text FOREIGN KEY NOT NULL REFERENCES companies ON DELETE CASCADE,
        amt float NOT NULL,
        paid boolean DEFAULT false NOT NULL,
        add_date date DEFAULT (CURRENT_DATE) NOT NULL,
        paid_date date);  
    INSERT INTO invoices (comp_code, amt, paid, paid_date)
        VALUES (${comp_code1}, ${amt1}, ${paid1}, ${paid_date1}),
        (${comp_code3}, ${amt3}, ${paid3}, ${paid_date3});`
    )
})

describe("GET /invoices", () => {
    test("Get a list of all invoices", async () => {
        const res = await request(app).get('/invoices')
        expect(res.statusCode).toBe(200)
        expect(res.body).toContain(comp_code1)
        expect(res.body).toEqual({ invoices : expect.any(Array)})
    });
    test("Gets full list of all invoices", async () => {
        const res = await request(app).get('/invoices')
        expect(res.body.invoices.length).toEqual(2)
    });
})

describe("POST /invoices", () => {
    test("Add a new invoice with correct default values", async () => {
        const res = await request(app).post('/invoices').send(invoice2)
        expect(res.statusCode).toBe(201)
        expect(res.body.new_invoice).toEqual({comp_code1})
        expect(res.body.new_invoice.add_date).toEqual(today)
        expect(res.body.new_invoice.paid_date).toEqual(null);
    })
    test("Fails to add new invoice with missing data", async () => {
        const numberOfEntries = await db.query("SELECT * FROM invoices")
        expect(async () => {await request(app).post('/invoices').send({comp_code : 'ibm'})}).toThrow(expect.any(Error))
        const newNumberOfEntries = await db.query("SELECT * FROM invoices")
        expect(numberOfEntries.rows).toEqual(newNumberOfEntries.rows)

    })
})

afterAll(async () => {
    db.end()
})