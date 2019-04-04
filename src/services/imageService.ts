import {Options} from "../../lib/types/Options";

const create = async (blob: Blob, options: Options) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        if (options.allowCrossOriginResourceSharing) {
            image.crossOrigin = 'Anonymous';
        }
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', (error) => {
            reject(error);
        });
        image.src = URL.createObjectURL(blob);
    });
};

export default {
    create,
};
