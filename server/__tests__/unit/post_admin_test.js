const request = require('supertest');
const express = require('express');
const router = require('./path/to/adminRouter');

// PLACEHOLDER ADMIN
const Admin = require('./path/to/Admin');

const app = express();
app.use(express.json());
app.use('/', router);

jest.mock('./path/to/Admin');

describe('POST /v1', () => {
  it('should create a new admin and return 201 status', async () => {
    const adminData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    Admin.query().insert.mockResolvedValue(adminData); 

    const res = await request(app)
      .post('/v1')
      .send(adminData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('admin');
    expect(res.body.admin).toEqual(adminData);
  });

  it('should return 500 status on error', async () => {
    const adminData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    Admin.query().insert.mockRejectedValue(new Error('Insert failed'));

    const res = await request(app)
      .post('/v1')
      .send(adminData);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Insert failed');
  });
});