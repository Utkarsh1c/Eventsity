const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.findAll()
    .then(posts => {
        res.status(200).json({
            message: 'Fetched posts successfully',
            posts: posts
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
    }

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
        }

    const title = req.body.title;
    const content = req.body.content;
    Post.create({
        title: title,
        content: content,
        imageUrl: "sample url",
        creator: "John"
    })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Post created successfully",
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    }

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByPk(postId)
    .then(post => {
        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Post fetched', post: post })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const imageUrl = "sample url 2";
    const title = req.body.title;
    const content = req.body.content;
    const creator = "Mark"
    Post.findByPk(postId)
    .then(post => {
        console.log(post,'...........')
        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        post.update({
            title: title,
            content: content,
            imageUrl: imageUrl,
            creator: creator
        })
        res.status(201).json({ message: 'Post updated', post: post 
    })
})

    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByPk(postId)
    .then(post => {
        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        } 
        res.status(200).json({ message: 'Post deleted' })
        return post.destroy();
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}