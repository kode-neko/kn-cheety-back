import { body } from 'express-validator';
import { validSkipLimit } from './gen.js';

const validTitle = body('title')
  .isAlphanumeric()
  .isLength({ min: 0, max: 250 })
  .trim()
  .escape();
const validContent = body('content')
  .custom(() => body('custom').isArray().trim().escape()
|| body('custom').isAlphanumeric().trim().escape());
const validTags = body('tags')
  .isArray({ min: 1 })
  .custom((list: string[]) => list.every((ele: any) => (ele instanceof String)));
const validTagsOpt = body('tags')
  .optional()
  .isArray({ min: 1 })
  .custom((list: string[]) => list.every((ele: any) => (ele instanceof String)));
const validLang = body('lang')
  .isAlpha()
  .isLength({ min: 2, max: 2 })
  .isIn(['es', 'en']);
const validAuthor = body('author')
  .isAlphanumeric()
  .isLength({ min: 0, max: 250 })
  .trim()
  .escape();
const validListFind = [validSkipLimit, validTagsOpt];
const validListArticle = [validTitle, validContent, validTags, validLang, validAuthor];

export {
  validTitle,
  validContent,
  validTags,
  validTagsOpt,
  validLang,
  validAuthor,
  validListFind,
  validListArticle,
};
