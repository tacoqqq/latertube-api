const app = require('../src/app');
const { STORE } = require('../store');

describe('folderRouter', () => {
    it('GET /api/genres responds 200 and all genres', () => {
        return supertest(app)
            .get('/api/genres')
            .expect(200, STORE.GENRES)
    })

    it('POST /api/genres responds 400 when missing genre title', () => {
        return supertest(app)
            .post('/api/genres')
            .expect(400, {error: 'Missing genre title in the request body!'})
    })

    it('POST /api/genres responds 201 when create new genre succesfully', () => {

        const newGenre = {
            genre_id: 12345,
            genre_title: "test genre",
            genre_created_time: new Date().toLocaleString()
        }

        return supertest(app)
            .post('/api/genres')
            .send(newGenre)
            .expect(201)
            .expect( res => {
                expect(res.body.genre_id).to.be.eql(newGenre.genre_id)
                expect(res.body.genre_title).to.be.eql(newGenre.genre_title)
                expect(res.body.genre_created_time).to.be.eql(newGenre.genre_created_time)
            })
    })
})
