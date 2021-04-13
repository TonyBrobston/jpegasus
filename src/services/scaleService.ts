import {getOrientation, getOrientationInfo, IOrientationInfo, OrientationCode, readOrientationCode, updateOrientationCode} from '@ginpei/exif-orientation';
import {Options} from '../types/Options';
import canvasService from './canvasService';
import imageService from './imageService';

const determineScale = ({height, width}: HTMLImageElement, {maxHeight, maxWidth, scaleImageBy}: Options): number => {
    const scaledHeight = scaleImageBy * height;
    const scaledWidth = scaleImageBy * width;
    const heightIsGreaterThanWidth = height > width;

    if (heightIsGreaterThanWidth && maxHeight && (scaledHeight > maxHeight)) {
        return maxHeight / height;
    } else if (maxWidth && (scaledWidth > maxWidth)) {
        return maxWidth / width;
    }

    return scaleImageBy;
};

const toCanvas = async (file: File, options: Options): Promise<HTMLCanvasElement> => {
    const orientation = await readOrientationCode(file)
    console.log('orientation code:', orientation)
    if (orientation !== -1) {
        console.log('before update');
        await updateOrientationCode(file, 1);
        console.log('after update');
    }
    console.log('orientation code:', await readOrientationCode(file))
    const image = await imageService.create(file, options);
    const scale = determineScale(image, options);
    return canvasService.create(file, image, scale, options);
};

export default {
    toCanvas,
};
