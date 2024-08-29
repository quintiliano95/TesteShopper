export const validateBase64 = (base64: string): boolean => {
    const regex = /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}(?:==)?|[A-Za-z0-9+\/]{3}=?)?$/;
    return regex.test(base64);
};
