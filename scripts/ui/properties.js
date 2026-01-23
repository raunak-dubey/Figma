import { state } from "../core/state.js";
import { updateElementStyle, updateElementText } from "../elements/elementUpdater.js";

const layersPanel = document.getElementById("layersPanel");
const propertiesPanel = document.getElementById("propertiesPanel");
const content = document.getElementById("propertiesContent");

export const showPropertiesPanel = (canvas) => {
    const data = state.elements.find(elem => elem.id === state.selectedId);
    if (!data) {
        hidePropertiesPanel();
        return;
    };

    renderProperties(data, canvas);
};

export const hidePropertiesPanel = () => {
    if (!content) return;
    content.innerHTML = '<p class="empty-state">Select an element to edit properties</p>';
};

const renderProperties = (data, canvas) => {
    if (!content) return;

    content.innerHTML = "";

    numberField("Width", data.width, v => {
        data.width = +v;
        updateElementStyle(data, canvas);
    });

    numberField("Height", data.height, v => {
        data.height = +v;
        updateElementStyle(data, canvas);
    });

    if (data.type === "rect") {
        const normalizeHex = (color) => {
            if (!color) return "#000000";
            if (color.startsWith("#")) return color;
            return "#000000";
        };

        colorField("Background", normalizeHex(data.background), v => {
            data.background = v;
            updateElementStyle(data, canvas);
        });
    }

    if (data.type === "text") {
        textField("Text", data.text, v => {
            data.text = v;
            updateElementText(data, canvas);
        });

        colorField("Text Color", data.color || "#111827", v => {
            data.color = v;
            updateElementStyle(data, canvas);
        });
    }
};

const numberField = (label, value, onChange) => createField(label, "number", value, onChange);

const colorField = (label, value, onChange) => createField(label, "color", value, onChange);

const textField = (label, value, onChange) => createField(label, "text", value, onChange);

const createField = (label, type, value, onChange) => {
    const wrapper = document.createElement("div");
    wrapper.className = "property";

    const input = document.createElement("input");
    input.type = type;

    if (type === "color") {
        input.value = value && value.startsWith("#") ? value : "#000000";
        input.defaultValue = input.value;
    } else {
        input.value = value;
    }

    input.addEventListener("input", e => onChange(e.target.value));

    const labelEl = document.createElement("label");
    labelEl.textContent = label;

    wrapper.appendChild(labelEl);
    wrapper.appendChild(input);
    content.appendChild(wrapper);
};