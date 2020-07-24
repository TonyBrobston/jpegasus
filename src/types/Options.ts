import {SharedOptions} from './SharedOptions';

export interface Options extends SharedOptions {
    readonly allowCrossOriginResourceSharing: boolean;
    readonly quality: number;
    readonly returnOriginalOnFailure: boolean;
    readonly returnOriginalIfCompressedFileIsLarger: boolean;
    readonly scaleImageBy: number;
}
