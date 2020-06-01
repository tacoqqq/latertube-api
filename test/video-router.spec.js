const app = require('../src/app');
const { STORE } = require('../store');

describe('videoRouter', () => {

    describe('GET /api/videos', () => {
        it('GET /api/videos responds 200 and all videos', () => {
            return supertest(app)
                .get('/api/videos')
                .expect(200, STORE.VIDEOS)
        })
    })

    describe('POST /api/videos', () => {
        it('post a new video successfully', () => {
            const newVideo = {
                video_id: 12345,
                video_title: 'TEST VIDEO',
                video_url: 'https://www.youtube.com/watch?v=TESTVIDEO',
                video_description: 'TEST DESCRIPTION',
                video_rating: 5,
                genre_id: 1,
                video_created_time: new Date().toLocaleString()
            }

            return supertest(app)
                .post('/api/videos')
                .send(newVideo)
                .expect(201)
                .expect(res => {
                    expect(res.body.video_id).to.be.eql(newVideo.video_id)
                    expect(res.body.video_title).to.be.eql(newVideo.video_title)
                    expect(res.body.video_url).to.be.eql(newVideo.video_url)
                    expect(res.body.video_description).to.be.eql(newVideo.video_description)
                    expect(res.body.video_rating).to.be.eql(newVideo.video_rating)
                    expect(res.body.genre_id).to.be.eql(newVideo.genre_id)
                    expect(res.body.video_created_time).to.be.eql(newVideo.video_created_time)
                })
                .then( postRes => {
                    return supertest(app)
                        .get(`/api/videos/${postRes.body.video_id}`)
                        .expect(STORE.VIDEOS[(STORE.VIDEOS.length)-1])
                } )
        })

        it('responds 400 when missing video title in request body', () => {
            const newVideo = {
                video_id: 12345,
                video_url: 'https://www.youtube.com/watch?v=TESTVIDEO',
                video_description: 'TEST DESCRIPTION',
                video_rating: 5,
                genre_id: 1,
                video_created_time: new Date().toLocaleString()
            }
    
            return supertest(app)
                .post('/api/videos')
                .expect(400, {error: 'Missing video_title in the request body!'})
        })

        it('responds 400 when missing video url in request body', () => {
            const newVideo = {
                video_id: 12345,
                video_title: 'TEST VIDEO',
                video_description: 'TEST DESCRIPTION',
                video_rating: 5,
                genre_id: 1,
                video_created_time: new Date().toLocaleString()
            }
    
            return supertest(app)
                .post('/api/videos')
                .send(newVideo)
                .expect(400, {error: 'Missing video_url in the request body!'})
        })

        it('responds 400 when missing video rating in request body', () => {
            const newVideo = {
                video_id: 12345,
                video_title: 'TEST VIDEO',
                video_url: 'https://www.youtube.com/watch?v=TESTVIDEO',
                video_description: 'TEST DESCRIPTION',
                genre_id: 1,
                video_created_time: new Date().toLocaleString()
            }
    
            return supertest(app)
                .post('/api/videos')
                .send(newVideo)
                .expect(400, {error: 'Missing video_rating in the request body!'})
        })

        it('responds 400 when missing genre id in request body', () => {
            const newVideo = {
                video_id: 12345,
                video_title: 'TEST VIDEO',
                video_url: 'https://www.youtube.com/watch?v=TESTVIDEO',
                video_description: 'TEST DESCRIPTION',
                video_rating: 5,
                video_created_time: new Date().toLocaleString()
            }
    
            return supertest(app)
                .post('/api/videos')
                .send(newVideo)
                .expect(400, {error: 'Missing genre_id in the request body!'})
        })
    })


    describe('GET /api/video:/videoId', () => {
        it('responds 404 if cannot find matching video id', () => {
            return supertest(app)
                .get('/api/videos/9999')
                .expect(404, {error: 'Bad request: cannot find this video!'})
        })

        it('responds 200 and return matching video information', () => {
            return supertest(app)
                .get('/api/videos/1')
                .expect(200, STORE.VIDEOS[0]) 
        })
    })

    describe('DELETE /api/videos/:videoId', () => {
        it('responds 404 if cannot find matching video id', () => {    
            return supertest(app)
                .delete('/api/videos/9999')
                .expect(404, {error: 'Bad request: cannot find this video!'})
        })

        it('responds 201 if successfully deleted', () => {
            return supertest(app)
                .delete('/api/videos/1')
                .expect(204)
        })
    })

    describe('PATCH /api/videos/:videoId', () => {
        it('responds 404 if cannot find matching video id', () => {    
            const updatedVideo = {
                video_id: 9999,
                video_title: 'UPDATED VIDEO',
                video_url: 'https://www.youtube.com/watch?v=UPDATEDVIDEO',
                video_description: 'UPDATED DESCRIPTION',
                video_rating: 5,
                video_created_time: new Date().toLocaleString()
            }

            return supertest(app)
                .patch('/api/videos/9999')
                .send(updatedVideo)
                .expect(404, {error: 'Bad request: cannot find this video!'})
        })

        it('responds 201 if successfully updated', () => {
            const updatedVideo = {
                video_id: 2,
                video_title: 'UPDATED VIDEO',
                video_url: 'https://www.youtube.com/watch?v=UPDATEDVIDEO',
                video_description: 'UPDATED DESCRIPTION',
                genre_id: 1,
                video_rating: 5,
                video_created_time: new Date().toLocaleString()
            }

            return supertest(app)
                .patch('/api/videos/2')
                .send(updatedVideo)
                .expect(201)
                .expect( res => {
                    expect(res.body.video_id).to.be.eql(updatedVideo.video_id)
                    expect(res.body.video_title).to.be.eql(updatedVideo.video_title)
                    expect(res.body.video_url).to.be.eql(updatedVideo.video_url)
                    expect(res.body.video_description).to.be.eql(updatedVideo.video_description)
                    expect(res.body.genre_id).to.be.eql(updatedVideo.genre_id)
                    expect(res.body.video_rating).to.be.eql(updatedVideo.video_rating)
                    expect(res.body.video_created_time).to.be.eql(updatedVideo.video_created_time)
                    expect(res.body).to.have.property('video_thumbnail_url')
                })
                .then(postRes => {
                    return supertest(app)
                        .get(`/api/videos/${postRes.body.video_id}`)
                        .expect(postRes.body)
                })
        })        
    })
    
})