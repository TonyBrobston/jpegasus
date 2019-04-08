import blobService from './blobService';
import windowService from './windowService';

import {Options} from '../types/Options';

const toFile = (file: File, canvas: HTMLCanvasElement, options: Options): File => {
    const quality = options.quality ? options.quality : 1.00;
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const byteArray = windowService.toByteArray(base64);
    return blobService.create(byteArray, 'image/jpeg', file.name);
};

export default {
    toFile,
};
