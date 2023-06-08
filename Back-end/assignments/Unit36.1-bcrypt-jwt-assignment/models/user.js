/** User class for message.ly */

const { DB_URI, SECRET_KEY ,BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require('bcrypt')

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const hashed_pw = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(`INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
      VALUES ($1, $2, $3, $4, $5, (CURRENT_TIMESTAMP), (CURRENT_TIMESTAMP)) RETURNING username`, 
      [username, hashed_pw, first_name, last_name, phone]);
    return result.rows[0];
   }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const user_result = await db.query("SELECT password FROM users WHERE username = $1", [username]);
    const user_pw_hash = await user_result.rows[0].password;
    const match = await bcrypt.compare(password, user_pw_hash);
    return match; 
   }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const set_last_login = await db.query("UPDATE users SET last_login_at = (CURRENT_TIMESTAMP) RETURNING (CURRENT_TIMESTAMP)");
    if (set_last_login === undefined) {
      throw new ExpressError("Invalid Username", 400); 
    }
   }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const result = await db.query(`SELECT username, first_name, last_name, phone FROM users`)
    return result.rows
  }

  /** Get: get user by username
   * returns {username,first_name,last_name,phone,join_at,last_login_at } */

  static async get(username) {
    const result = await db.query(`SELECT username, first_name, last_name, phone, join_at, last_login_at
                                  FROM users WHERE username = $1`, [username]);
    return result.rows[0];

  }

  /** Return messages directed to this user.
   *
   * Returning: [{id, from_user, body, sent_at, read_at}]
   * where from_user is {username, first_name, last_name, phone} */

  static async messagesTo(username) {
    // Select all the messages addressed to the user
    const mResult = await db.query(`SELECT id, from_username, body, sent_at, read_at
    FROM messages WHERE to_username = $1`, [username]);
    // Check for no results
    const messages = mResult.rows;
    if (messages.length === 0) {
      return new ExpressError(`No messages to user ${username}`);
    }
    // Start process to get the from_user data
    const fromUserPromises = []
    for (let message of messages) {
      const fromUsername = message.from_username;
      const uResult = db.query(`SELECT username, first_name, last_name, phone
        FROM users WHERE username = $1`, [fromUsername]);
      fromUserPromises.push(uResult);
      delete message.from_username;
      }
    // Await all the promises at the same time
    const fromUserObjects = await Promise.all(fromUserPromises);

    // Match up all the senders to their messages
    for (let m in messages) {
      messages[m].fromUser = fromUserObjects[m].rows[0]
    }
    return messages;
    }


  /** Return messages from this user.
   *
   * Returning [{id, to_user, body, sent_at, read_at}]
   * where to_user is {username, first_name, last_name, phone} */

  static async messagesFrom(username) {
    // Select all the messages sent by the user
    const mResult = await db.query(`SELECT id, to_username, body, sent_at, read_at
    FROM messages WHERE to_username = $1`, [username]);
    // Check for no results
    const messages = mResult.rows;
    if (messages.length === 0) {
      return new ExpressError(`No messages from user ${username}`);
    }
    // Start process to get the to_user data
    const toUserPromises = []
    for (let message of messages) {
      const toUsername = message.to_username;
      const uResult = db.query(`SELECT username, first_name, last_name, phone
        FROM users WHERE username = $1`, [toUsername]);
      toUserPromises.push(uResult);
      delete message.to_username;
      }
    // Await all the promises at the same time
    const toUserObjects = await Promise.all(toUserPromises);

    // Match up all the recipients to their messages
    for (let m in messages) {
      messages[m].toUser = toUserObjects[m].rows[0]
    }
    return messages;
  }
}


module.exports = User;