import { createRequire } from 'module';
const requiree = createRequire('./');
const articlesFixtures = requiree('./articles.json');
const usersFixtures = requiree('./users.json');
export { articlesFixtures, usersFixtures };
