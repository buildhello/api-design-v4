import {app} from '../src/server';
import supertest from 'supertest';

describe('GET /', () => {
it('Should send back some data!', async () => {
const res = await supertest(app) //res is the result as if the route was tested.
.get("/"); //route tested, method off supertest
expect(res.body.message).toBe('hello');//we expect the request to return hello

});

})
