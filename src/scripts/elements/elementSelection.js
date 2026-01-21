import { state } from "../core/state.js";

export const selectElement = (id, canvas) => {
    if (state.selectedId) {
        const prevSelected = canvas.querySelector(`.element[data-id='${state.selectedId}']`);

        if (prevSelected) prevSelected.classList.remove("selected");
    }

    const currentSelected = canvas.querySelector(`.element[data-id='${id}']`);
    if (!currentSelected) return;

    currentSelected.classList.add("selected");
    state.selectedId = id;
}

export const deselectElement = (e) => {
    if (!state.selectedId) return;

    const currentElem = document.querySelector(`.element[data-id='${state.selectedId}']`);
    if (currentElem) currentElem.classList.remove("selected");
    state.selectedId = null;
};