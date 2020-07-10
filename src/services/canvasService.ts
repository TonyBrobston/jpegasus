import {getOrientation, getOrientationInfo, IOrientationInfo, OrientationCode} from '@ginpei/exif-orientation';

const setCanvasDimensions = (
    canvas: HTMLCanvasElement,
    orientation: IOrientationInfo,
    scaledHeight: number,
    scaledWidth: number,
): void => {
    if ([90, 270].includes(orientation.rotation)) {
        canvas.width = scaledHeight;
        canvas.height = scaledWidth;
    } else {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
    }
};

const correctExifRotation = (
    context: CanvasTransform,
    {flipped, rotation}: IOrientationInfo,
    height: number,
    width: number,
): void => {
    if (flipped) {
        if (rotation === 0) {
            context.transform(-1, 0, 0, 1, width, 0);
        } else if (rotation === 90) {
            context.transform(0, 1, 1, 0, 0, 0);
        } else if (rotation === 180) {
            context.transform(1, 0, 0, -1, 0, height);
        } else if (rotation === 270) {
            context.transform(0, -1, -1, 0, height, width);
        }
    } else {
        if (rotation === 90) {
            context.transform(0, 1, -1, 0, height, 0);
        } else if (rotation === 180) {
            context.transform(-1, 0, 0, -1, width, height);
        } else if (rotation === 270) {
            context.transform(0, -1, 1, 0, 0, width);
        }
    }
};

const getOrientationSafe = async (file: File): Promise<IOrientationInfo> => {
    const original = {rotation: 0, flipped: false};
    try {
        return await getOrientation(file) || original;
    } catch (error) {
        return original;
    }
};

const create = async (file: File, image: HTMLImageElement, scale: number): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        const scaledHeight = image.height * scale;
        const scaledWidth = image.width * scale;
        const orientation = await getOrientationSafe(file);
        setCanvasDimensions(canvas, orientation, scaledHeight, scaledWidth);
        correctExifRotation(context, orientation, scaledHeight, scaledWidth);
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
        return canvas;
    } else {
        throw new Error('Could not get CanvasRenderingContext2D from HTMLCanvasElement.');
    }
};

export default {
    create,
};
