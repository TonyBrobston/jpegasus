import Chance from 'chance';

import index from '../src/index';
import scaleService from '../src/services/sizing/scaleService';
import qualityService from '../src/services/sizing/qualityService';

jest.mock('../src/services/sizing/scaleService');
jest.mock('../src/services/sizing/qualityService');

const chance = new Chance();

describe('index', async () => {
  const fileTypes = ['image/jpeg', 'image/gif', 'image/png'];

  fileTypes.forEach((fileType) => {
    describe('happy path', () => {
      const file = new File([chance.natural()], chance.string(), {
        type: fileType,
      });
      const options = undefined;
      const defaultOptions = {
        allowCrossOriginResourceSharing: false,
        maxHeight: 16250,
        maxWidth: 16250,
        quality: 0.5,
        readImageFileTimeout: 5000,
      };
      const canvas = chance.string();
      const expectedCompressedFile = new File([chance.natural()], chance.string());
      let actualCompressedFile;
      let exifOrientation;

      scaleService.toCanvas.mockResolvedValue(canvas);
      qualityService.toFile.mockReturnValue(expectedCompressedFile);

      beforeAll(async () => {
        exifOrientation = chance.integer();
        actualCompressedFile = await index.compress(file, options, exifOrientation);
      });

      it('should convert file to canvasService and scale', async () => {
        expect(scaleService.toCanvas).toHaveBeenCalledTimes(1);
        expect(scaleService.toCanvas).toHaveBeenCalledWith(file, defaultOptions);
      });

      it('should convert file to file and reduce quality', () => {
        expect(qualityService.toFile).toHaveBeenCalledTimes(1);
        expect(qualityService.toFile).toHaveBeenCalledWith(file, canvas, defaultOptions);
      });

      it('should return a compressed file', () => {
        expect(actualCompressedFile).toBe(expectedCompressedFile);
      });
    });
  });

  describe('sad path', () => {
    describe('scenarios', () => {
      const sadPaths = [
        {
          file: chance.string(),
          scenario: 'file of string',
        },
        {
          file: new File([], chance.string()),
          scenario: 'file with no size',
        },
        {
          file: {},
          scenario: 'file of empty object',
        },
        {
          file: undefined,
          scenario: 'file of undefined',
        },
        {
          file: null,
          scenario: 'file of null',
        },
        {
          file: {
            size: chance.natural(),
            type: chance.string(),
          },
          scenario: 'a File that\'s type does not start with image',
        },
        {
          file: {
            size: chance.natural(),
            type: 'image/tiff',
          },
          scenario: 'a File that\'s type is image/tiff',
        },
      ];

      sadPaths.forEach((sadPath) => {
        it(`should not allow ${sadPath.scenario}`, async () => {
          const compressedFile = await index.compress(sadPath.file);

          expect(compressedFile).toBe(sadPath.file);
        });
      });
    });

    describe('throws', () => {
      it('scaleService toCanvas throws', async () => {
        const expectedFile = new File([chance.natural()], chance.string(), {
          type: `image/${chance.pickone(['jpeg', 'gif', 'png'])}`,
        });

        scaleService.toCanvas.mockImplementation(() => {
          throw new Error();
        });

        const actualFile = await index.compress(expectedFile);

        expect(actualFile).toBe(expectedFile);
      });
    });
  });
});
