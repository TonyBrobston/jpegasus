import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';

export const compress = async (file, options = {
    maxHeight: 16250,
    maxWidth: 16250,
    quality: 0.5
}) => {
    const isValidFile = typeof file === 'object' && file !== null && file.size > 0 && file.type.includes('image/');

    if (isValidFile) {
        const canvas = await scaleService.toCanvas(file, options);
        return qualityService.toFile(file, canvas, options);
    }

    return file;
};
