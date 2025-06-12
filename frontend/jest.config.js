const nextJest = require('next/jest.js');
const createJestConfig = nextJest({ dir: './' });

const customConfig = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/core/(.*)$': '<rootDir>/src/core/$1',
  },
};

module.exports = createJestConfig(customConfig);
