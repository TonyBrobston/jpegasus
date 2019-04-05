import * as path from 'path';
import * as fs from 'fs';

import exifService from '../../src/services/exifService';

describe('exifService', () => {
    const scenarios = [
        {
            expectedOptions: 4,
            file: 'exifOrientationFour.jpg',
            name: 'should return orientation of 4',
        },
        {
            expectedOptions: 1,
            file: 'exifGps.jpg',
            name: 'should return orientation of 1 and has exif gps data',
        },
        {
            expectedOptions: undefined,
            file: 'notJpeg.png',
            name: 'should return because not jpeg',
        },
        {
            expectedOptions: undefined,
            file: 'hasByteStuffing.jpeg',
            name: 'should break because has byte stuffing',
        },
        {
            expectedOptions: undefined,
            file: 'hasNoExif.jpg',
            name: 'should exit because has no exif',
        },
    ];

    scenarios.forEach((scenario) => {
        it(scenario.name, async () => {
            const file = await readFileSystemFileToJavaScriptFile(scenario.file);

            const orientation = await exifService.determineOrientation(file);

            expect(orientation).toBe(scenario.expectedOptions);
        });
    });
});

const readFileSystemFileToJavaScriptFile = async (imagePath) => {
    const fullyQualifiedPath = path.resolve(__dirname, `../imagesOfExifVariety/${imagePath}`);
    const fileAsBuffer = await fs.readFileSync(fullyQualifiedPath);
    return new File([new Uint8Array(fileAsBuffer)], 'foo');
};
