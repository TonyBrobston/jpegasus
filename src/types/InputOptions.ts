import {SharedOptions} from './SharedOptions';

export interface InputOptions extends SharedOptions {
    allowCrossOriginResourceSharing?: boolean;
    quality?: number;
    returnOriginalOnFailure?: boolean;
    returnOriginalIfCompressedFileIsLarger?: boolean;
    scaleImageBy?: number;
}
