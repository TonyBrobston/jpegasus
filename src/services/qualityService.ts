import blobService from './blobService';
import {Options} from '../types/Options';
import windowService from './windowService';

const toFile = (file: File, canvas: any, options: Options) => {
    const quality = options.quality ? options.quality : 1.00;
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const byteArray = windowService.toByteArray(base64);
    return blobService.create(byteArray, 'image/jpeg', file.name);
};

export default {
    toFile,
};
