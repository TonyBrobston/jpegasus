import base64toblob from 'base64toblob';

import image from './image';
import file from './file';
import canvas from './canvas';

const compress = async (imageFile) => {
    const img = await image.create(imageFile);
    const imageScalePercentage = 0.29;
    const scaledHeight = img.height * imageScalePercentage;
    const scaledWidth = img.width * imageScalePercentage;

    const imageCanvas = canvas.create(scaledHeight, scaledWidth);
    const context = imageCanvas.getContext('2d');
    context.drawImage(img, 0, 0, scaledWidth, scaledHeight);

    const base64Canvas = imageCanvas.toDataURL('image/jpeg', 0.5);
    const base64Only = base64Canvas.split(',')[1];
    const canvasAsBlob = base64toblob(base64Only, 'image/jpeg');
    return file.create(canvasAsBlob, imageFile.name);
};

export default {
    compress
};
