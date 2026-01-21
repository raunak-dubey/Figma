import { initToolbar } from "./ui/toolbar.js";
import { initCanvas } from "./ui/canvas.js";
import { initDrag } from "./interactions/drag.js";
import { initResize } from "./interactions/resize.js";

const canvas = document.getElementById("canvas");

initToolbar(canvas);
initCanvas(canvas);
initDrag(canvas);
initResize(canvas);