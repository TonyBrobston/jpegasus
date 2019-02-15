import fileService from './services/fileService';
import optionService from './services/optionService';
import scaleService from './services/scaleService';
import qualityService from './services/qualityService';

module.exports.compress = async (file, options) => {
    try {
        if (fileService.validate(file)) {
            const mergedOptions = optionService.override(options);
            const canvas = await scaleService.toCanvas(file, mergedOptions);
            return qualityService.toFile(file, canvas, mergedOptions);
        }
    } catch (error) {
        return file;
    }

    return file;
};
