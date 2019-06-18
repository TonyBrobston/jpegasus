const validate = (file: File): boolean => {
    const isNotNull = file !== null;
    const isAnObject = typeof file === 'object';
    const hasSize = file && file.size > 0;
    const isValidType = file && ['image/jpeg', 'image/gif', 'image/png'].includes(file.type);
    return isNotNull && isAnObject && hasSize && isValidType;
};

export default {
    validate,
};
