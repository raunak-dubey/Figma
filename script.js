const canvas = document.getElementById("canvas");

const state = {
    elements: [],
    selectedId: null
};

const dragState = {
    isDragging: false,
    startMouseX: 0,
    startMouseY: 0,
    startX: 0,
    startY: 0,
    elementId: null
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

    let width = type === "text" ? 120 : 100;
    let height = type === "text" ? 40 : 100;

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
        rotation: 0,

        text: type === "text" ? "Text" : "",
        background: type === "rect" ? "#4f46e5" : "transparent",
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

    elem.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        selectElement(data.id);

        dragState.isDragging = true;
        dragState.elementId = data.id;

        dragState.startMouseX = e.clientX;
        dragState.startMouseY = e.clientY;
        dragState.startX = data.x;
        dragState.startY = data.y;

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

canvas.addEventListener("click", (e) => {
    if (dragState.isDragging) return;

    if (!e.target.closest(".element")) {
        deselectElement();
    }
});

// * Update Dragging Position
window.addEventListener('mousemove', (e) => {
    if (!dragState.isDragging) return;

    const elementData = state.elements.find(elem => elem.id === dragState.elementId);
    if (!elementData) return;

    const deltaX = e.clientX - dragState.startMouseX;
    const deltaY = e.clientY - dragState.startMouseY;

    const canvasRect = canvas.getBoundingClientRect();

    const newX = dragState.startX + deltaX;
    const newY = dragState.startY + deltaY;

    const clampedX = clamp(newX, 0, canvasRect.width - elementData.width);
    const clampedY = clamp(newY, 0, canvasRect.height - elementData.height);

    elementData.x = clampedX;
    elementData.y = clampedY;

    const elem = canvas.querySelector(`.element[data-id='${elementData.id}']`);
    if (elem) {
        elem.style.left = elementData.x + "px";
        elem.style.top = elementData.y + "px";
    }
});
// * Stop Dragging
window.addEventListener('mouseup', (e) => {
    dragState.isDragging = false;
    dragState.elementId = null;
});