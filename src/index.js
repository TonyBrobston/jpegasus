import fileService from './services/fileService';
import optionService from './services/optionService';
import scaleService from './services/scaleService';
import qualityService from './services/qualityService';

module.exports.compress = async (file, inputOptions) => {
    try {
        if (fileService.validate(file)) {
            const options = optionService.override(inputOptions);
            const canvas = await scaleService.toCanvas(file, options);
            return qualityService.toFile(file, canvas, options);
        }
    } catch (error) {
        return file;
    }

    return file;
};
