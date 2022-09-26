'use strict';

const jwt = require( 'jsonwebtoken' );

module.exports = ( sequelize, DataTypes ) => {
const User = sequelize.define( 'User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: true
    },
    token: {
        type: DataTypes.VIRTUAL,
        get: function () {
            return jwt.sign( {username: this.username}, process.env.SECRET);
        },
        set ( tokenObj ) {
            return jwt.sign( tokenObj, process.env.SECRET );
        }
    },
    role: {
        type: DataTypes.ENUM( 'admin', 'user' ),
        defaultValue: 'user',
        allowNull: false
    },
    capabilities: {
        type: DataTypes.VIRTUAL,
        get: function () {
            const acl = {
                user: [ 'read' ],
                admin: [ 'read', 'create', 'update', 'delete' ]
            };
            return acl[this.role];
        }
    }
} );

User.authenticateToken = token => {
    return jwt.verify( token, process.env.SECRET, ( err, decoded ) => {
        if ( err ) {
            return err;
        } else {
            return decoded;
        }
    } );
};


return User;
};