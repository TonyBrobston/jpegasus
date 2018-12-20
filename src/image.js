const getSource = (file) => {
    return new Promise((resolve) => {
        const fileReader = new FileReader();

        fileReader.onload = function () {
            resolve(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    });
};

const create = async (file) => {
    return new Promise(async (resolve) => {
        const image = new Image();

        image.onload = function () {
            resolve(image);
        };

        image.src = await getSource(file);
    });
};

export default {
    create
};
