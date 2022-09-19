'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const NotFound = require( './error-handlers/404' );
const error = require( './error-handlers/500' );
const postRouter = require( './routes/post.route' );
const commentRoute = require( './routes/comment-route' );
const postRoute = require( './routes/post.route' );
const userRoute = require('./routes/user.route');


app.use( cors() );
app.use( express.json() );
app.use( postRouter );
app.use( NotFound );
app.use( error );
app.use(commentRoute);
app.use(postRoute);
app.use( userRoute );


app.get( '/', ( req, res ) => {
    res.status( 200 ).json( {
        message: 'Home page',
        code: 200
    } );
} );


function start ( port ) {
    app.listen( port, () => console.log( `Working : ${port}` ) );
}
module.exports = {
    start,
    app
    
};