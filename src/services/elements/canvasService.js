const correctExifRotation = (canvas, exifOrientation, height, width) => {
    const context = canvas.getContext('2d');

    if (exifOrientation > 4 && exifOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
    } else {
        canvas.width = width;
        canvas.height = height;
    }

    switch (exifOrientation) {
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

const create = (image, scale, exifOrientation) => {
    const canvas = document.createElement('canvas');

    const scaledHeight = image.height * scale;

    const scaledWidth = image.width * scale;

    const context = correctExifRotation(canvas, exifOrientation, scaledHeight, scaledWidth);

    context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

    return canvas;
};

export default {
    create
};
