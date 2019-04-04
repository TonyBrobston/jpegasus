import fileService from './services/fileService';
import optionService from './services/optionService';
import scaleService from './services/scaleService';
import qualityService from './services/qualityService';
import {Options} from './types/Options'

export const compress = async (file: File, inputOptions: Options) => {
    try {
        if (fileService.validate(file)) {
            const options = optionService.override(inputOptions);
            const canvas = await scaleService.toCanvas(file, options);
            return qualityService.toFile(file, canvas, options);
        }
    } catch (error) {}

    return file;
};

