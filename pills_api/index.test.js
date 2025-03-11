const request = require('supertest');
const app = require('./index'); // Adjust the path to your Express app file

describe('API Endpoint Tests', () => {
    it('should return a Hello World response for GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toBe('Hello, world!');
    });

    it('should return a 200 status and expected response for GET /api/example', async () => {
        const response = await request(app).get('/api/example');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Hello, world!');
    });

    it('should return 404 for an unknown route', async () => {
        const response = await request(app).get('/api/unknown');
        expect(response.status).toBe(404);
    });

    it('should handle POST requests correctly', async () => {
        const response = await request(app)
            .post('/api/example')
            .send({ name: 'Test' })
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test');
    });
});
