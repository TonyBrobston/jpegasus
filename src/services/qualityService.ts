import {Options} from '../types/Options';
import fileService from './fileService';
import windowService from './windowService';

const toFile = (file: File, canvas: HTMLCanvasElement, {preserveFileType, quality}: Options): File|Blob => {
    const type = preserveFileType ? file.type : 'image/jpeg';
    const dataUrl = canvas.toDataURL(type, quality);
    const base64 = dataUrl.split(',')[1];
    const uint8ArrayOfArrays = windowService.toByteArray(base64);
    return fileService.create(uint8ArrayOfArrays, type, file.name);
};

export default {
    toFile,
};
