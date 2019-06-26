import fileService from './services/fileService';
import optionService from './services/optionService';
import qualityService from './services/qualityService';
import scaleService from './services/scaleService';
import {Options} from './types/Options';

export const compress = async (file: File, inputOptions: Options = {}): Promise<File|Blob> => {
    const options = optionService.override(inputOptions);

    try {
        if (fileService.validate(file)) {
            const canvas = await scaleService.toCanvas(file, options);
            return qualityService.toFile(file, canvas, options);
        }
    } catch (error) {
        if (options.returnOriginalOnFailure) {
            return file;
        }
        throw error;
    }

    return file;
};
