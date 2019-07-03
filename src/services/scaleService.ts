import canvasService from './canvasService';
import imageService from './imageService';

import {Options} from '../types/Options';

const determineScale = (image: HTMLImageElement, options: Options): number => {
    const height = image.height;
    const width = image.width;
    const maxHeight = options.maxHeight;
    const maxWidth = options.maxWidth;
    const heightNeedScaledDown = maxHeight && height > maxHeight;
    const heightIsLargest = height > width;
    const widthNeedsScaledDown = maxWidth && width > maxWidth;

    if (options.scaleImageBy && options.maxWidth && options.scaleImageBy * width > options.maxWidth) {
        return maxWidth / width;
    } else if (options.scaleImageBy && options.maxHeight && options.scaleImageBy * height > options.maxHeight) {
        return maxHeight / height;
    } else if (options.scaleImageBy && !options.maxHeight && !options.maxWidth) {
        return options.scaleImageBy;
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
