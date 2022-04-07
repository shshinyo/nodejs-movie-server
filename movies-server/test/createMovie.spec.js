const request = require('supertest');
// app is supposed to point to the movieServer 
const app = require('../app');
const expect = require("chai").expect;
const helperService = require("../src/utils/helper.service") ;
const mockApi = require("../src/utils/mock-api");
const INVALID_TOKEN = "invalidTokendksdjfkdsljdslkfds";


describe('Testing Create New Movie',async function () {
    it('respond with 401 HTTP status code and message', async function () {
        let response = await request(app).post('/movies/add')
        .set('Authorization', INVALID_TOKEN)
        .send(
            {
                "Title": "Iron man",
                "Created_by": 123
            }
        )
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal("Token  expired");
    });

    it('respond with success message for Premium users with valid token', async function () {
        const  premiumToken = await helperService.premiumToken();
        let response = await request(app).post('/movies/add')
        .set('Authorization', premiumToken)
        .send(
            {
                "Title": "Iron man",
                "Created_by": 123
            }
        )
        expect(response.status).to.equal(200);
    });


    it('respond with Failed message for Basic user exceeds num of allowed users', async function () {       
        let response = await mockApi.simulateAsyncCall({method:"POST",url:"movies/add"});
        expect(response.status).to.equal(405);
        expect(response.body.message).to.equal("Basic User Cant Add more than 5");
    });

 
});