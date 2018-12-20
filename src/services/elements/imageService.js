const getImageSource = (file) => {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    });
};

const buildImage = async (imageSource) => {
    return new Promise(async (resolve) => {
        const image = new Image();
        image.onload = function () {
            resolve(image);

        };
        image.src = imageSource;
    });
};

const create = async (file) => {
    const source = await getImageSource(file);
    return await buildImage(source);
};

export default {
    create
};