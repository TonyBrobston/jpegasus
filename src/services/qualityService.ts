import {Options} from '../types/Options';
import fileService from './fileService';
import windowService from './windowService';

const toFile = (file: File, canvas: HTMLCanvasElement, {quality}: Options): File|Blob => {
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const uint8ArrayOfArrays = windowService.toByteArray(base64);
    return fileService.create(uint8ArrayOfArrays, 'image/jpeg', file.name);
};

export default {
    toFile,
};
