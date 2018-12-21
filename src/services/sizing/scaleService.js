import imageService from '../elements/imageService';
import canvasService from '../elements/canvasService';

const determineScale = (image, options) => {
    const maxHeight = options.maxHeight;
    const heightCanBeScaled = image.height > maxHeight;
    const maxWidth = options.maxWidth;
    const widthCanBeScaled = image.width > maxWidth;

    if (maxHeight && heightCanBeScaled) {
        return maxHeight / image.height;
    } else if (maxWidth && widthCanBeScaled) {
        return maxWidth / image.width;
    }

    return 1.00;
};

const toCanvas = async (file, options) => {
    const image = await imageService.create(file);
    const scale = determineScale(image, options);
    return canvasService.create(image, scale);
};

export default {
    toCanvas
};
