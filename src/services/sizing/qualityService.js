import base64toblob from 'base64toblob';

import fileService from '../elements/fileService';

function determineQuality(options, file) {
    const targetFileSize = options.targetFileSize;
    const qualityCanBeLess = targetFileSize < file.size;

    if (targetFileSize && qualityCanBeLess) {
        return targetFileSize / file.size
    }

    return 1.00;
}

function compressionSafety(compressedFile, originalFile) {
    if (compressedFile.size < originalFile.size) {
        return compressedFile;
    }

    return originalFile;
}

const toFile = (file, canvas, options) => {
    const quality = determineQuality(options, file);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const blob = base64toblob(base64, 'image/jpeg');
    const compressedFile = fileService.create(blob, file.name);
    return compressionSafety(compressedFile, file);
};

export default {
    toFile
};
