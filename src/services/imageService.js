const create = async (file, options) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        if (options.allowCrossOriginResourceSharing) {
            image.crossOrigin = 'Anonymous';
        }
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', (error) => {
            reject(error);
        });
        image.src = URL.createObjectURL(file);
    });
};

export default {
    create,
};
