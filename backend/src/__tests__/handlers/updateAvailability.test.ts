import request from 'supertest';
import app from '../../server';

describe('PATCH /api/products/:id', () => {

    it('should update product availability - api/products/:id', async () => {
        const availabilityUpdate = {
            availability: false,
        };
        const response = await request(app)
            .patch('/api/products/7')
            .send(availabilityUpdate);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.availability).toBe(!availabilityUpdate.availability);

        expect(response.status).not.toBe(500);
    });

    it('should return 404 if product not found - api/products/:id', async () => {
        const id = "9999";
        const availabilityUpdate = {
            availability: false,
        };
        const response = await request(app)
            .patch(`/api/products/${id}`)
            .send(availabilityUpdate);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe(`Product with id ${id} not found`);

        expect(response.status).not.toBe(500);
    });

    it('should return 400 if id is not a number - api/products/:id', async () => {
        const id = "not-a-number";

        const availabilityUpdate = {
            availability: false,
        };
        
        const response = await request(app)
            .patch(`/api/products/${id}`)
            .send(availabilityUpdate);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('ID must be an integer');

        expect(response.status).not.toBe(500);
    });

});