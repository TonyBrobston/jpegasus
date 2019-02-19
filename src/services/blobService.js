const create = (byteArray, type, name) => {
    const blob = new Blob(byteArray, {type});

    blob.name = name;
    blob.lastModifiedDate = new Date();

    return blob;
};

export default {
    create,
};
