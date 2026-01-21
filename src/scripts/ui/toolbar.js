import { state } from "../core/state.js";
import { createElementData } from "../elements/elementData.js";
import { renderElement } from "../elements/elementRender.js";
import { renderLayers } from "./layers.js";

export const initToolbar = (canvas) => {
    document.body.addEventListener('click', (e) => {
        if (!e.target.classList.contains("icon")) return;

        const toolName = e.target.parentElement.dataset.name;

        if (toolName === "shape" || toolName === "text") {
            const type = toolName === "shape" ? "rect" : "text";
            const data = createElementData(type, canvas);
            state.elements.push(data);
            renderElement(data, canvas);
            renderLayers()
        }
    })
};