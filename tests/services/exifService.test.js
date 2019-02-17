import path from 'path';
import fs from 'fs';

import exifService from '../../src/services/exifService';

describe('exifService', () => {
    const scenarios = [
        {
            expected: 4,
            file: 'exifOrientationFour.jpg',
            name: 'should return orientation of 4',
        },
        {
            expected: 1,
            file: 'exifGps.jpg',
            name: 'should return orientation of 1 and has exif gps data',
        },
        {
            expected: undefined,
            file: 'notJpeg.png',
            name: 'should return because not jpeg',
        },
        {
            expected: undefined,
            file: 'hasByteStuffing.jpeg',
            name: 'should break because has byte stuffing',
        },
        {
            expected: undefined,
            file: 'hasNoExif.jpg',
            name: 'should exit because has no exif',
        },
    ];

    scenarios.forEach((scenario) => {
        it(scenario.name, async () => {
            const file = await readFileSystemFileToJavaScriptFile(scenario.file);

            const orientation = await exifService.determineOrientation(file);

            expect(orientation).toBe(scenario.expected);
        });
    });
});

const readFileSystemFileToJavaScriptFile = async (imagePath) => {
    const fullyQualifiedPath = path.resolve(__dirname, `../imagesOfExifVariety/${imagePath}`);
    const fileAsBuffer = await fs.readFileSync(fullyQualifiedPath);
    return new File([new Uint8Array(fileAsBuffer)], 'foo');
};
