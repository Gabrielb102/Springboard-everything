DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);

-- Assuming a BCRYPT WORK NUMBER of 12, and a SECRET_KEY of "sample"
-- All users here have a password of 'password'
INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at) 
    VALUES ('Grouchypants6', '$2b$12$zekj.PaYF1pSaXrecRrxi.EJwakM6yua8Z73ndW1rgyZL4m1MKw5C','Oscar', 'Grouch', '702-999-9087', (CURRENT_TIMESTAMP), (CURRENT_TIMESTAMP));

INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at) 
    VALUES ('EsmoSaysHi', '$2b$12$zekj.PaYF1pSaXrecRrxi.EJwakM6yua8Z73ndW1rgyZL4m1MKw5C','Esmo', 'Blue', '702-123-9087', (CURRENT_TIMESTAMP), (CURRENT_TIMESTAMP));

INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at) 
    VALUES ('BertyBoop', '$2b$12$zekj.PaYF1pSaXrecRrxi.EJwakM6yua8Z73ndW1rgyZL4m1MKw5C','Bert', 'Ernie', '702-800-9087', (CURRENT_TIMESTAMP), (CURRENT_TIMESTAMP));

INSERT INTO messages (from_username, to_username, body, sent_at)
    VALUES ('Grouchypants6', 'EsmoSaysHi', 'Hey quit giving kids a tour of my street!', (CURRENT_TIMESTAMP));

INSERT INTO messages (from_username, to_username, body, sent_at)
    VALUES ('EsmoSaysHi', 'Grouchypants6', 'Its my street Oscar if you got a real place this wouldt be a problem!!', (CURRENT_TIMESTAMP));

INSERT INTO messages (from_username, to_username, body, sent_at)
    VALUES ('Grouchypants6', 'EsmoSaysHi', 'Do you think youd even have a SHOW without me?', (CURRENT_TIMESTAMP));
