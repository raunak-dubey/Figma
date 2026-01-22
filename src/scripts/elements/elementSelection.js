import { state } from "../core/state.js";
import { addResizeHandles, addRotationHandle, removeResizeHandles, removeRotationHandle } from "../core/utils.js";
import { hidePropertiesPanel, showPropertiesPanel } from "../ui/properties.js";

export const selectElement = (id, canvas) => {
    if (state.selectedId) {
        const prevSelected = canvas.querySelector(`.element[data-id='${state.selectedId}']`);
        if (prevSelected) {
            prevSelected.classList.remove("selected");
            removeResizeHandles(prevSelected);
            removeRotationHandle(prevSelected);
        }

        const prevLayerItem = document.querySelector(`.layer-item[data-id='${state.selectedId}']`);
        if (prevLayerItem) prevLayerItem.classList.remove("active");
    }
    
    const currentSelected = canvas.querySelector(`.element[data-id='${id}']`);
    if (!currentSelected) return;
    
    // highlight layer
    const layerItem = document.querySelector(`.layer-item[data-id='${id}']`);
    if (layerItem) layerItem.classList.add("active");

    currentSelected.classList.add("selected");
    addResizeHandles(currentSelected);
    addRotationHandle(currentSelected);
    state.selectedId = id;
    showPropertiesPanel(canvas);
}

export const deselectElement = () => {
    if (!state.selectedId) return;

    const currentElem = document.querySelector(`.element[data-id='${state.selectedId}']`);
    if (currentElem) {
        const layerItem = document.querySelector(
            `.layer-item[data-id='${state.selectedId}']`
        );
        if (layerItem) layerItem.classList.remove("active");

        currentElem.classList.remove("selected");
        removeResizeHandles(currentElem);
        removeRotationHandle(currentElem);
        hidePropertiesPanel();
    }

    state.selectedId = null;
};