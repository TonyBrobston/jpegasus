import base64toblob from 'base64toblob';

import image from './image';

const compress = async (file) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = await image.build(file);
    const imageScalePercentage = 0.29;
    const scaledWidth = img.width * imageScalePercentage;
    const scaledHeight = img.height * imageScalePercentage;
    // canvas.width = scaledWidth;
    // canvas.height = scaledHeight;
    context.drawImage(img, 0, 0, scaledWidth, scaledHeight);
    const base64Canvas = canvas.toDataURL('image/jpeg', 0.5);
    const base64Only = base64Canvas.split(',')[1];
    const canvasAsBlob = base64toblob(base64Only, 'image/jpeg');
    return new File([canvasAsBlob], 'temp.jpeg');
};

export default {
    compress
};
