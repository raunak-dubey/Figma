export const enableTextEditing = (elem, data) => {
    elem.setAttribute("contenteditable", "true");
    elem.focus();

    const range = document.createRange();
    range.selectNodeContents(elem);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    const finishEditing = (save) => {
        elem.removeAttribute("contenteditable");

        if (save) {
            data.text = elem.textContent.trim() || "Text";
            elem.textContent = data.text;
        } else {
            elem.textContent = data.text;
        }

        cleanup();
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            finishEditing(true);
        }

        if (e.key === "Escape") {
            e.preventDefault();
            finishEditing(false);
        }
    };

    const onBlur = () => finishEditing(true);

    const cleanup = () => {
        elem.removeEventListener("keydown", onKeyDown);
        elem.removeEventListener("blur", onBlur);
    };

    elem.addEventListener("keydown", onKeyDown);
    elem.addEventListener("blur", onBlur);
};