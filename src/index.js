import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';

module.exports.compress = async (file, overrideOptions) => {
    try {
        const isValidFile = typeof file === 'object' && file !== null && file.size > 0 && file.type.indexOf('image/') >= 0;

        if (isValidFile) {
            const defaultOptions =  {
                allowCrossOriginResourceSharing: false,
                maxHeight: 16250,
                maxWidth: 16250,
                quality: 0.5,
                readImageFileTimeout: 5000
            };
            const mergedOptions = {
                ...defaultOptions,
                ...overrideOptions
            };
            const canvas = await scaleService.toCanvas(file, mergedOptions);
            return qualityService.toFile(file, canvas, mergedOptions);
        }

        return file;
    } catch (error) {
        return file;
    }
};
