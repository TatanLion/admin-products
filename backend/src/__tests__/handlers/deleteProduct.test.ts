import request from 'supertest';
import app from '../../server';

describe('DELETE /api/products/:id', () => {

    // it('should delete a product successfully', async () => {
    //     const response = await request(app)
    //         .delete('/api/products/80');

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('msg', 'Product deleted successfully');
    // });

    it('should return 404 if product not found', async () => {

        const id = 9999; // Assuming this ID does not exist
        const response = await request(app)
            .delete(`/api/products/${id}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', `Product with id ${id} not found`);
    });

    it('should return 400 if server error occurs', async () => {

        const id = 'not-a-number';
        const response = await request(app)
            .delete(`/api/products/${id}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });

})