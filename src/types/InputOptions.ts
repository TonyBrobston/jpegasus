export interface InputOptions {
    readonly allowCrossOriginResourceSharing?: boolean;
    readonly quality?: number;
    readonly returnOriginalOnFailure?: boolean;
    readonly returnOriginalIfCompressedFileIsLarger?: boolean;
    readonly scaleImageBy?: number;
    readonly maxHeight?: number;
    readonly maxWidth?: number;
}
