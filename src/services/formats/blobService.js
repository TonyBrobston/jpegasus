const create = (blob, name) => {
    const blobWithMetadata = blob;

    blobWithMetadata.lastModifiedDate = new Date();
    blobWithMetadata.name = name;

    return blobWithMetadata;
};

export default {
    create
};
