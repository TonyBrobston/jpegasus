import base64toblob from 'base64toblob';

import fileService from '../elements/fileService';

const toFile = (file, canvas, options) => {
    const quality = options.targetFileSize / file.size;
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const blob = base64toblob(base64, 'image/jpeg');
    return fileService.create(blob, file.name);
};

export default {
    toFile
};
