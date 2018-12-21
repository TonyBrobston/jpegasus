import imageService from '../elements/imageService';
import canvasService from '../elements/canvasService';

const toCanvas = async (file, options) => {
    const image = await imageService.create(file);
    let scale = 1;
    if (options.maxHeight && image.height > options.maxHeight) {
        scale = options.maxHeight / image.height;
    } else if (options.maxWidth && image.width > options.maxWidth) {
        scale = options.maxWidth / image.width;
    }
    return canvasService.create(image, scale);
};

export default {
    toCanvas
};
