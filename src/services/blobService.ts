const create = (bytes: Uint8Array[], type: string, name: string): File => {
    return new File(bytes, name, {type});
};

export default {
    create,
};
