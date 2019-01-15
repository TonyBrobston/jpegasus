const create = (blob, filename) => {
    const file = blob;

    file.lastModifiedDate = new Date();
    file.name = filename;

    return file;
};

export default {
    create
}
