import promiseService from '../timeout/promiseService';

const create = async (file, options) => {
    const imagePromise = new Promise((resolve) => {
        const image = new Image();
        if (options.allowCrossOriginResourceSharing) {
            image.crossOrigin = 'Anonymous';
        }
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = URL.createObjectURL(file);
    });

    return promiseService.timeout(imagePromise, options.readImageFileTimeout, 'The reading of the image timed out.');
};

export default {
    create
};
