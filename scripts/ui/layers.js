import { state } from "../core/state.js";
import { persist, pushHistory, syncZIndex, updateCanvasZIndex } from "../core/utils.js";
import { selectElement } from "../elements/elementSelection.js";

const layersList = document.getElementById("layersList");

const ICON_PATHS = {
    shape: '/assets/rectangle.svg',
    text: '/assets/text.svg',
    up: '/assets/arrow-up.svg',
    down: '/assets/arrow-down.svg'
};

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

        const icon = document.createElement("img");
        icon.className = 'layer-icon';
        icon.src = element.type === "text" ? ICON_PATHS.text : ICON_PATHS.shape;
        icon.alt = element.type;
        icon.draggable = false;
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
            const actionBtn = document.createElement("img");
            actionBtn.className = `${action} layer-action-btn`;
            actionBtn.src = ICON_PATHS[action];
            actionBtn.alt = `Move ${action}`;
            actionBtn.draggable = false;
            actionBtn.dataset.action = action;
            layerActions.appendChild(actionBtn);
        });

        layerItem.innerHTML = '';
        layerItem.appendChild(layerLeft);
        layerItem.appendChild(layerActions);

        layerItem.onclick = (e) => {
            if (e.target.classList.contains("layer-action-btn")) return;
            selectElement(element.id, canvas)
        }

        layerItem.querySelector(".up").onclick = (e) => {
            e.stopPropagation();
            moveLayerUp(element.id, canvas);
        };

        layerItem.querySelector(".down").onclick = (e) => {
            e.stopPropagation();
            moveLayerDown(element.id, canvas);
        };
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