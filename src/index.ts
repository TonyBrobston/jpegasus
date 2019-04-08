import fileService from './services/fileService';
import optionService from './services/optionService';
import qualityService from './services/qualityService';
import scaleService from './services/scaleService';
import {Options} from './types/Options';

const compress =  async (file: File, inputOptions: Options = {}): Promise<File> => {
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

export default compress;
