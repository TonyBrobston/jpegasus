import imageService from '../elements/imageService';
import canvasService from '../elements/canvasService';
import exchangeableImageFormatService from '../formats/exchangeableImageFormatService';

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

const toCanvas = async (file, options) => {
    const image = await imageService.create(file, options);
    const exifOrientation = await exchangeableImageFormatService.determineOrientation(file);
    const scale = determineScale(image, options);
    return canvasService.create(image, scale, exifOrientation);
};

export default {
    toCanvas
};
