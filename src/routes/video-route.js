const express = require('express');
const path = require('path');
const videoRouter = express.Router();
const databaseService = require('../database-service');
const sanitizedContent = require('../sanitized-content');
const bodyParser = express.json();

videoRouter
    .route('/')
    .get((req,res,next) => {
        databaseService.getAllVideos(req.app.get('db'))
            .then( allVideos => {
                return res.json(sanitizedContent(allVideos))
            })
            .catch(next)
    })
    .post(bodyParser, (req,res,next) => {
        const { video_title, video_url, video_description, video_rating, genre_id } = req.body
        const newVideo = { video_title, video_url, video_rating, genre_id }

        //check if missing any of the necessary fields
        for (const [key, value] of Object.entries(newVideo))
            if (!value) {
                return res.status(400).json({error: `Missing ${key} in the request body!`})
            }

        //formatting video_thumbnail_url shared from mobile
        let youtubeId;
        if (newVideo.video_url.split('/')[2].startsWith('youtu.be')){
            youtubeId = newVideo.video_url.split('/')[3]
        } else (
            youtubeId = newVideo.video_url.split('v=')[1]
        )

        //if the URL contains time code, remove it. only need the youtube ID
        if (youtubeId.includes('&t=')){
            youtubeId.split('&t=').pop()
        }

        newVideo.video_thumbnail_url = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        newVideo.video_description = video_description

        databaseService.insertNewVideo(
            req.app.get('db'),
            newVideo
            )
            .then(response => {
                res
                  .location(path.posix.join(req.originalUrl, `/${response.video_id}`))
                  .json(response)
            })
            .catch(next)
    })

videoRouter
    .route('/:videoId')
    .all((req,res,next) => {
        const video_id = req.params.videoId
        databaseService.getVideoById(
            req.app.get('db'),
            video_id
            )
            .then(response => {
                if (!response) {
                    return res.status(404).json({error: 'Bad request: cannot find this video!'})
                }
                res.video = response
                next();
            })
            .catch(next)
    })
    .get((req,res,next) => {
        res.json(res.video)
    })
    .delete((req,res,next) => {
        const videoToBeDeleted = res.video

        databaseService.deleteVideo(
            req.app.get('db'),
            videoToBeDeleted.video_id
        )
            .then(response => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(bodyParser, (req,res,next) => {
        const videoToBeUpdatedId = res.video.video_id
        const { video_title, video_url, video_description, video_rating, genre_id, video_created_time } = req.body
        const updatedVideo = {video_title, video_url, video_rating, genre_id}

        //check if missing any of the necessary fields
        for (const [key, value] of Object.entries(updatedVideo))
            if (!value) {
                return res.status(400).json({error: `Missing ${key} in the request body!`})
            }

        //formatting video_thumbnail_url for mobile shared youtube link
        let youtubeId;
        if (updatedVideo.video_url.split('/')[2].startsWith('youtu.be')){
            youtubeId = updatedVideo.video_url.split('/')[3]
        } else (
            youtubeId = updatedVideo.video_url.split('v=')[1]
        )

        //if the URL contains time code, remove it. only need the youtube ID
        if (youtubeId.includes('&t=')){
            youtubeId.split('&t=').pop()
        }

        updatedVideo.video_thumbnail_url = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        updatedVideo.video_description = video_description
        updatedVideo.video_created_time = video_created_time

        databaseService.updateVideo(
            req.app.get('db'),
            videoToBeUpdatedId,
            updatedVideo
        )
            .then(response => {
                res
                  .location(path.posix.join(req.originalUrl , `/${response.video_id}`))
                  .json(response)
            })
            .catch(next)     
    })



module.exports = videoRouter

