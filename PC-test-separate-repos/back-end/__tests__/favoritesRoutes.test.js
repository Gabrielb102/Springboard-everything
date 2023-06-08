process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../database/db");

beforeAll(
    async () => {
        await db.query(`

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
        `)
    }
)

// const { describe } = require("../models/user");
describe("POST /favorites/", () => {
    it("can mark a new favorite", async () => {
        const favInfo = {
            username: "FrumpyMumpy", 
            candidateId : "H2NV02395", 
            year: 2020, 
            candidateName : "AMODEI, MARK EUGENE", 
            candidateOffice : "H" 
        }
        const response = await request(app).post("/favorites/").send(favInfo);

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual("true");
    })

    it("can mark a new favorite without the year", async () => {
        const favInfo = {
            username: "FrumpyMumpy", 
            candidateId : "S0NY00188", 
            year: null, 
            candidateName : "CLINTON, HILLARY RODHAM", 
            candidateOffice : "S" 
        }
        const response = await request(app).post("/favorites/").send(favInfo);

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual("true");
    })
})

describe("GET /favorites/", () => {
    it("gets all favorites", async () => {
        const response = await request(app).get("/favorites/").query({ 
            username : 'FrumpyMumpy',
        });
        
        expect(response.statusCode).toEqual(200);
    })
})

describe("DELETE /favorites/", () => {
    it("deletes a particular favorite", async () => {
        const favInfo = { 
            username : 'FrumpyMumpy',
            candidateId : 'S0NY00188', 
            year : null
        };
        const response = await request(app).delete("/favorites/").send(favInfo);

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual("true");
    })
})
