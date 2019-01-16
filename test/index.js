const app = require('../index');
const assert = require('assert');
const request = require('supertest');

let token;

describe('Testing  server', () => {

    it('fails to log in to the server', done => {
        const data = {
            username: 'admin', password: 'adminad,om'
        };
        request(app)
            .post('/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                assert.equal(res.body.auth, false);
                done();
            });
    });

    it('logs in to the server', done => {
        const data = {
            username: 'admin', password: 'admin'
        };
        request(app)
            .post('/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.auth, true);
                token = res.body.token
                done();
            });
    });

    it('fails to access endpoint without token', done => {
        request(app)
            .get('/countries')
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                assert.equal(res.body.auth, false);
                done();
            });
    });

    it('returns a list of countries with zero length', done => {
        request(app)
            .get('/countries')
            .send()
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.countries.length, 0);
                done();
            });
    });

    it('adds a country', done => {
        const data = {
            country: 'ghana'
        }
        request(app)
            .put('/countries')
            .send(data)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.countries.length, 1);
                assert.equal(res.body.countries[0], data.country);
                done();
            });
    });

    it('deletes a country', done => {
        const data = {
            country: 'ghana'
        }
        request(app)
            .delete('/countries')
            .send(data)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.countries.length, 0);
                done();
            });
    });

    
});