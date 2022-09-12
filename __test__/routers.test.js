'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest(server.app);

jest.useRealTimers();

describe('Test routes', () => {

    it('Get all posts', async () => {
        const res = await request.get('/post');
        expect(res.status).toEqual(200);
    });

    it('Get one post', async () => {
        const res = await request.get('/post/1');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('{"id":1,"title":"Hello world","content":"Welcome "}');
    });
});

describe('Test Post route', () => {

it('Create a post', async () => {
    const res =  await request.post('/post').send({
        title: 'test',
        content: 'this is a test'
    })
    expect(res.status).toEqual(200);
});
});

describe('Test put route', () => {

    it('Update a post', async () => {
        const res =  await request.put('/post/put').send({
            title: 'new title ',
            content: 'new content '
        });
        expect(res.status).toEqual(201);
        });
});


describe('Test delete route', () => {

    it('Delete', async () => {
        const res = await request.delete('/post/delete');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('');
    });

});