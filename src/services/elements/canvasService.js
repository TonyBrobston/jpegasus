const create = (image, scale) => {
    const canvas = document.createElement('canvas');

    const scaledHeight = image.height * scale;
    canvas.height = scaledHeight;

    const scaledWidth = image.width * scale;
    canvas.width = scaledWidth;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

    return canvas;
};

export default {
    create
}