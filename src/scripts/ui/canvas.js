import { deselectElement } from "../elements/elementSelection.js";
import { dragState } from "../core/state.js";

export const initCanvas = (canvas) => {
    canvas.addEventListener("click", (e) => {
        if (dragState.isDragging) return;

        if (!e.target.closest(".element")) {
            deselectElement();
        }
    });
};