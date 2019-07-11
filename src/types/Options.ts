import {SharedOptions} from './SharedOptions';

export interface Options extends SharedOptions {
    allowCrossOriginResourceSharing: boolean;
    quality: number;
    returnOriginalOnFailure: boolean;
    scaleImageBy: number;
}
