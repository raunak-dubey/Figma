import { state } from "../core/state.js";
import { clamp, persist, generateId, pushHistory, redo, rerender, undo } from "../core/utils.js";
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
let moving = false;


export const initKeyboard = (canvas) => {
    window.addEventListener("keydown", (e) => {
        if (document.activeElement?.isContentEditable) return;

        const ctrl = e.metaKey || e.ctrlKey;

        // * Undo
        if (ctrl && e.key === "z" && !e.shiftKey) {
            e.preventDefault();
            undo();
            rerender(canvas);
            return;
        }

        // * Redo
        if (ctrl && e.key === "y" ) {
            e.preventDefault();
            redo();
            rerender(canvas);
            return;
        }

        // * Duplicate
        if (ctrl && e.key === "d") {
            e.preventDefault();
            duplicateSelected();
            return;
        }

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

    window.addEventListener("keyup", () => {
        if (moving) {
            moving = false;
            persist();
        }
    });

};

const move = ({ event, canvas, data, elem }, dx, dy) => {
    if (!moving) {
        pushHistory();
        moving = true;
    }

    const step = event.shiftKey ? FAST_STEP : MOVE_STEP;
    const rect = canvas.getBoundingClientRect();

    data.x += dx * step;
    data.y += dy * step;

    data.x = clamp(data.x, 0, rect.width - data.width);
    data.y = clamp(data.y, 0, rect.height - data.height);

    elem.style.left = data.x + "px";
    elem.style.top = data.y + "px";
};

const deleteSelected = (canvas) => {
    const index = state.elements.findIndex(elem => elem.id === state.selectedId);
    if (index === -1) return;

    pushHistory()

    state.elements.splice(index, 1);
    deselectElement();

    rerender(canvas)
    renderLayers(canvas);
    persist()
};

export const duplicateSelected = () => {
    const original = state.elements.find(elem => elem.id === state.selectedId);
    if (!original) return;

    pushHistory();

    const copy = {
        ...structuredClone(original),
        id: generateId(),
        x: original.x + 10,
        y: original.y + 10,
        zIndex: state.elements.length + 1
    };

    state.elements.push(copy);
    state.selectedId = copy.id;

    rerender(canvas);
    persist();
};