import {SharedOptions} from './SharedOptions';

export interface InputOptions extends SharedOptions {
    allowCrossOriginResourceSharing?: boolean;
    quality?: number;
    returnOriginalOnFailure?: boolean;
    scaleImageBy?: number;
}
