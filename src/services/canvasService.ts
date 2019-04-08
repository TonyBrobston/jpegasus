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

const correctExifRotation = (context: CanvasTransform, orientation: number, height: number, width: number) => {
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

const create = async (file: File, image: HTMLImageElement, scale: number) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        const scaledHeight = image.height * scale;
        const scaledWidth = image.width * scale;
        const orientation = await exifService.determineOrientation(file);
        setCanvasDimensions(canvas, orientation, scaledHeight, scaledWidth);
        correctExifRotation(context, orientation, scaledHeight, scaledWidth);
        context && context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
        return canvas;
    } else {
        throw 'Could not get CanvasRenderingContext2D from HTMLCanvasElement.'
    }
};

export default {
    create,
};
