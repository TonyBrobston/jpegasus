import EXIF from 'exif-js';

const create = (blob, filename) => {
    const file = blob;

    file.lastModifiedDate = new Date();
    file.name = filename;

    return file;
};

const getOrientation = (file) =>
    new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
            EXIF.getData(image, function () {
                resolve(EXIF.getTag(this, 'Orientation'));
            });
        };
        image.src = URL.createObjectURL(file);
    });

export default {
    create,
    getOrientation
};
