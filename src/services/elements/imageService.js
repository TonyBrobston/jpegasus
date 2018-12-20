const getImageSource = (file) => {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            resolve(fileReader.result);
        });
        fileReader.readAsDataURL(file);
    });
};

const buildImage = async (imageSource) => {
    return new Promise(async (resolve) => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = imageSource;
    });
};

const create = async (file) => {
    const imageSource = await getImageSource(file);
    return await buildImage(imageSource);
};

export default {
    create

};