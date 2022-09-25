import supertest from 'supertest';
import { Response } from 'superagent';
import app from '../../src/server';

describe('User Controler', () => {
  it('Get all users', async () => {
    await supertest(app).get('/user')
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toHaveLength(0);
      });
  });
  it('Get user by id', async () => {
    await supertest(app).get(`/user/${1}`)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Post user', async () => {
    await supertest(app).post('/user')
      .send({})
      .expect(201)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Put user', async () => {
    await supertest(app).put('/user')
      .send({})
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Delete user', async () => {
    await supertest(app).delete(`/user/${1}`)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
});
