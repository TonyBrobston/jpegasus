import canvasService from './canvasService';
import imageService from './imageService';

import {Options} from '../types/Options';

const determineScale = (image: HTMLImageElement, options: Options) => {
    const height = image.height;
    const width = image.width;
    const maxHeight = options.maxHeight;
    const maxWidth = options.maxWidth;
    let heightCanBeScaled = false;
    if (maxHeight) {
        heightCanBeScaled = height > maxHeight;
    }
    const heightIsLargest = height > width;
    let widthCanBeScaled = false;
    if (maxWidth) {
        widthCanBeScaled = width > maxWidth;
    }

    if (maxHeight && heightCanBeScaled && heightIsLargest) {
        return maxHeight / height;
    } else if (maxWidth && widthCanBeScaled) {
        return maxWidth / width;
    }

    return 1.00;
};

const toCanvas = async (file: File, options: Options) => {
    const image = await imageService.create(file, options);
    const scale = determineScale(image, options);
    return canvasService.create(file, image, scale);
};

export default {
    toCanvas,
};
