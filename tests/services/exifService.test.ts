import * as fs from 'fs';
import * as path from 'path';

import {Chance} from 'chance';

import exifService from '../../src/services/exifService';

const chance = new Chance();

describe('exifService', (): void => {
    interface WindowWithFileReader extends Window {
        FileReader: any;
    }
    describe('insert orientation', (): void => {
        it('should insert orientation', async (): Promise<void> => {
            const fileWithNoExif = await readFileSystemFileToJavaScriptFile('no-exif.jpg');
            const expectedOrientation = chance.natural({min: 1, max: 8})
            const fileWithOrientation = await exifService.insertOrientation(fileWithNoExif, expectedOrientation);
            const afterOrientation = await exifService.determineOrientation(fileWithOrientation);
            expect(afterOrientation).toBe(expectedOrientation);
        });
    });

    describe('determine orientation', (): void => {
        const scenarios = [
            {
                expectedOrientation: 1,
                file: '000-1.jpg',
                name: 'should return orientation of 1',
            },
            {
                expectedOrientation: 2,
                file: '000-flipped-2.jpg',
                name: 'should return orientation of 2',
            },
            {
                expectedOrientation: 3,
                file: '180-3.jpg',
                name: 'should return orientation of 3',
            },
            {
                expectedOrientation: 4,
                file: '180-flipped-4.jpg',
                name: 'should return orientation of 4',
            },
            {
                expectedOrientation: 5,
                file: '090-flipped-5.jpg',
                name: 'should return orientation of 5',
            },
            {
                expectedOrientation: 6,
                file: '090-6.jpg',
                name: 'should return orientation of 6',
            },
            {
                expectedOrientation: 7,
                file: '270-flipped-7.jpg',
                name: 'should return orientation of 7',
            },
            {
                expectedOrientation: 8,
                file: '270-8.jpg',
                name: 'should return orientation of 8',
            },
            {
                expectedOrientation: 1,
                file: 'up.jpg',
                name: 'should return orientation of 1',
            },
            {
                expectedOrientation: 2,
                file: 'up-mirrored.jpg',
                name: 'should return orientation of 2',
            },
            {
                expectedOrientation: 3,
                file: 'down.jpg',
                name: 'should return orientation of 3',
            },
            {
                expectedOrientation: 4,
                file: 'down-mirrored.jpg',
                name: 'should return orientation of 4',
            },
            {
                expectedOrientation: 5,
                file: 'left-mirrored.jpg',
                name: 'should return orientation of 5',
            },
            {
                expectedOrientation: 6,
                file: 'left.jpg',
                name: 'should return orientation of 6',
            },
            {
                expectedOrientation: 7,
                file: 'right-mirrored.jpg',
                name: 'should return orientation of 7',
            },
            {
                expectedOrientation: 8,
                file: 'right.jpg',
                name: 'should return orientation of 8',
            },
            {
                expectedOrientation: 1,
                file: 'exifGps.jpeg',
                name: 'should return orientation of 1 and has exif gps data',
            },
            {
                expectedOrientation: -1,
                file: 'notJpeg.png',
                name: 'should return orientation -1 because not jpeg',
            },
            {
                expectedOrientation: -1,
                file: 'hasByteStuffing.jpeg',
                name: 'should return orientation -1 because has byte stuffing',
            },
            {
                expectedOrientation: -1,
                file: 'hasNoExif.jpeg',
                name: 'should return orientation -1 because has no exif',
            },
            {
                expectedOrientation: -1,
                file: 'no-exif.jpeg',
                name: 'should return orientation -1 because also has no exif',
            },
            {
                expectedOrientation: -1,
                file: 'image-stuck-in-promise.jpg',
                name: 'should return orientation -1 because has no exif and stuck in promise',
            },
        ];

        scenarios.forEach((scenario: {
            expectedOrientation: number,
            file: string,
            name: string,
        }): void => {
            it(`${scenario.file} ${scenario.name}`, async (): Promise<void> => {
                const file = await readFileSystemFileToJavaScriptFile(scenario.file);

                const orientation = await exifService.determineOrientation(file);

                expect(orientation).toBe(scenario.expectedOrientation);
            });
        });

        it('should resolve orientation 1 on throw', async (): Promise<void> => {
            (window as WindowWithFileReader).FileReader = jest.fn().mockImplementation((): void => {
                throw new Error();
            });

            const orientation = await exifService.determineOrientation(new File([], chance.string()));

            expect(orientation).toBe(1);
        });
    });
});

const readFileSystemFileToJavaScriptFile = async (imagePath: string): Promise<File> => {
    const fullyQualifiedPath = path.resolve(__dirname, `../imagesOfExifVariety/${imagePath}`);
    const fileAsBuffer = await fs.readFileSync(fullyQualifiedPath);
    return new File([new Uint8Array(fileAsBuffer)], imagePath);
};
