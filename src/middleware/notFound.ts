import { Request, Response } from 'express';

function notFound(req: Request, res: Response) {
  res
    .status(404)
    .send({ msg: 'Not found bro' });
}

export default notFound;
