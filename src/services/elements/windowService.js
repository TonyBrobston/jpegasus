const toBlob = (base64, blobType) => {
    console.log('base64:', base64);
    
    const bytes = window.atob(base64);

    console.log('bytes:', bytes);

    const byteArrays = [];

    for (let offset = 0; offset < bytes.length; offset += 1024) {
        const sliceOf1024Bytes = bytes.slice(offset, offset + 1024);

        let bytesAsCharCodes = new Array(sliceOf1024Bytes.length);

        //todo: need to convert this to a map, I'm just not sure how to get a charcode for a single character
        for (let i = 0; i < sliceOf1024Bytes.length; i++) {
            bytesAsCharCodes[i] = sliceOf1024Bytes.charCodeAt(i);
        }

        console.log('bytesAsCharCodes:', bytesAsCharCodes);

        const byteArray = new Uint8Array(bytesAsCharCodes);

        byteArrays.push(byteArray);
    }

    console.log('byteArrays:', byteArrays);

    return new Blob(byteArrays, {type: blobType});
};

export default {
    toBlob
};