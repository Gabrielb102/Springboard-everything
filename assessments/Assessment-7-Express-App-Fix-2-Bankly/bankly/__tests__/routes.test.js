// Set ENV VAR to test before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db");
const bcrypt = require("bcrypt");
const createToken = require("../helpers/createToken");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// tokens for our sample users
const tokens = {};

// Before each test, insert u1, u2, and u3  [u3 is admin] 
beforeEach(async () => {
  const _pwd = async (password) => {
    return await bcrypt.hash(password, 1);
  }

  // Creating a new set of test users for every test
  // Cols: username, first_name, last_name, email, phone, password, admin
  let sampleUsers = [
    ["u1", "fn1", "ln1", "email1", "phone1", await _pwd("pwd1"), false],
    ["u2", "fn2", "ln2", "email2", "phone2", await _pwd("pwd2"), false],
    ["u3", "fn3", "ln3", "email3", "phone3", await _pwd("pwd3"), true]
  ];

  for (let user of sampleUsers) {
    await db.query(
      `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      user
    );
    // Creates tokens object. Keys: usernames, Vals: tokens.
    tokens[user[0]] = createToken(user[0], user[6]);
  }
});


// Tests
describe("POST /auth/register", () => {
  test("should allow a user to register in", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        username: "new_user",
        password: "new_password",
        first_name: "new_first",
        last_name: "new_last",
        email: "new@newuser.com",
        phone: "1233211221"
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ token: expect.any(String) });

    let { username, admin } = jwt.verify(response.body.token, SECRET_KEY);
    expect(username).toBe("new_user");
    expect(admin).toBe(false);
  });

  test("should not allow a user to register with an existing username", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        username: "u1",
        password: "pwd1",
        first_name: "new_first",
        last_name: "new_last",
        email: "new@newuser.com",
        phone: "1233211221"
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: `There already exists a user with username 'u1'`
    });
  });
});

describe("POST /auth/login", () => {
  test("should allow a correct username/password to log in", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        username: "u1",
        password: "pwd1"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: expect.any(String) });

    let { username, admin } = jwt.verify(response.body.token, SECRET_KEY);
    expect(username).toBe("u1");
    expect(admin).toBe(false);
  });

  test("should block access when provided incorrect credentials", async() => {
    const badPwd = await (request(app).post("/auth/login").send({
      username: "u1",
      password: "definitely not the password"
    }))
    expect(badPwd.statusCode).toEqual(401);
    const badUsername = await (request(app).post("/auth/login").send({
      username: "u69420",
      password: "pwd1"
    }))
    expect(badUsername.statusCode).toEqual(401);
  })
});

describe("GET /users", () => {
  test("should deny access if no token provided", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(401);
  });

  test("should list all users", async () => {
    const response = await request(app)
      .get("/users")
      .send({ _token: tokens.u1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(3);
    expect(response.body.users[0]).toEqual({ username : "u1", first_name : "fn1", last_name : "ln1" })
  });

  test("should deny access with incorrect token", async () => {
    const response = await request(app)
      .get("/users")
      .send({ _token: "Waffles can be better than pancakes but generally pancakes are better" });
    expect(response.statusCode).toBe(401);
  });

  test("should deny access with incorrect token signature", async () => {
    const token = tokens.u1 + "chickennugget"
    const response = await request(app)
      .get("/users")
      .send({ _token: token });
    expect(response.statusCode).toBe(401);
  });
});

describe("GET /users/[username]", () => {
  test("should deny access if no token provided", async () => {
    const response = await request(app).get("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should deny access if wrong token provided", async () => {
    const response = await request(app).get("/users/u1").send({
      _token : "The onamotapoeia in the last minute of Kanye West's 'Famous'"
    });
    expect(response.statusCode).toBe(401);
  });

  test("should return data on u1 for u1", async () => {
    const response = await request(app)
      .get("/users/u1")
      .send({ _token: tokens.u1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1"
    });
  });

  test("should return data on u1 for admins", async () => {
    const response = await request(app)
      .get("/users/u1")
      .send({ _token: tokens.u3 });
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1"
    });
  })
});

describe("PATCH /users/[username]", () => {
  test("should deny access if no token provided", async () => {
    const response = await request(app).patch("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should deny access if not admin/right user", async () => {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u2 }); // wrong user!
    expect(response.statusCode).toBe(401);
  });

  test("should patch data if admin", async () => {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u3, first_name: "new-fn1" }); // u3 is admin
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "new-fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1",
      admin: false,
      password: expect.any(String)
    });
  });
  // This aspect wasn't functional
  test("should disallowing patching not-allowed-fields", async () => {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u1, admin: true });
    expect(response.statusCode).toBe(401);
  });

  test("should return 404 if cannot find", async () => {
    const response = await request(app)
      .patch("/users/not-a-user")
      .send({ _token: tokens.u3, first_name: "new-fn" }); // u3 is admin
    expect(response.statusCode).toBe(404);
  });

  // Adding test for patching as the user
  test("should patch data if correct user", async () => {
    const response = await request(app)
      .patch("/users/u2")
      .send({ _token: tokens.u2, first_name: "new-fn2" }); // u3 is admin
    expect(response.statusCode).toBe(200);
    expect(response.body.user.first_name).toEqual("new-fn2");

  });
});

describe("DELETE /users/[username]", () => {
  test("should deny access if no token provided", async () => {
    const response = await request(app).delete("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should deny access if not admin", async () => {
    const response = await request(app)
      .delete("/users/u1")
      .send({ _token: tokens.u1 });
    expect(response.statusCode).toBe(401);
  });

  test("should allow if admin", async () => {
    const response = await request(app)
      .delete("/users/u1")
      .send({ _token: tokens.u3 }); // u3 is admin
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "deleted" });
  });
});


// After functions
afterEach(async () => {
  await db.query("DELETE FROM users");
});

afterAll(() => {
  db.end();
});
