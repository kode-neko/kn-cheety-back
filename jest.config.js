/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'node_modules',
    '<rootDir>/dist',
    '<rootDir>/build',
    '<rootDir>/scripts',
    '<rootDir>/fixtures',
  ],
};
