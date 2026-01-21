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

// * Rotation Angle Calculation * //
export const calculateRotationAngle = (centerX, centerY, mouseX, mouseY) => {
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    return Math.atan2(deltaY, deltaX);
};

export const addRotationHandle = (elem) => {
    const handle = document.createElement("div");
    handle.className = "rotate-handle";
    elem.appendChild(handle);
};

export const removeRotationHandle = (elem) => {
    const handle = elem.querySelector(".rotate-handle");
    if (handle) handle.remove();
};