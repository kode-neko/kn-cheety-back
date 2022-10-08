import supertest from 'supertest';
import { Response } from 'superagent';
import app from '../../server.js';

describe('User Ctrl', () => {
  it('Ctrl GET /user', async () => {
    await supertest(app).get('/user')
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toHaveLength(0);
      });
  });
  it('Ctrl GET /user/:id', async () => {
    await supertest(app).get(`/user/${1}`)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Ctrl POST /user', async () => {
    await supertest(app).post('/user')
      .send({})
      .expect(201)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Ctrl PUT /user', async () => {
    await supertest(app).put('/user')
      .send({})
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Ctrl DELETE /user/:id', async () => {
    await supertest(app).delete(`/user/${1}`)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
});
