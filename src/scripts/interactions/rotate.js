import { rotateState, state } from "../core/state.js";
import { calculateRotationAngle } from "../core/utils.js";

export const initRotate = (canvas) => {
    canvas.addEventListener("mousedown", (e) => {
        const handle = e.target.closest(".rotate-handle");
        if (!handle) return;

        e.stopPropagation();

        const elem = handle.parentElement;
        const id = elem.dataset.id;
        const elementData = state.elements.find(elem => elem.id === id);

        const rect = elem.getBoundingClientRect();

        rotateState.isRotating = true;
        rotateState.elementId = id;
        rotateState.centerX = rect.left + rect.width / 2;
        rotateState.centerY = rect.top + rect.height / 2;
        rotateState.startAngle = calculateRotationAngle(rotateState.centerX, rotateState.centerY, e.clientX, e.clientY);
        rotateState.startRotation = elementData.rotation;
    });

    window.addEventListener("mousemove", (e) => {
        if (!rotateState.isRotating) return;

        const elementData = state.elements.find(elem => elem.id === rotateState.elementId);
        const elem = canvas.querySelector(`.element[data-id='${elementData.id}']`);
        if (!elementData || !elem) return;

        const currentAngle = calculateRotationAngle(rotateState.centerX, rotateState.centerY, e.clientX, e.clientY);

        const delta = currentAngle - rotateState.startAngle;
        const degrees = delta * (180 / Math.PI);

        elementData.rotation = rotateState.startRotation + degrees;

        elem.style.transform = `rotate(${elementData.rotation}deg)`;
    });

    window.addEventListener("mouseup", () => {
        rotateState.isRotating = false;
    });
}