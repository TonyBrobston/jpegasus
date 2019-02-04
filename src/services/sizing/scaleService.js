import imageService from '../elements/imageService';
import canvasService from '../elements/canvasService';

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

const toCanvas = async (file, options, exifOrientation) => {
    const image = await imageService.create(file, options);
    const scale = determineScale(image, options);

    return canvasService.create(image, scale, exifOrientation);
};

export default {
    toCanvas
};
