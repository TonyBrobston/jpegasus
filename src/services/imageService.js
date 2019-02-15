import promiseService from './promiseService';

const create = async (file, options) => {
    const timeoutMessage = 'The reading of the image timed out.';
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

    return promiseService.timeout(imagePromise, options.readImageFileTimeout, timeoutMessage);
};

export default {
    create,
};
