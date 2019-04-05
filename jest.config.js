module.exports = {
  coverageDirectory: ".coverage",
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/tests/setup.ts'],
};