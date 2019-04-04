const create = (byteArray: BlobPart[], type: string, name: string) => {
    return new File(byteArray, name, {type});
};

export default {
    create,
};
