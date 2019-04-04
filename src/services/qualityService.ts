import windowService from './windowService';
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

const toBlob = (file, canvas, options) => {
    const quality = determineQuality(file, options);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const base64 = dataUrl.split(',')[1];
    const byteArray = windowService.toByteArray(base64);
    return blobService.create(byteArray, 'image/jpeg', file.name);
};

export default {
    toBlob,
};
