export const generateId = () => crypto.randomUUID()

export const clamp = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
};

// * Resize Handles Management * //
export const addResizeHandles = (elem) => {
    const positions = ["tl", "tr", "bl", "br"];

    positions.forEach(pos => {
        const handle = document.createElement("div");
        handle.className = `resize-handle ${pos}`;
        handle.dataset.position = pos;
        elem.appendChild(handle);
    });
}

export const removeResizeHandles = (elem) => {
    const handles = elem.querySelectorAll(".resize-handle");
    handles.forEach(handle => handle.remove());
};