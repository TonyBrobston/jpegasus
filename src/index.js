import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';

const compress = async (file, options = {
    maxHeight: 1200,
    maxWidth: 1200,
    targetFileSize: 500000
}) => {
    const canvas = await scaleService.toCanvas(file, options);
    return qualityService.toFile(file, canvas, options);
};

export default {
    compress
};
