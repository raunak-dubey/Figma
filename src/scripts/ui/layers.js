import { state } from "../core/state.js";
import { syncZIndex, updateCanvasZIndex } from "../core/utils.js";
import { selectElement } from "../elements/elementSelection.js";

const layersList = document.getElementById("layersList");

export const renderLayers = () => {
    if (!layersList) return;

    layersList.innerHTML = "";

    const elements = [...state.elements].reverse();

    elements.forEach((element) => {
        const layerItem = document.createElement("li");
        layerItem.className = "layer-item";
        layerItem.dataset.id = element.id;

        layerItem.innerHTML = `
            <div class="layer-left">
                <i class="ri-shape-line"></i>
                <span>${element.type}</span>
            </div>

            <div class="layer-actions">
                <i class="up ri-arrow-up-s-line" data-action="up"></i>
                <i class="down ri-arrow-down-s-line" data-action="down"></i>
            </div>
        `;

        layerItem.addEventListener("click", () => {
            selectElement(element.id, canvas);
        });

        layerItem.querySelector(".up").onclick = () => moveLayerUp(element.id, canvas);
        layerItem.querySelector(".down").onclick = () => moveLayerDown(element.id, canvas);
        layersList.appendChild(layerItem);
    });
};

export const moveLayerUp = (id, canvas) => {
    const index = state.elements.findIndex(elem => elem.id === id);
    if (index === -1 || index === state.elements.length - 1) return;

    [state.elements[index], state.elements[index + 1]] = [state.elements[index + 1], state.elements[index]];

    syncZIndex(state.elements);
    updateCanvasZIndex(canvas);
    renderLayers(canvas);
};

export const moveLayerDown = (id, canvas) => {
    const index = state.elements.findIndex(elem => elem.id === id);
    if (index <= 0) return;

    [state.elements[index], state.elements[index - 1]] = [state.elements[index - 1], state.elements[index]];

    syncZIndex(state.elements);
    updateCanvasZIndex(canvas);
    renderLayers(canvas);
};