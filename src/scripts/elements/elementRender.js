import { dragState } from "../core/state.js";
import { selectElement } from "./elementSelection.js";

export function renderElement(data, canvas) {
    const elem = document.createElement("div");

    elem.classList.add("element");
    elem.dataset.id = data.id;
    elem.dataset.type = data.type;

    elem.style.left = data.x + "px";
    elem.style.top = data.y + "px";
    elem.style.width = data.width + "px";
    elem.style.height = data.height + "px";
    if (data.type === "rect") {
        elem.style.backgroundColor = data.background;
    }

    if (data.type === "text") {
        elem.textContent = data.text;
        elem.classList.add("text");
        elem.style.fontSize = "16px";
        elem.style.color = "#000";
    }

    elem.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        selectElement(data.id, canvas);

        dragState.isDragging = true;
        dragState.elementId = data.id;

        dragState.startMouseX = e.clientX;
        dragState.startMouseY = e.clientY;
        dragState.startX = data.x;
        dragState.startY = data.y;

    });

    canvas.appendChild(elem);
}