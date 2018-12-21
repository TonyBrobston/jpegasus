import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';

const compress = async (file, options = {
    targetFileSize: 500000
}) => {
    const canvas = await scaleService.toCanvas(file, options);
    return qualityService.toFile(file, canvas, options);
};

export default {
    compress
};
