import { state } from "./state.js";

const STORAGE_KEY = "editor-layout-v1";

// * Save
export const saveLayout = () => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.elements)
    );
};

// * Load
export const loadLayout = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
};

// * Clear
export const clearLayout = () => {
    localStorage.removeItem(STORAGE_KEY);
};