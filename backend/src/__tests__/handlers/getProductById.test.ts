import request from "supertest"
import app from '../../server';

describe('GET /api/products/:id', () => {

    it('it should get a product', async () => {

        const response = await request(app)
            .get('/api/products/7')

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(500);

    })


    it('it should return 404 if product not found', async () => {

        const id = "9999";

        const response = await request(app)
            .get(`/api/products/${id}`)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe(`Product with id ${id} not found`);

        expect(response.status).not.toBe(500);
    })


    it('it should return 400 if id is not a number', async () => {

        const id = "not-a-number";

        const response = await request(app)
            .get(`/api/products/${id}`)

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        expect(response.status).not.toBe(500);
    })

})