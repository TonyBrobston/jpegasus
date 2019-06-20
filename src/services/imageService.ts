import {Options} from '../types/Options';

const create = async (file: File, options: Options): Promise<HTMLImageElement> => {
    return new Promise((resolve: (image: HTMLImageElement) => void, reject: (error: ErrorEvent) => void): void => {
        const image = new Image();
        if (options.allowCrossOriginResourceSharing) {
            image.crossOrigin = 'Anonymous';
        }
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', (error: ErrorEvent) => {
            reject(error);
        });
        image.src = URL.createObjectURL(file);
    });
};

export default {
    create,
};
