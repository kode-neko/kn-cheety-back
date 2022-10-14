import { body, param } from 'express-validator';
import { ObjectId } from 'mongodb';

const validId = param('id')
  .customSanitizer((val) => new ObjectId(val));
const validSkipLimit = body('skip')
  .optional()
  .if(body('limit')
    .isInt({ min: 10 })
    .trim())
  .isInt({ min: 0 })
  .trim();

export {
  validId,
  validSkipLimit,
};
