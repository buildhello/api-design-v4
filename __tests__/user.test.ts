import * as user from '../src/handlers/user';
import supertest from 'supertest';

describe('POST /', () => {
it('should create a new user', async () => {
const req = {body: {username: 'hello', password: 'hi'}};//mocked out request object
const res = {json({token}){//json() can be turned into a spy, a function that will show that it has been accessed and to what extent
expect(token).toBeTruthy();//you need to tell jest it should expect to see atleast one expect call
}};//mocked out response object


const newUser = await user.createNewUser(req, res, () => {//mimics next
}); //mimics newUser, but it isn't going to be a newUser, 


});//end it
})//end describe
