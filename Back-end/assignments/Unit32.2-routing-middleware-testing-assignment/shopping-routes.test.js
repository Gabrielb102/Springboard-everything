process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

testItem1 = {"name" : "passionfruit", "price" : "8"}
testItem2 = {"name" : "strawberries", "price" : "6"}

beforeEach(function() {
    items.push(testItem1)
});

afterEach(function() {
    items.length = 0
});

/** GET /items - return full shopping list */

describe("GET /items", function() {
  test("Gets the shopping list", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({items: [testItem1]});
  });
});

/** GET /items/:name - return specified item */

describe("GET /items/:name", function() {
  test("Gets a single item and its price", async function() {
    const resp = await request(app).get(`/items/${testItem1.name}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({item : testItem1});
  });

  test("Responds with 404 if can't find shopping list", async function() {
    const resp = await request(app).get(`/items/albaquerque`);
    expect(resp.statusCode).toBe(404);
  });
});
 
/** POST /items - add new item to list and return {newItem : the new item} */

describe("POST /items", function() {
  test("Adds another item to the list", async function() {
    const testNewItem = {name : "Kiwis", price : 7}
    const resp = await request(app).post(`/items`)
        .send(testNewItem);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      newItem : testNewItem 
    });
  });
});
 
/** PATCH /items/:item - update specified item to be the item in the body of the request */

describe("PATCH /items/:name", function() {
  test("Updates one item on the shopping list", async function() {
    const resp = await request(app)
      .patch(`/items/${testItem1.name}`)
      .send(testItem2);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      changedItemTo : testItem2
    });
  });

  test("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/items/definitelynotcorrect`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", function() {
  test("Deletes the specified item from the shopping list", async function() {
    const resp = await request(app)
      .delete(`/items/${testItem1.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
    })
})
