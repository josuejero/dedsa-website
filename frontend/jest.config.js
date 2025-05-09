// frontend/jest.config.js
/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest', // use ts-jest for TS files :contentReference[oaicite:2]{index=2}
  testEnvironment: 'jsdom', // browser-like environment for DOM testing :contentReference[oaicite:3]{index=3}
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // ensure this file is processed and can import jest-dom :contentReference[oaicite:4]{index=4}
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json'
      }
    ] // enable ts-jest ESM mode :contentReference[oaicite:10]{index=10}
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
