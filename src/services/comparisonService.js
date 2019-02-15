const pickSmaller = (compressedBlob, originalFile) => {
    return compressedBlob.size < originalFile.size ? compressedBlob : originalFile;
};

export default {
    pickSmaller,
};
