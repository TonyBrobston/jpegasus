const create = async (file, options) => {
    return new Promise((resolve) => {
        const image = new Image();
        if (options.allowCrossOriginResourceSharing) {
            image.crossOrigin = 'Anonymous';
        }
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = URL.createObjectURL(file);
    });
};

export default {
    create
};
