DROP TABLE IF EXISTS books;

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

-- "" refers to a column in SQL wheareas '' refers to a data value

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
