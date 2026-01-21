import { initToolbar } from "./ui/toolbar.js";
import { initCanvas } from "./ui/canvas.js";
import { initDrag } from "./interactions/drag.js";

const canvas = document.getElementById("canvas");

initToolbar(canvas);
initCanvas(canvas);
initDrag(canvas);