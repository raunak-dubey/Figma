import { state } from "../core/state.js";

export const exportJSON = () => {
    const data = JSON.stringify(state.elements, null, 2);
    downloadFile(data, "design.json", "application/json");
};

export const exportHTML = () => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <title>Exported Design</title>
        </head>
        <body>
        <div style="
            position: relative;
            width: 800px;
            height: 600px;
            background: #f3f4f6;
        ">
        ${state.elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map(renderElementHTML)
            .join("")
        }
        </div>
        </body>
        </html>
    `.trim();

    downloadFile(html, "design.html", "text/html");
};

const renderElementHTML = (elem) => {
    const baseStyle = `
        position: absolute;
        left: ${elem.x}px;
        top: ${elem.y}px;
        width: ${elem.width}px;
        height: ${elem.height}px;
        transform: rotate(${elem.rotation}deg);
        z-index: ${elem.zIndex};
    `;

    if (elem.type === "rect") {
        return `<div style="${baseStyle} background:${elem.background};"></div>`;
    }

    if (elem.type === "text") {
        return `<div style="
            ${baseStyle}
            color: ${elem.color};
            display: flex;
            align-items: center;
            justify-content: center;
        ">${escapeHTML(elem.text)}</div>`;
    }

    return "";
};

const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
};

const escapeHTML = (str) =>
    str.replace(/[&<>"']/g, m => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[m])
    );