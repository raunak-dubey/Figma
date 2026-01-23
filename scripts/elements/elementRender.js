import { dragState } from "../core/state.js";
import { pushHistory } from "../core/utils.js";
import { selectElement } from "./elementSelection.js";
import { enableTextEditing } from "./textEditing.js";

export function renderElement(data, canvas) {
    const elem = document.createElement("div");

    elem.classList.add("element");
    elem.dataset.id = data.id;
    elem.dataset.type = data.type;

    elem.style.left = data.x + "px";
    elem.style.top = data.y + "px";
    elem.style.width = data.width + "px";
    elem.style.height = data.height + "px";
    elem.style.transform = `rotate(${data.rotation}deg)`;
    elem.style.transformOrigin = "center center";
    elem.style.zIndex = data.zIndex;

    if (data.type === "rect") {
        elem.style.backgroundColor = data.background;
    }

    if (data.type === "text") {
        elem.textContent = data.text;
        elem.classList.add("text");
        elem.style.fontSize = "16px";
        elem.style.color = data.color || "#111827";

        elem.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            enableTextEditing(elem, data);
        });
    }

    elem.addEventListener("mousedown", (e) => {
        if (e.target.closest(".resize-handle") || e.target.closest(".rotate-handle")) return;

        e.stopPropagation();
        selectElement(data.id, canvas);

        pushHistory()
        dragState.isDragging = true;
        dragState.elementId = data.id;

        dragState.startMouseX = e.clientX;
        dragState.startMouseY = e.clientY;
        dragState.startX = data.x;
        dragState.startY = data.y;
    });

    canvas.appendChild(elem);
}