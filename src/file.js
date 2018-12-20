const create = async (blob, filename) => {
    return new File([blob], filename);
};

export default {
    create
};
