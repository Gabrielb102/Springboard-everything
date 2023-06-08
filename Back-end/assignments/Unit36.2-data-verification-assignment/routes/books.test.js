process.env.NODE_ENV = 'test';

const request = require('supertest');
const jsonSchema = require('jsonschema');
const bookSchema = require('../schema/books_schema.json');
const app = require('../app');
const db = require('../db');

const data = `DROP TABLE IF EXISTS books;

CREATE TABLE books (
  isbn TEXT PRIMARY KEY,
  amazon_url TEXT,
  author TEXT,
  language TEXT, 
  pages INTEGER,
  publisher TEXT,
  title TEXT, 
  year INTEGER
);

INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
VALUES ('9780316010665', 
  'https://www.amazon.com/Blink-Power-Thinking-Without/dp/03160106',
  'Malcom Gladwell', 
  'english', 
  296, 
  'Black Bay Books', 
  'Blink', 
  2005);

INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
VALUES ('9780439358078', 
'https://www.amazon.com/Harry-Potter-Order-Phoenix-Rowling/dp/04',
  'JK Rowling', 
  'english', 
  766, 
  'Scholastic', 
  'Harry Potter and the Order of the Phoenix', 
  2003);
`


beforeAll(async () => {
    await db.query(data);
});

afterAll(() => {
    db.end()
})

describe('Test current valid book database', () => {
    test('Tests valid book data', async () => {
        const res = await request(app).get('/books');
        console.log(res.body.books);
        const valid = true;
        for (book of res.body.books) {
            result = jsonSchema.validate(book, bookSchema);
            if (result.valid) {
                continue;
            }
            valid = false;
        }
        expect(res.statusCode).toBe(200);
        expect(valid).toBe(true);
    })
})
