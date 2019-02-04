const getImageSource = (file) => {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            resolve(fileReader.result);
        });
        fileReader.readAsDataURL(file);
    });
};

const buildImage = (imageSource, options) => {
    return new Promise((resolve) => {
        const image = new Image();
        if (options.allowCrossOriginResourceSharing) {
            image.crossOrigin = 'Anonymous';
        }
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = imageSource;
    });
};

const create = async (file, options) => {
    const imageSource = await getImageSource(file);
    return buildImage(imageSource, options);
};

export default {
    create
};
