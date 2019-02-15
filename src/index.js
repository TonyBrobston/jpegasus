import optionService from './services/config/optionService';
import scaleService from './services/sizing/scaleService';
import qualityService from './services/sizing/qualityService';

module.exports.compress = async (file, options) => {
    try {
        const fileIsNotNull = file !== null;
        const fileIsAnObject = typeof file === 'object';
        const fileHasSize = file.size > 0;
        const fileIsValidType = ['image/jpeg', 'image/gif', 'image/png'].includes(file.type);
        const isValidFile = fileIsNotNull && fileIsAnObject && fileHasSize && fileIsValidType;

        if (isValidFile) {
            const mergedOptions = optionService.override(options);
            const canvas = await scaleService.toCanvas(file, mergedOptions);
            return qualityService.toFile(file, canvas, mergedOptions);
        }

        return file;
    } catch (error) {
        return file;
    }
};
