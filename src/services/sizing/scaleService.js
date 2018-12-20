import imageService from '../elements/imageService';
import canvasSerice from '../elements/canvasService';

const toCanvas = async (file, scale) => {
    const image = await imageService.create(file);
    return canvasSerice.create(image, scale);
};

export default {
    toCanvas
};
