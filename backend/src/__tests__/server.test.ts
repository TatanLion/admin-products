import request from 'supertest'; // @NOTE: Import the supertest library to make HTTP requests
import app from '../server';

describe('GET /api/products', () => {

  it('should return a list of products', async () => {
    const response = await request(app).get('/api/products');

    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.status).toBe(200);

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty('error');
  });

});