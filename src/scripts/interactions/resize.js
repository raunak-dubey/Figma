import { resizeState, state } from "../core/state.js";
import { clamp, persist, pushHistory } from "../core/utils.js";

export const initResize = (canvas) => {
    canvas.addEventListener("mousedown", (e) => {
        const handle = e.target.closest(".resize-handle");
        if (!handle) return;

        e.stopPropagation();
        pushHistory()

        const elem = handle.parentElement;
        const id = elem.dataset.id;
        const elementData = state.elements.find(elem => elem.id === id);

        resizeState.isResizing = true;
        resizeState.elementId = id;
        resizeState.handle = handle.dataset.position;

        resizeState.startMouseX = e.clientX;
        resizeState.startMouseY = e.clientY;
        resizeState.startX = elementData.x;
        resizeState.startY = elementData.y;
        resizeState.startWidth = elementData.width;
        resizeState.startHeight = elementData.height;
    });

    window.addEventListener("mousemove", (e) => {
        if (!resizeState.isResizing) return;

        const elementData = state.elements.find(elem => elem.id === resizeState.elementId);
        const elem = canvas.querySelector(`.element[data-id='${elementData.id}']`);
        if (!elementData || !elem) return;

        const deltaX = e.clientX - resizeState.startMouseX;
        const deltaY = e.clientY - resizeState.startMouseY;

        const minSize = 30;
        const canvasRect = canvas.getBoundingClientRect();

        if (resizeState.handle.includes("r")) {
            elementData.width = clamp(resizeState.startWidth + deltaX, minSize, canvasRect.width);
        }
        if (resizeState.handle.includes("l")) {
            elementData.width = clamp(resizeState.startWidth - deltaX, minSize, canvasRect.width);
            elementData.x = resizeState.startX + deltaX;
        }
        if (resizeState.handle.includes("b")) {
            elementData.height = clamp(resizeState.startHeight + deltaY, minSize, canvasRect.height);
        }
        if (resizeState.handle.includes("t")) {
            elementData.height = clamp(resizeState.startHeight - deltaY, minSize, canvasRect.height);
            elementData.y = resizeState.startY + deltaY;
        }

        // Clamp inside canvas
        elementData.x = clamp(elementData.x, 0, canvasRect.width - elementData.width);
        elementData.y = clamp(elementData.y, 0, canvasRect.height - elementData.height);

        elem.style.width = elementData.width + "px";
        elem.style.height = elementData.height + "px";
        elem.style.left = elementData.x + "px";
        elem.style.top = elementData.y + "px";
    });

    window.addEventListener("mouseup", () => {
        if (!resizeState.isResizing) return;
        resizeState.isResizing = false;
        persist();
    });
}