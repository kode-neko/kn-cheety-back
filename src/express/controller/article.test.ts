// import { stub } from 'sinon';
import supertest from 'supertest';
import { Response } from 'superagent';
import { routes } from '../../config';
import app from '../server';
// import { articleRouter } from '../routes';

describe('Article Controler', () => {
  it('Get all articles', async () => {
    await supertest(app).get(routes.article.name + routes.gen.get)
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toHaveLength(0);
      });
  });
});
