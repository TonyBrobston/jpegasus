import {InputOptions} from './InputOptions';

export interface Options extends InputOptions {
    readonly allowCrossOriginResourceSharing: boolean;
    readonly fixImageOrientation: boolean;
    readonly quality: number;
    readonly returnOriginalOnFailure: boolean;
    readonly returnOriginalIfCompressedFileIsLarger: boolean;
    readonly scaleImageBy: number;
    readonly transparencyFillColor: string;
}
