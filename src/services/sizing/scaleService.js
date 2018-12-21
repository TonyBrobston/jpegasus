import imageService from '../elements/imageService';
import canvasService from '../elements/canvasService';

const toCanvas = async (file, options) => {
    const image = await imageService.create(file);
    let scale = 1;
    if (options.maxHeight) {
        scale = image.height / options.maxHeight;
    }
    return canvasService.create(image, scale);
};

export default {
    toCanvas
};
