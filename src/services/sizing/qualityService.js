import base64toblob from 'base64toblob';

import fileService from '../elements/fileService';

const toFile = (canvas, quality, filename) => {
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const blob = base64toblob(base64, 'image/jpeg');
    return fileService.create(blob, filename);
};

export default {
    toFile
};
