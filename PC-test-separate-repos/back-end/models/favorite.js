const db = require('../database/db');
const { Model, DataTypes } = require('sequelize');
const { BadRequestError } = require('../expressError');

class Favorite extends Model {}

Favorite.init({
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    candidate_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
    },
    candidate_name: {
        type: DataTypes.STRING
    },
    candidate_office: {
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    modelName: 'Favorite',
    tableName: 'favorites',
    timestamps: false
});

// Add a new favorite
Favorite.add = async (username, candidateId, year, candidateName, candidateOffice) => {
    try {
        await Favorite.create({
            username : username, 
            candidate_id : candidateId, 
            year : year,
            candidate_name : candidateName,
            candidate_office : candidateOffice
        });
        return true;
    } catch (err) {
        throw new BadRequestError();
    }
}

// Get one particular favorite - for internal use
Favorite.get = async (username, candidateId, year) => {
    try {
        const favorites = await Favorite.findAll({where : {
            username : username, 
            candidate_id: candidateId, 
            year : year
        }});
        return favorites[0];
    } catch (err) {
        throw new BadRequestError("No such favorite");
    }
}

// Get all of a users favorites
Favorite.getList = async (username) => {
    try {
        const favorites = await Favorite.findAll({where : {
            username : username
        }});
        return favorites;
    } catch (err) {
        throw new BadRequestError();
    }
}

// Delete a favorite listing 
Favorite.remove = async (username, candidateId, year) => {
    try {
        await Favorite.destroy({
            where: {
                username : username, 
                candidate_id: candidateId, 
                year : year
            }});
        return true;
    } catch (err) {
        throw new BadRequestError();
    }
}

console.log("Favorite Model Instantiated: ", Favorite === db.models.Favorite);

module.exports = Favorite;