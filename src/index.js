import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';

const compress = async (file, options = {
    maxHeight: 16250,
    maxWidth: 16250,
    quality: 0.5
}) => {
    const canvas = await scaleService.toCanvas(file, options);
    return qualityService.toFile(file, canvas, options);
};

export default {
    compress
};
