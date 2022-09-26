'use strict';
const bcrypt = require( 'bcrypt' );
const base64 = require( 'base-64' );
const { UserModel } = require( '../models/index' );

const signup = async ( req, res ) => {
    try {
        req.body.password = await bcrypt.hash( req.body.password, 10 );
        const user = await UserModel.create( req.body );
        const output = {
            user: user,
            token: user.token,
            role: user.role
        };
        res.status( 201 ).json( output );
    } catch ( error ) {
        res.status( 403 ).send( 'Error in Creating User' );
    }
};

const allUser = async ( req, res ) => {
    const users = await UserModel.findAll();
    res.status( 200 ).json( users );
};

const login = async ( req, res ) => {
    const basicHeader = req.headers.authorization.split( ' ' );
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode( encodedValue );
    const [ username, password ] = decodedValue.split( ':' );
    console.log( username, password );
    const user = await UserModel.findOne( {
        where: {
            username: username
                }
    } );
    if ( user ) {
        const isSame = await bcrypt.compare( password, user.password );
        if ( isSame ) {
            return res.status( 200 ).json( {
                "User": {
                    "Username": user.username,
                    "Id": user.id,
                    "Role": user.role
                },
                "Token": user.token
            } );
        } else {
            return res.status( 401 ).send( 'You are not authorized' );
        }
    } else {
        return res.status( 401 ).send( 'You are not authorized' );
    }
};

  



module.exports = {
    signup,
    allUser,
    login
};