import supertest from 'supertest';
import { Response } from 'superagent';
import app from '../../src/server';

describe('Article Controler', () => {
  it('Get all articles', async () => {
    await supertest(app).get('/article')
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toHaveLength(0);
      });
  });
  it('Get article by id', async () => {
    await supertest(app).get(`/article/${1}`)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Post article', async () => {
    await supertest(app).post('/article')
      .send({})
      .expect(201)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Put article', async () => {
    await supertest(app).put('/article')
      .send({})
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Delete article', async () => {
    await supertest(app).delete(`/article/${1}`)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
});
