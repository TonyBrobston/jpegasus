import Chance from 'chance';

import promiseService from '../../../src/services/timeout/promiseService';

const chance = new Chance();

describe('promiseService', () => {
  describe('happy path', () => {
    let actualValue;


    let expectedValue;


    let promiseToRun;

    beforeAll(async () => {
      expectedValue = chance.string();
      promiseToRun = new Promise((resolve) => {
        resolve(expectedValue);
      });

      actualValue = await promiseService.timeout(promiseToRun, 5000, chance.string());
    });

    it('promise should resolve normally', () => {
      expect(actualValue).toBe(expectedValue);
    });
  });

  describe('sad path', () => {
    let actualError;


    let promiseThatNeverResolves;


    let timeoutMessage;

    beforeAll(async () => {
      promiseThatNeverResolves = new Promise(() => {});
      timeoutMessage = chance.string();

      try {
        await promiseService.timeout(promiseThatNeverResolves, 0, timeoutMessage);
      } catch (error) {
        actualError = error;
      }
    });

    it('promise should resolve normally', () => {
      expect(actualError).toBe(timeoutMessage);
    });
  });
});
