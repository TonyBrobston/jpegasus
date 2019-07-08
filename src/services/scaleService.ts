import {Options} from '../types/Options';
import canvasService from './canvasService';
import imageService from './imageService';

const determineScale = ({height, width}: HTMLImageElement, {maxHeight, maxWidth, scaleImageBy}: Options): number => {
    if (scaleImageBy) {
        const scaledHeight = scaleImageBy * height;
        const scaledWidth = scaleImageBy * width;
        const heightIsGreaterThanWidth = height > width;

        if (heightIsGreaterThanWidth && maxHeight && (scaledHeight > maxHeight)) {
            return maxHeight / height;
        } else if (maxWidth && (scaledWidth > maxWidth)) {
            return maxWidth / width;
        }

        return scaleImageBy;
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
