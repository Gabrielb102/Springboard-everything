const { sqlForPartialUpdate, sqlForFilter } = require('./sql');
const { BadRequestError } = require('../expressError');
const User = require('../models/user')
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  } = require("../models/_testCommon");
  
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
  
describe('test sqlForPartialUpdate()', () => {
    test('Successfully produces SQL string', async () => {
        const data = { firstName : "Carl", lastName : "Wheezer" };
        const jsToSql = { firstName : 'first_name', lastName : 'last_name' };
        const { setCols, values } = sqlForPartialUpdate(data, jsToSql);
        expect(typeof(setCols)).toBe('string');
        expect(Array.isArray(values)).toBe(true);
    })
    test('Successfully produces correct SQL string', async () => {
        const data = { firstName : "Carl", lastName : "Wheezer" };
        const result = await User.update('u1', data)
        expect(Object.values(result)).toContain("Carl");
        expect(Object.values(result)).toContain("Wheezer");
    })
    test('Throws BadRequestError when no data is passed', async () => {
        const data = {};
        const jsToSql = { firstName : 'first_name', lastName : 'last_name' };
        expect(() => {sqlForPartialUpdate(data, jsToSql)}).toThrow(BadRequestError);
    })
});
