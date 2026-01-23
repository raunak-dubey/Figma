import { state } from "../core/state.js";
import { persist, pushHistory, syncZIndex, updateCanvasZIndex } from "../core/utils.js";
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

        const layerLeft = document.createElement('div');
        layerLeft.className = 'layer-left';

        const icon = document.createElement('i');
        icon.className = 'ri-shape-line';
        layerLeft.appendChild(icon);

        const span = document.createElement('span');
        span.className = 'layer-name';
        span.textContent = element.name || element.type;
        layerLeft.appendChild(span);

        span.ondblclick = (e) => {
            e.stopPropagation();
            startRename(span, element, canvas);
        };

        const layerActions = document.createElement('div');
        layerActions.className = 'layer-actions';

        ['up', 'down'].forEach(action => {
            const i = document.createElement('i');
            i.className = `${action} ri-arrow-${action}-s-line`;
            i.dataset.action = action;
            layerActions.appendChild(i);
        });

        layerItem.innerHTML = '';
        layerItem.appendChild(layerLeft);
        layerItem.appendChild(layerActions);

        layerItem.onclick = () => selectElement(element.id, canvas)

        layerItem.querySelector(".up").onclick = () => moveLayerUp(element.id, canvas);
        layerItem.querySelector(".down").onclick = () => moveLayerDown(element.id, canvas);
        layersList.appendChild(layerItem);
    });
};

const startRename = (label, element, canvas) => {
    pushHistory();

    const input = document.createElement("input");
    input.value = element.name;
    input.className = "layer-rename-input";

    label.replaceWith(input);
    input.focus();
    input.select();

    const finish = (save) => {
        if (save) {
            element.name = input.value.trim() || element.type;
            persist();
        }
        renderLayers(canvas);
    };

    input.onkeydown = (e) => {
        if (e.key === "Enter") input.blur();
        if (e.key === "Escape") {
            input.value = element.name;
            input.blur();
        }
    };

    input.onblur = () => finish(true);
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