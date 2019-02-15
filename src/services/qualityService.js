import base64toblob from 'base64toblob';

import blobService from './blobService';

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

const pickSmallerFile = (compressedBlob, originalFile) => {
    if (compressedBlob.size < originalFile.size) {
        return compressedBlob;
    }

    return originalFile;
};

const toFile = (originalFile, canvas, options) => {
    const quality = determineQuality(originalFile, options);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const blob = base64toblob(base64, 'image/jpeg');
    const compressedBlob = blobService.addMetadata(blob, originalFile.name);
    return pickSmallerFile(compressedBlob, originalFile);
};

export default {
    toFile,
};
