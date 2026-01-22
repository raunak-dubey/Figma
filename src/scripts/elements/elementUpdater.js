export const updateElementStyle = (data, canvas) => {
    const elem = canvas.querySelector(`.element[data-id='${data.id}']`);
    if (!elem) return;

    elem.style.width = data.width + "px";
    elem.style.height = data.height + "px";

    if (data.background) {
        elem.style.backgroundColor = data.background;
    } else {
        elem.style.backgroundColor = "transparent";
    }

    elem.style.transform = `rotate(${data.rotation}deg)`;
};

export const updateElementText = (data, canvas) => {
    const elem = canvas.querySelector(`.element[data-id='${data.id}']`);
    if (elem) elem.textContent = data.text;
};