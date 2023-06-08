const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require("../config");
const db = require('../database/db');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { BadRequestError, UnauthorizedError } = require('../expressError');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(320)
    },
    first_name: {
        type: DataTypes.STRING(80)
    },
    last_name: {
        type: DataTypes.STRING(80)
    },
    is_admin: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

// Get just one user by username
User.get = async (username) => {
    try {
        const users = await User.findAll({where: {username:username}});
        return users[0].dataValues;
    } catch (err) {
        throw new BadRequestError("No such user");
    }
}

// Register a new user and save to the database
User.register = async (data) => {
    const hashedPw = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
    const newUserData = {
        username: data.username, 
        password: hashedPw, 
        email: data.email, 
        first_name: data.firstName, 
        last_name: data.lastName
    };
    const newUser = await User.create(newUserData);
    const userRegistered = newUser.dataValues;
    delete userRegistered.password;
    return userRegistered;
}

// Save changes to the database
User.update = async (username, data) => {
    const users = await User.findAll({where: {username:username}});
    const user = users[0];
    const hashedPw = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
    await user.set({
        username: data.username, 
        password: hashedPw, 
        email: data.email, 
        first_name: data.first_name, 
        last_name: data.last_name
    });
    await user.save();
    return true;
}

// Verify the attempted password matches the actual password
User.auth = async (username, password) => {
    const user = await User.get(username);
    if (!user) {
        return new BadRequestError("No user by that username");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid === true) {
      delete user.password;
      console.log('user: ', user);
      return user;
    } else {
        throw new UnauthorizedError("Incorrect User or Password")
    }
} 

console.log("User Model Instantiated: ", User === db.models.User);

module.exports = User;