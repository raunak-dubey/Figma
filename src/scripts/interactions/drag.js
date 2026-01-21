import { dragState, state } from "../core/state.js";
import { clamp } from "../core/utils.js";

export const initDrag = (canvas) => {
    window.addEventListener('mousemove', (e) => {
        if (!dragState.isDragging) return;

        const elementData = state.elements.find(elem => elem.id === dragState.elementId);
        if (!elementData) return;

        const deltaX = e.clientX - dragState.startMouseX;
        const deltaY = e.clientY - dragState.startMouseY;

        const canvasRect = canvas.getBoundingClientRect();

        const newX = dragState.startX + deltaX;
        const newY = dragState.startY + deltaY;

        const clampedX = clamp(newX, 0, canvasRect.width - elementData.width);
        const clampedY = clamp(newY, 0, canvasRect.height - elementData.height);

        elementData.x = clampedX;
        elementData.y = clampedY;

        const elem = canvas.querySelector(`.element[data-id='${elementData.id}']`);
        if (elem) {
            elem.style.left = elementData.x + "px";
            elem.style.top = elementData.y + "px";
        }
    });

    window.addEventListener('mouseup', (e) => {
        dragState.isDragging = false;
        dragState.elementId = null;
    });
}