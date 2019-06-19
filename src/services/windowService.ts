const toByteArray = (base64: string): Uint8Array[] => {
    const bytes = window.atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < bytes.length; offset += 1024) {
        const sliceOf1024Bytes = bytes.slice(offset, offset + 1024);

        const bytesAsCharCodes = new Array(sliceOf1024Bytes.length);

        for (let i = 0; i < sliceOf1024Bytes.length; i ++) {
            bytesAsCharCodes[i] = sliceOf1024Bytes.charCodeAt(i);
        }

        const byteArray = new Uint8Array(bytesAsCharCodes);

        byteArrays.push(byteArray);
    }

    return byteArrays;
};

export default {
    toByteArray,
};
