'use strict';

const post = require('./post.model')
const { Sequelize, DataTypes } = require('sequelize');



const sequelizeOption = {
    dialectOptions: {
    ssl: {
    require: true,
    rejectUnauthorized: false
        }
    }
 };

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

module.exports = {
    db: sequelize,
    Post: post(sequelize, DataTypes)
};