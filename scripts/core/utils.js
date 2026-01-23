import { renderElement } from "../elements/elementRender.js";
import { renderLayers } from "../ui/layers.js";
import { saveLayout } from "./persistence.js";
import { state } from "./state.js";

export const generateId = () => crypto.randomUUID()

export const clamp = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
};

const clone = (data) => structuredClone(data);

// * Persistence * //
export const persist = () => saveLayout();

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

// * Z-Index Management * //
export const syncZIndex = (elements) => {
    elements.forEach((elem, index) => {
        elem.zIndex = index + 1;
    });
};

export const updateCanvasZIndex = (canvas) => {
    state.elements.forEach(elem => {
        const domElem = canvas.querySelector(`.element[data-id='${elem.id}']`);

        if (domElem) domElem.style.zIndex = elem.zIndex;
    });
};

// * Keyboard Shortcut Helpers
export const pushHistory = () => {
    state.history.past.push(clone(state.elements));
    state.history.future.length = 0;
};

export const undo = () => {
    if (!state.history.past.length) return;

    state.history.future.push(clone(state.elements));
    state.elements = state.history.past.pop();
};

export const redo = () => {
    if (!state.history.future.length) return;

    state.history.past.push(clone(state.elements));
    state.elements = state.history.future.pop();
};

export const rerender = (canvas) => {
    canvas.replaceChildren();

    const sorted = [...state.elements].sort(
        (a, b) => a.zIndex - b.zIndex
    );

    for (const elem of sorted) {
        renderElement(elem, canvas);
    }
    renderLayers();
};