import imageService from './imageService';
import canvasService from './canvasService';
import {Options} from "../../lib/types/Options";

const determineScale = (image, options) => {
    const height = image.height;
    const width = image.width;
    const maxHeight = options.maxHeight;
    const maxWidth = options.maxWidth;
    const heightCanBeScaled = height > maxHeight;
    const heightIsLargest = height > width;
    const widthCanBeScaled = width > maxWidth;

    if (maxHeight && heightCanBeScaled && heightIsLargest) {
        return maxHeight / height;
    } else if (maxWidth && widthCanBeScaled) {
        return maxWidth / width;
    }

    return 1.00;
};

const toCanvas = async (blob: Blob, options: Options) => {
    const image = await imageService.create(blob, options);
    const scale = determineScale(image, options);
    return canvasService.create(blob, image, scale);
};

export default {
    toCanvas,
};
