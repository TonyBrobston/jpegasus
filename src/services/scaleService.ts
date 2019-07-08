import {Options} from '../types/Options';
import canvasService from './canvasService';
import imageService from './imageService';

const determineScale = ({height, width}: HTMLImageElement, {maxHeight, maxWidth, scaleImageBy}: Options): number => {
    if (scaleImageBy) {
        if (maxHeight && scaleImageBy * height > maxHeight) {
            return maxHeight / height;
        } else if (maxWidth &&  scaleImageBy * width > maxWidth) {
            return maxWidth / width;
        }

        return scaleImageBy;
    } else {
        if (maxHeight && height > maxHeight && height > width) {
            return maxHeight / height;
        } else if (maxWidth && width > maxWidth) {
            return maxWidth / width;
        }
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
