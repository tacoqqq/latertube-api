const databaseService = {
    //for genres
    getAllGenres(knex){
        return knex('latertube_genres')
            .select('*')
            .orderBy('genre_id', 'desc')
    },

    insertNewGenre(knex,newGenre){
        return knex('latertube_genres')
            .insert(newGenre)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    
    getGenreById(knex,genreId){
        return knex
            .select('*')
            .from('latertube_genres')
            .where('genre_id', genreId)
            .first()
    },

    deleteGenre(knex,genreId){
        return knex('latertube_genres')
            .where('genre_id', genreId)
            .delete()
    },
    
    //for videos
    getAllVideos(knex){
        return knex('latertube_videos')
            .select('*')
            .orderBy('video_id', 'desc')
    },

    getVideoById(knex,videoId){
        return knex('latertube_videos')
            .select('*')
            .where('video_id', videoId)
            .first()
    },

    insertNewVideo(knex,newVideo){
        return knex('latertube_videos')
            .insert(newVideo)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteVideo(knex,videoId){
        return knex('latertube_videos')
            .where('video_id', videoId)
            .delete()
    },

    updateVideo(knex,videoId,updatedVideo){
        return knex('latertube_videos')
            .where('video_id', videoId)
            .update(updatedVideo)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}



module.exports = databaseService