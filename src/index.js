import fileService from './services/fileService';
import optionService from './services/optionService';
import scaleService from './services/scaleService';
import qualityService from './services/qualityService';
import comparisonService from './services/comparisonService';

module.exports.compress = async (file, inputOptions) => {
    try {
        if (fileService.validate(file)) {
            const options = optionService.override(inputOptions);
            const canvas = await scaleService.toCanvas(file, options);
            const blob = qualityService.toBlob(file, canvas, options);
            return comparisonService.pickSmaller(blob, file);
        }

        return file;
    } catch (error) {
        return file;
    }
};
