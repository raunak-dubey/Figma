import { clamp, generateId } from "../core/utils.js";
import { state } from "../core/state.js";

export const createElementData = (type, canvas) => {
  const id = generateId();

  const width = type === "text" ? 120 : 100;
  const height = type === "text" ? 40 : 100;

  let x = 50;
  let y = 50;

  const canvasRect = canvas.getBoundingClientRect();
  x = clamp(x, 0, canvasRect.width - width);
  y = clamp(y, 0, canvasRect.height - height);

  return {
    id,
    type,
    x,
    y,
    width,
    height,
    rotation: 0,
    zIndex: state.elements.length + 1,

    text: type === "text" ? "Text" : "",
    background: type === "rect" ? "#4f46e5" : null,
  };
};
