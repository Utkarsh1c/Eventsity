const { validationResult } = require('express-validator');

const Post = require('../models/events');

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

    const ename = req.body.ename;
    const imagePath = req.body.imagePath;
    const evenue = req.body.evenue;
    const fevenue = req.body.fevenue;
    const category = req.body.category;
    const date = req.body.date;
    Post.create({
        ename: ename,
        imagePath: imagePath,
        evenue: evenue,
        fevenue: fevenue,
        category: category,
        date: date,
    })
        .then(result => {
            res.status(201).json({
                message: 'Post created',
                result: result
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
    const ename = req.body.ename;
    const imagePath = req.body.imagePath;
    const evenue = req.body.evenue;
    const fevenue = req.body.fevenue;
    const category = req.body.category;
    const date = req.body.date;
    const postId = req.params.postId;
    Post.findByPk(postId)
    .then(post => {
        console.log(post,'...........')
        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        post.update({
            ename: ename,
            imagePath: imagePath,
            evenue: evenue,
            fevenue: fevenue,
            category: category,
            date: date
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