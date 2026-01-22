import { commit } from "../core/utils.js";

export const updateElementStyle = (data, canvas) => {
    const elem = canvas.querySelector(`.element[data-id='${data.id}']`);
    if (!elem) return;

    elem.style.width = data.width + "px";
    elem.style.height = data.height + "px";

     if (data.type === "rect") {
        elem.style.backgroundColor = data.background || "transparent";
    }

    if (data.type === "text") {
        elem.style.color = data.color || "#111827";
    }

    elem.style.transform = `rotate(${data.rotation}deg)`;
    commit();
};

export const updateElementText = (data, canvas) => {
    const elem = canvas.querySelector(`.element[data-id='${data.id}']`);
    if (elem) {
        elem.textContent = data.text; 
        commit();
    }
};