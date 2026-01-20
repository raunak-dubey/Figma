const canvas = document.getElementById("canvas");

const state = {
    elements: [],
    selectedId: null
};

let idCounter = "";

// * generate unique ID
function generateId() {
    idCounter = crypto.randomUUID();
    return idCounter;
}

function createElement(type) {
    const id = generateId();

    const width = type === "text" ? 120 : 100;
    const height = type === "text" ? 40 : 100;
    let x = 50;
    let y = 50;

    const canvasRect = canvas.getBoundingClientRect();
    function clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }

    x = clamp(x, 0, canvasRect.width - width);
    y = clamp(y, 0, canvasRect.height - height);

    const elementData = {
        id,
        type,
        x,
        y,
        width,
        height,
        text: type === "text" ? "Text" : "",
        background: type === "rect" ? "#4f46e5" : "transparent"

    };


    state.elements.push(elementData);
    renderElement(elementData);
}

function renderElement(data) {
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
        elem.style.display = "flex";
        elem.style.alignItems = "center";
        elem.style.justifyContent = "center";
        elem.style.fontSize = "16px";
        elem.style.color = "#000";
    }

    canvas.appendChild(elem);
}


document.body.addEventListener('click', (e) => {
    if (!e.target.classList.contains("icon")) return;
    const toolName = e.target.parentElement.dataset.name;

    if (toolName === "shape") {
        createElement("rect");
    }
    if (toolName === "text") {
        createElement("text");
    }

})