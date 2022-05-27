/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // eslint-disable-next-line no-magic-numbers
    testTimeout: 1000 * 60 * 5
};
