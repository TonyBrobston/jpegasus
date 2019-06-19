import * as fs from 'fs';
import * as path from 'path';

import exifService from '../../src/services/exifService';

describe('exifService', () => {
    const scenarios = [
        {
            expectedOrientation: 4,
            file: 'exifOrientationFour.jpg',
            name: 'should return orientation of 4',
        },
        {
            expectedOrientation: 1,
            file: 'exifGps.jpg',
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
            file: 'hasNoExif.jpg',
            name: 'should return orientation 1 because has no exif',
        },
    ];

    scenarios.forEach((scenario: any) => {
        it(scenario.name, async () => {
            const file = await readFileSystemFileToJavaScriptFile(scenario.file);

            const orientation = await exifService.determineOrientation(file);

            expect(orientation).toBe(scenario.expectedOrientation);
        });
    });
});

const readFileSystemFileToJavaScriptFile = async (imagePath: string): Promise<File> => {
    const fullyQualifiedPath = path.resolve(__dirname, `../imagesOfExifVariety/${imagePath}`);
    const fileAsBuffer = await fs.readFileSync(fullyQualifiedPath);
    return new File([new Uint8Array(fileAsBuffer)], 'foo');
};
