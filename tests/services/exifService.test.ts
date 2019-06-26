import * as fs from 'fs';
import * as path from 'path';

import {Chance} from 'chance';

import exifService from '../../src/services/exifService';

const chance = new Chance();

describe('exifService', () => {
    interface WindowWithFileReader extends Window {
        FileReader: any;
    }

    describe('read files', () => {
        const scenarios = [
            {
                expectedOrientation: 4,
                file: 'exifOrientationFour.jpeg',
                name: 'should return orientation of 4',
            },
            {
                expectedOrientation: 1,
                file: 'exifGps.jpeg',
                name: 'should return orientation of 1 and has exif gps data',
            },
            {
                expectedOrientation: 1,
                file: 'notJpeg.png',
                name: 'should return orientation 1 because not jpeg',
            },
            {
                expectedOrientation: 1,
                file: 'hasByteStuffing.jpeg',
                name: 'should return orientation 1 because has byte stuffing',
            },
            {
                expectedOrientation: 1,
                file: 'hasNoExif.jpeg',
                name: 'should return orientation 1 because has no exif',
            },
        ];

        scenarios.forEach((scenario: {
            expectedOrientation: number,
            file: string,
            name: string,
        }) => {
            it(scenario.name, async () => {
                const file = await readFileSystemFileToJavaScriptFile(scenario.file);

                const orientation = await exifService.determineOrientation(file);

                expect(orientation).toBe(scenario.expectedOrientation);
            });
        });

        it('should resolve orientation 1 on throw', async () => {
            (window as WindowWithFileReader).FileReader = jest.fn().mockImplementation(() => {
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
