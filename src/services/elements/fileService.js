const create = (blob, filename) => {
    return new File([blob], filename);
};

export default {
    create
}