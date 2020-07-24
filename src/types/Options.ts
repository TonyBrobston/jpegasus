import {InputOptions} from './InputOptions';

export interface Options extends InputOptions {
    readonly allowCrossOriginResourceSharing: boolean;
    readonly quality: number;
    readonly returnOriginalOnFailure: boolean;
    readonly returnOriginalIfCompressedFileIsLarger: boolean;
    readonly scaleImageBy: number;
}
