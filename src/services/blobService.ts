const create = (byteArray: BlobPart[], type: string, name: string): File => {
    return new File(byteArray, name, {type});
};

export default {
    create,
};
