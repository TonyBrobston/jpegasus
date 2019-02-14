import base64toblob from 'base64toblob';

import blobService from '../formats/blobService';

const determineQuality = (file, options) => {
    if (options.quality) {
        return options.quality;
    }

    const targetFileSize = options.targetFileSize;
    const qualityCanBeLess = targetFileSize < file.size;

    if (targetFileSize && qualityCanBeLess) {
        return targetFileSize / file.size;
    }

    return 1.00;
};

const toFile = (file, canvas, options) => {
    const quality = determineQuality(file, options);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const blob = base64toblob(base64, 'image/jpeg');
    return blobService.create(blob, file.name);
};

export default {
    toFile,
};
