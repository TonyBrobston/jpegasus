import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';
import fileService from './services/formats/blobService';

module.exports.compress = async (file, options = {
    allowCrossOriginResourceSharing: false,
    maxHeight: 16250,
    maxWidth: 16250,
    quality: 0.5
}) => {
    const isValidFile = typeof file === 'object' && file !== null && file.size > 0 && file.type.indexOf('image/') >= 0;

    if (isValidFile) {
        const canvas = await scaleService.toCanvas(file, options);
        return qualityService.toFile(file, canvas, options);
    }

    return file;
};
