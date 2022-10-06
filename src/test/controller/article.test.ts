import supertest from 'supertest';
import { Response } from 'superagent';
import app from '../../src/server';

describe('Article Ctrl', () => {
  it('Ctrl GET /article', async () => {
    await supertest(app).get('/article')
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toHaveLength(0);
      });
  });
  it('Ctrl GET /article/:id', async () => {
    await supertest(app).get(`/article/${1}`)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Ctrl POST /article', async () => {
    await supertest(app).post('/article')
      .send({})
      .expect(201)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Ctrl PUT /article', async () => {
    await supertest(app).put('/article')
      .send({})
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
  it('Ctrl DELETE /article/:id', async () => {
    await supertest(app).delete(`/article/${1}`)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toEqual({});
      });
  });
});
