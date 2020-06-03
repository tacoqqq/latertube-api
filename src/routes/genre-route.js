const express = require('express');
const path = require('path');
const databaseService = require('../database-service')
const sanitizedContent = require('../sanitized-content');
const genreRouter = express.Router();
const bodyParser = express.json();

genreRouter
    .route('/')
    .get((req,res,next) => {
        const knexInstance = req.app.get('db')
        
        databaseService.getAllGenres(knexInstance)
            .then( allGenres => {
                res.json(sanitizedContent(allGenres))
            })
            .catch(next)
    })
    .post(bodyParser, (req,res,next) => {
        const { genre_title } = req.body

        //check if contains title
        if (!genre_title) {
            return res.status(400).json({error: 'Missing genre title in the request body!'})
        }

        const newGenre = {
            genre_title
        }

        databaseService.insertNewGenre(
            req.app.get('db'),
            newGenre
        )
            .then(response => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl , `/${response.genre_id}`))
                    .json(response)
            })
            .catch(next)
    })

genreRouter
    .route('/:genreId')
    .all(bodyParser, (req,res,next) => {
        const { genreId } = req.params

        databaseService.getGenreById(
            req.app.get('db'),
            genreId
        )
            .then( response => {
                if (!response) {
                    return res.status(404).json({error: 'Bad request: cannot find this genre!'})
                }

                res.genre = response
                next()
            })

    })
    .get((req,res,next) => {
        res.json(res.genre)
    })
    .delete((req,res,next) => {
        const { genreId } = req.params
        databaseService.deleteGenre(
            req.app.get('db'),
            genreId
        )
            .then(response => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = genreRouter
