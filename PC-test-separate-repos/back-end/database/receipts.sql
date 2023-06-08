\c receiptsus;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE users (
    username VARCHAR(30) PRIMARY KEY UNIQUE,
    password TEXT NOT NULL,
    email VARCHAR(320),
    first_name VARCHAR(80),
    last_name VARCHAR(80),
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE favorites (
    username TEXT REFERENCES users,
    candidate_id TEXT,
    year INTEGER, 
    candidate_name TEXT,
    candidate_office TEXT
);

INSERT INTO users (username, password, email, first_name, last_name) 
    VALUES ('FuturePOTUS1', '$2b$10$o.OPlyBi1g8RhScoftMbN.kbgjxZl7NRFfaew/KVNAlzis.uf/D46', 'fpotus1@gmail.com', 'Eric', 'Rothschild');

INSERT INTO users (username, password, email, first_name, last_name) 
    VALUES ('FrumpyMumpy', '$2b$10$o.OPlyBi1g8RhScoftMbN.kbgjxZl7NRFfaew/KVNAlzis.uf/D46', 'frumps@gmail.com', 'Framk', 'Umpty');

INSERT INTO users (username, password, email, first_name, last_name) 
    VALUES ('WilliamSmith', '$2b$10$o.OPlyBi1g8RhScoftMbN.kbgjxZl7NRFfaew/KVNAlzis.uf/D46', 'slappo@gmail.com', 'Will', 'Smith');




