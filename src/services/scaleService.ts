import canvasService from './canvasService';
import imageService from './imageService';

import {Options} from '../types/Options';

const determineScale = (image: HTMLImageElement, {maxHeight, maxWidth, scaleImageBy}: Options): number => {
    const height = image.height;
    const width = image.width;
    const heightNeedScaledDown = maxHeight && height > maxHeight;
    const heightIsLargest = height > width;
    const widthNeedsScaledDown = maxWidth && width > maxWidth;

    if (scaleImageBy && maxWidth && maxWidth && scaleImageBy * width > maxWidth) {
        return maxWidth / width;
    } else if (scaleImageBy && maxHeight && maxHeight
        && scaleImageBy * height > maxHeight) {
        return maxHeight / height;
    } else if (scaleImageBy && !maxHeight && !maxWidth) {
        return scaleImageBy;
    } else if (maxHeight && heightNeedScaledDown && heightIsLargest) {
        return maxHeight / height;
    } else if (maxWidth && widthNeedsScaledDown) {
        return maxWidth / width;
    }

    return 1.00;
};

const toCanvas = async (file: File, options: Options): Promise<HTMLCanvasElement> => {
    const image = await imageService.create(file, options);
    const scale = determineScale(image, options);
    return canvasService.create(file, image, scale);
};

export default {
    toCanvas,
};
