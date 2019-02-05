import exif from 'exif-js';

const determineOrientation = (file) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener('load', () => {
            exif.getData(image, () => {
                resolve(exif.getTag(image, 'Orientation'));
            });
        });
        image.src = URL.createObjectURL(file);
    });
};

export default {
    determineOrientation
};