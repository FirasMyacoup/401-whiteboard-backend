'use strict';

const express = require('express');
const router = express.Router();
const { Post } = require( '../models/index' );

router.get( '/post', getAllPost );
router.post( '/post', addPost );
router.get( '/post/:id', getOnePost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );


async function getAllPost (req, res) {
    let message = await Post.findAll();
    res.status(200).json({
        message
    });
}


async function addPost (req, res) {
    let newMessage = req.body;
    let message = await Post.create(newMessage);
    res.status(201).json(message);
}



async function getOnePost (req, res) {
    const id = req.params.id;
    const message = await Post.findOne( {
        where: {id: id}
    } );
    res.status(200).json(message);
}


async function updatePost (req, res) {
    const id = req.params.id;
    const obj = req.body;
    let message = await Post.findOne( {
        where: {id: id}
    } );
    const updateMessage = await message.update(obj);
    res.status(200).json(updateMessage);
}





module.exports = router;