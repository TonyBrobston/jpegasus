import {SharedOptions} from './SharedOptions';

export interface Options extends SharedOptions {
    allowCrossOriginResourceSharing: boolean;
    quality: number;
    returnOriginalOnFailure: boolean;
    returnOriginalIfCompressedFileIsLarger: boolean;
    scaleImageBy: number;
}
