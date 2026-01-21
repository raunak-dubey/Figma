export const generateId = () => crypto.randomUUID()

export const clamp = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
};