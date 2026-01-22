import { state } from "../core/state.js";
import { clamp, commit } from "../core/utils.js";
import { deselectElement } from "../elements/elementSelection.js";
import { renderLayers } from "../ui/layers.js";

const MOVE_STEP = 5;
const FAST_STEP = 10;

const keyCommands = {
    ArrowUp: (ctx) => move(ctx, 0, -1),
    ArrowDown: (ctx) => move(ctx, 0, 1),
    ArrowLeft: (ctx) => move(ctx, -1, 0),
    ArrowRight: (ctx) => move(ctx, 1, 0),

    Delete: ({ canvas }) => deleteSelected(canvas),
    Escape: () => deselectElement()
};


export const initKeyboard = (canvas) => {
    window.addEventListener("keydown", (e) => {
        if (document.activeElement?.isContentEditable) return;

        if (!state.selectedId) return;

        const command = keyCommands[e.key];
        if (!command) return;

        e.preventDefault();

        const data = state.elements.find(elem => elem.id === state.selectedId);
        if (!data) return;

        const elem = canvas.querySelector(`.element[data-id='${data.id}']`);
        if (!elem) return;

        command({ event: e, canvas, data, elem });
    });
};


const move = ({ event, canvas, data, elem }, dx, dy) => {
    const step = event.shiftKey ? FAST_STEP : MOVE_STEP;
    const rect = canvas.getBoundingClientRect();

    data.x += dx * step;
    data.y += dy * step;

    data.x = clamp(data.x, 0, rect.width - data.width);
    data.y = clamp(data.y, 0, rect.height - data.height);

    elem.style.left = data.x + "px";
    elem.style.top = data.y + "px";

    commit();
};

const deleteSelected = (canvas) => {
    const index = state.elements.findIndex(elem => elem.id === state.selectedId);
    if (index === -1) return;

    const elem = canvas.querySelector(`.element[data-id='${state.selectedId}']`);
    if (elem) elem.remove();

    state.elements.splice(index, 1);
    deselectElement();
    renderLayers(canvas);
};
