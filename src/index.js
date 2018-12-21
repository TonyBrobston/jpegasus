import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';

const compress = async (file, options = {}) => {
    const quality = 0.5;

    const canvas = await scaleService.toCanvas(file, options);
    return qualityService.toFile(file.name, canvas, quality);
};

export default {
    compress
};
