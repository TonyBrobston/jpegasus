import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';

module.exports.compress = async (file) => {
    const scale = 0.29;
    const quality = 0.5;

    const canvas = await scaleService.toCanvas(file, scale);
    return qualityService.toFile(canvas, quality, file.name);
};
