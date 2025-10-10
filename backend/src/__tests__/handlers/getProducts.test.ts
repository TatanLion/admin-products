import request from 'supertest';
import app from '../../server';

describe('GET /products', () => {

    it('should return a list of products - api/products', async () => {
        const response = await request(app)
            .get('/api/products');

        console.log(response.body);
        

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);

        expect(response.status).not.toBe(500);
    });

});