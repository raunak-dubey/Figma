import { initToolbar } from "./ui/toolbar.js";
import { initCanvas } from "./ui/canvas.js";
import { initDrag } from "./interactions/drag.js";
import { initResize } from "./interactions/resize.js";
import { initRotate } from "./interactions/rotate.js";
import { initKeyboard } from "./interactions/keyboard.js";
import { loadLayout } from "./core/persistence.js";
import { state } from "./core/state.js";
import { renderElement } from "./elements/elementRender.js";
import { renderLayers } from "./ui/layers.js";

const canvas = document.getElementById("canvas");

// * Restore Layouts
const savedElements = loadLayout();

if (savedElements.length) {
    state.elements = savedElements;

    state.elements.forEach(data => {
        renderElement(data, canvas);
    });

    renderLayers(canvas);
}

initToolbar(canvas);
initCanvas(canvas);
initDrag(canvas);
initResize(canvas);
initRotate(canvas);
initKeyboard(canvas)