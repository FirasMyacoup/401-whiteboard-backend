'use strict';
const bcrypt = require( 'bcrypt' );
const base64 = require( 'base-64' );
const { commentModel, postModel, userModel } = require( '../models/index' );
const signup = async ( req, res ) => {
    try {
        const { username, email, password, role } = req.body;
        const output = {
            username,
            email,
            password: await bcrypt.hash( password, 15 ),
            role
        };
        const user = await userModel.create( output );
        if ( user ) {
            res.status( 200 ).json( {
                "user": {
                    "username": user.username,
                    "id": user.id,
                    "role": user.role
                },
                "token": user.token
            } );
        } else {
            res.status( 500 ).send( 'Error Creating User' );
        }
    } catch ( error ) {
        console.log( error );
    }
};

const allUser = async ( req, res ) => {
    const users = await userModel.findAll( { include: [ commentModel, postModel ] } );
    const response = users.map( ( user ) => {
        return {
            id: user.id,
            username: user.username,
            role: user.role,
            comments: user.Comments,
            posts: user.Posts
        };
    } );
    res.json( response );
};

const login = async ( req, res ) => {
    const basicHeader = req.headers.authorization.split( ' ' );
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode( encodedValue );
    const [ username, password ] = decodedValue.split( ':' );
    const user = await userModel.findOne( {
        where: {
            username: username
        }
    } );
    if ( user ) {
        const isSame = await bcrypt.compare( password, user.password );
        if ( isSame ) {
            return res.status( 200 ).json( {
                "user": {
                    "username": user.username,
                    "id": user.id,
                    "role": user.role
                },
                "token": user.token
            } );
        } else {
            return res.status( 401 ).send( ' not authorized' );
        }
    } else {
        return res.status( 401 ).send( 'not authorized' );
    }
};


module.exports = {
    signup,
    allUser,
    login
};