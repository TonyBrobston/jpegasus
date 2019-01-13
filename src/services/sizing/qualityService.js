import base64toblob from 'base64toblob';

import fileService from '../elements/fileService';

const toFile = (file, canvas, options) => {
    const quality = determineQuality(file, options);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const blob = base64toblob(base64, 'image/jpeg');
    const compressedFile = fileService.create(blob, file.name);
    return pickSmallerFile(compressedFile, file);
};

const determineQuality = (file, options) => {
    if (options.quality) {
        return options.quality
    }

    const targetFileSize = options.targetFileSize;
    const qualityCanBeLess = targetFileSize < file.size;

    if (targetFileSize && qualityCanBeLess) {
        return targetFileSize / file.size
    }

    return 1.00;
};

const pickSmallerFile = (compressedFile, originalFile) => {
    if (compressedFile.size < originalFile.size) {
        return compressedFile;
    }

    return originalFile;
};

export default {
    toFile
};
