const create = (file, filename) => {
    const blob = file;

    blob.lastModifiedDate = new Date();
    blob.name = filename;

    return blob;
};

export default {
    create
};
