const request = require('supertest');
// app is supposed to point to the movieServer
const app = require('../app');
const expect = require("chai").expect;
const helperService = require("../src/utils/helper.service") ;
const INVALID_TOKEN = "invalidTokendksdjfkdsljdslkfds";


describe('Testing Get All movies with a valid Token',async function () {
    it('respond with 200 HTTP status code and message', async function () {
        const  validToken = await helperService.basicToken();
        let response = await request(app).get('/movies')
        .set('Authorization', validToken)
        expect(response.status).to.equal(200);
    });

    it('it Failed to get movies becouse of invalid token', async function () {
        let response = await request(app).get('/movies')
        .set('Authorization', INVALID_TOKEN)
        expect(response.status).to.equal(401);
    });
 
});