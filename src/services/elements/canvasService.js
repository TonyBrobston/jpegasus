import exifService from '../formats/exifService';

const correctExifRotation = (canvas, orientation, height, width) => {
    const context = canvas.getContext('2d');

    if (orientation > 4 && orientation < 9) {
        canvas.width = height;
        canvas.height = width;
    } else {
        canvas.width = width;
        canvas.height = height;
    }

    switch (orientation) {
        case 2:
            context.transform(-1, 0, 0, 1, width, 0);
            break;
        case 3:
            context.transform(-1, 0, 0, -1, width, height);
            break;
        case 4:
            context.transform(1, 0, 0, -1, 0, height);
            break;
        case 5:
            context.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            context.transform(0, 1, -1, 0, height, 0);
            break;
        case 7:
            context.transform(0, -1, -1, 0, height, width);
            break;
        case 8:
            context.transform(0, -1, 1, 0, 0, width);
            break;
        default:
            break;
    }

    return context;
};

const create = async (image, scale) => {
    const canvas = document.createElement('canvas');
    const scaledHeight = image.height * scale;
    const scaledWidth = image.width * scale;
    const orientation = await exifService.determineOrientation(image);
    const context = correctExifRotation(canvas, orientation, scaledHeight, scaledWidth);
    context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
    return canvas;
};

export default {
    create
};
