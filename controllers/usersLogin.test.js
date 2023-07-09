const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const { DB_HOST, PORT } = process.env;
mongoose.set('strictQuery', true);

const { login } = require('./users');
const testUser = {
  email: 'jon5@mail.com',
  password: '123123-788-232',
};

app.post('/users/login', login);

describe('test login controller', () => {
  beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server running. Use our API on port: ${PORT}`);
        });
      })
      .catch(error => {
        console.log(error.message);
        process.exit(1);
      });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('is request status 200', async () => {
    const response = await request(app).post('/users/login').send(testUser);
    expect(response.status).toBe(200);
  });
  test('is token included in the response', async () => {
    const response = await request(app).post('/users/login').send(testUser);
    expect(response.body.token).toBeDefined();
  });

  test('is email and subscription has type string and included in response', async () => {
    const response = await request(app).post('/users/login').send(testUser);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
