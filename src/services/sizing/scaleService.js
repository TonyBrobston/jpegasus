import imageService from '../elements/imageService';
import canvasService from '../elements/canvasService';

const toCanvas = async (file, scale) => {
    const image = await imageService.create(file);
    return canvasService.create(image, scale);
};

export default {
    toCanvas
};
