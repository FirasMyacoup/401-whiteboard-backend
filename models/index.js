'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const comment = require('./comment.model')
const collection = require('../collections/user-comment-routes')
const user = require('./user.model');


const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize( POSTGRES_URL, sequelizeOption );
const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize,DataTypes);
const userModel = user(sequelize,DataTypes);


postModel.hasMany(commentModel, {foreignKey: 'ownerID', sourceKey: 'id'})
commentModel.belongsTo(postModel, {foreignKey: 'ownerID', targetKey: 'id'})

userModel.hasMany(postModel, {foreignKey: 'userID', sourceKey: 'id'})
postModel.belongsTo(userModel, {foreignKey: 'userID', targetKey: 'id'})

userModel.hasMany(commentModel, {foreignKey: 'ownerID', sourceKey: 'id'})
commentModel.belongsTo(userModel, {foreignKey: 'ownerID', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);
const userCollection = new collection(userModel);


module.exports = {
    db: sequelize,
    Post: postCollection,
    postModel: postModel,
    Comment: commentCollection,
    CommentModel: commentModel,
    UserModel: userModel,
    User: userCollection,
        
};