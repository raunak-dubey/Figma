import { state } from "../core/state.js";
import { addResizeHandles, removeResizeHandles } from "../core/utils.js";

export const selectElement = (id, canvas) => {
    if (state.selectedId) {
        const prevSelected = canvas.querySelector(`.element[data-id='${state.selectedId}']`);

        if (prevSelected) {
            prevSelected.classList.remove("selected");
            removeResizeHandles(prevSelected);
        }
    }

    const currentSelected = canvas.querySelector(`.element[data-id='${id}']`);
    if (!currentSelected) return;

    currentSelected.classList.add("selected");
    addResizeHandles(currentSelected);
    state.selectedId = id;
}

export const deselectElement = () => {
    if (!state.selectedId) return;

    const currentElem = document.querySelector(`.element[data-id='${state.selectedId}']`);
    if (currentElem) {
        currentElem.classList.remove("selected");
        removeResizeHandles(currentElem);
    }

    state.selectedId = null;
};