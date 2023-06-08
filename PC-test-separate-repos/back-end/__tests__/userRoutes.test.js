process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const jwtDecode = require("jwt-decode");
const db = require('../database/db');
// const { describe } = require("../models/user");

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

//Tests
describe("GET /users/", () => {
    it("gets all users", async () => {
        const response = await request(app).get("/users/");
        expect(response.statusCode).toBe(200);
        expect(response.body.users.length).toEqual(3);
    })
    it("gets one specific user", async () => {
        const testName = "FrumpyMumpy";
        const response = await request(app).get(`/users/${testName}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.user.username).toEqual(testName);
    })
})

describe("POST /users/", () => {
    it("can register a new user", async () => {
        const newUser = {
            firstName : "Charlie", 
            lastName : "Murphy",
            username : "CHARLYMURPHAA", 
            password : "password", 
            email : "thebettermurphy@gmail.com"
        }
        const response = await request(app).post("/users/").send(newUser);
        const newUsername = jwtDecode(JSON.parse(response.text).token).username;
        expect(newUsername).toEqual(newUser.username);
    })
    it("will not register incomplete user", async () => {
        const newUser = {
            firstName : "Charlie",  
            password : "password", 
            email : "thebettermurphy@gmail.com"
        }
        const response = await request(app).post("/users/", newUser);
        expect(response.statusCode).toEqual(500);
    })
})

describe("POST /users/login", () => {
    it("successfully authenticates a user", async () => {
        const userDeets = {
            username : "FrumpyMumpy",
            password : "password"
        }
        const response = await (await request(app).post("/users/login").send(userDeets));
        const username = jwtDecode(JSON.parse(response.text).token).username;
        expect(response.statusCode).toEqual(200);
        expect(username).toEqual(userDeets.username);
    })
    it("rejects entry with incorrect information", async () => {
        const userDeets = {
            username : "FrumpyMumpy",
            password : "pasword"
        }
        const response = await request(app).post("/users/login").send(userDeets);
        expect(response.statusCode).toEqual(401);
    })
})

// Get TypeError:Cannot read properties of undefined (reading 'QueryInterface')
// This is a sequelize issue even though it is triggered by "describe", the testing function
