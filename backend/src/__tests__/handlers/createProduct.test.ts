import request from 'supertest';
import app from '../../server';

describe('POST /api/products', () => {

    it('should create a new product - api/products', async () => {
        const newProduct = {
            name: 'Test Product',
            price: 100,
        };

        const response = await request(app)
            .post('/api/products')
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.status).not.toBe(500);
    });

    it('should fail to create a product with invalid data - api/products', async () => {
        const invalidProduct = {
            name: '',
            price: -50,
        };

        const response = await request(app)
            .post('/api/products')
            .send(invalidProduct);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });


    it('should fail to create a product with price <= 0 - api/products', async () => {
        const invalidProduct = {
            name: '',
            price: 0,
        };

        const response = await request(app)
            .post('/api/products')
            .send(invalidProduct);

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    type: 'field',
                    value: 0,
                    msg: 'Price must be greater than 0',
                    path: 'price',
                    location: 'body'
                })
            ])
        });
    });


});