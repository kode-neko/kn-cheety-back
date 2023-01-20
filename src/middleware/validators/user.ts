import { body, param } from 'express-validator';

const validNameParam = param('name')
  .isAlphanumeric()
  .isLength({ min: 4, max: 50 });
const validName = body('name')
  .isAlphanumeric()
  .isLength({ min: 4, max: 50 })
  .trim();
const validEmail = body('email')
  .isEmail()
  .trim();
const validPass = body('pass')
  .isStrongPassword({ minSymbols: 0 });

const validSignUp = [validName, validEmail, validPass];
const validSignIn = [validName, validPass];

export {
  validNameParam,
  validName,
  validEmail,
  validPass,
  validSignUp,
  validSignIn,
};
