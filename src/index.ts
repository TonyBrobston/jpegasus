import fileService from './services/fileService';
import optionService from './services/optionService';
import scaleService from './services/scaleService';
import qualityService from './services/qualityService';
import {Options} from './types/Options'

export const compress = async (blob: Blob, inputOptions: Options) => {
    try {
        if (fileService.validate(blob)) {
            const options = optionService.override(inputOptions);
            const canvas = await scaleService.toCanvas(blob, options);
            return qualityService.toBlob(blob, canvas, options);
        }
    } catch (error) {}

    return blob;
};

