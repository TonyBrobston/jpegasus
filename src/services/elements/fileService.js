const create = (blob, filename) => {
    return {
        ...blob,
        lastModifiedDate: new Date(),
        name: filename
    };
};

export default {
    create
}
