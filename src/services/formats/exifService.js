import exif from 'exif-js';

const determineOrientation = (image) => {
    return new Promise((resolve) => {
        exif.getData(image, () => {
            resolve(exif.getTag(image, 'Orientation'));
        });
    });
};

export default {
    determineOrientation
};