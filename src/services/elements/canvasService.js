const create = (img, scale) => {
    const canvas = document.createElement('canvas');

    const scaledHeight = img.height * scale;
    canvas.height = scaledHeight;

    const scaledWidth = img.width * scale;
    canvas.width = scaledWidth;

    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, scaledWidth, scaledHeight);

    return canvas;
};

export default {
    create
}