const canvas = document.getElementById("canvas");

const state = {
    elements: [],
    selectedId: null
};

let idCounter = "";

// * generate unique ID
const generateId = () => {
    idCounter = crypto.randomUUID();
    return idCounter;
};

const clamp = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
};

const createElement = (type) => {
    const id = generateId();
    
    const width = type === "text" ? 120 : 100;
    const height = type === "text" ? 40 : 100;
    let x = 50;
    let y = 50;

    const canvasRect = canvas.getBoundingClientRect();

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

const renderElement = (data) => {
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

    elem.addEventListener("click", (e) => {
        e.stopPropagation();
        selectElement(data.id);
    });

    canvas.appendChild(elem);
}

function selectElement(id) {
    // Deselect previous
    if (state.selectedId) {
        const prevSelected = canvas.querySelector(`.element[data-id='${state.selectedId}']`);

        if (prevSelected) prevSelected.classList.remove("selected");
    }

    // Select new
    const currentSelected = canvas.querySelector(`.element[data-id='${id}']`);
    if (currentSelected) {
        currentSelected.classList.add("selected");
        state.selectedId = id;
    } else {
        state.selectedId = null;
    }
}

const deselectElement = (e) => {
    if (!state.selectedId) return;

    const current = document.querySelector(`.element[data-id='${state.selectedId}']`);
    if (current) current.classList.remove("selected");
    state.selectedId = null;
};


document.body.addEventListener('click', (e) => {
    if (!e.target.classList.contains("icon")) return;
    const toolName = e.target.parentElement.dataset.name;

    if (toolName === "shape") {
        createElement("rect");
    }
    else if (toolName === "text") {
        createElement("text");
    }
})
canvas.addEventListener('click', deselectElement);