import request from 'supertest';
import app from '../../server';

describe('PUT /api/products/:id', () => {

    it('it should update a product', async () => {

        const updatedProduct = {
            name: 'Updated Product',
            price: 150,
            availability: false
        };

        const response = await request(app)
            .put('/api/products/7')
            .send(updatedProduct);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.name).toBe(updatedProduct.name);
        expect(response.body.data.price).toBe(updatedProduct.price);

        expect(response.status).not.toBe(500);
    });

    it('it should return 404 if product not found', async () => {

        const id = "9999";
        const updatedProduct = {
            name: 'Updated Product',
            price: 150,
            availability: false
        };

        const response = await request(app)
            .put(`/api/products/${id}`)
            .send(updatedProduct);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe(`Product not found`);

        expect(response.status).not.toBe(500);
    });

    it('it should return 400 if invalid data is sent', async () => {

        const id = "6";
        const invalidProduct = {
            name: '',
            price: -150,
            availability: false
        };

        const response = await request(app)
            .put(`/api/products/${id}`)
            .send(invalidProduct);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        expect(response.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ msg: "Name is required" }),
            expect.objectContaining({ msg: "Name must be between 4 and 100 characters" }),
            expect.objectContaining({ msg: "Price must be greater than 0" })
        ]));
    });

})