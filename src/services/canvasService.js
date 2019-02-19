import exifService from './exifService';

function setCanvasDimensions(canvas, orientation, scaledHeight, scaledWidth) {
    if (orientation > 4 && orientation < 9) {
        canvas.width = scaledHeight;
        canvas.height = scaledWidth;
    } else {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
    }
}

const correctExifRotation = (context, orientation, height, width) => {
    switch (orientation) {
    case 2:
        context.transform(- 1, 0, 0, 1, width, 0);
        break;
    case 3:
        context.transform(- 1, 0, 0, - 1, width, height);
        break;
    case 4:
        context.transform(1, 0, 0, - 1, 0, height);
        break;
    case 5:
        context.transform(0, 1, 1, 0, 0, 0);
        break;
    case 6:
        context.transform(0, 1, - 1, 0, height, 0);
        break;
    case 7:
        context.transform(0, - 1, - 1, 0, height, width);
        break;
    case 8:
        context.transform(0, - 1, 1, 0, 0, width);
        break;
    default:
        break;
    }
};

const create = async (file, image, scale) => {
    const canvas = document.createElement('canvas');
    const scaledHeight = image.height * scale;
    const scaledWidth = image.width * scale;
    const orientation = await exifService.determineOrientation(file);
    setCanvasDimensions(canvas, orientation, scaledHeight, scaledWidth);
    const context = canvas.getContext('2d');
    correctExifRotation(context, orientation, scaledHeight, scaledWidth);
    context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
    return canvas;
};

export default {
    create,
};
