export interface InputOptions {
    readonly allowCrossOriginResourceSharing?: boolean;
    readonly fixImageOrientation?: boolean;
    readonly preserveFileType?: boolean;
    readonly quality?: number;
    readonly returnOriginalOnFailure?: boolean;
    readonly returnOriginalIfCompressedFileIsLarger?: boolean;
    readonly scaleImageBy?: number;
    readonly transparencyFillColor?: string,
    readonly maxHeight?: number;
    readonly maxWidth?: number;
}
