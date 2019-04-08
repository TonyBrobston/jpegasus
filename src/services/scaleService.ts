import canvasService from './canvasService';
import imageService from './imageService';

import {Options} from '../types/Options';

const determineScale = (image: HTMLImageElement, options: Options): number => {
    const height = image.height;
    const width = image.width;
    const maxHeight = options.maxHeight;
    const maxWidth = options.maxWidth;
    const heightCanBeScaled = maxHeight && height > maxHeight;
    const heightIsLargest = height > width;
    const widthCanBeScaled = maxWidth && width > maxWidth;

    if (maxHeight && heightCanBeScaled && heightIsLargest) {
        return maxHeight / height;
    } else if (maxWidth && widthCanBeScaled) {
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
