export const state = {
    elements: [],
    selectedId: null
};

export const dragState = {
    isDragging: false,
    startMouseX: 0,
    startMouseY: 0,
    startX: 0,
    startY: 0,
    elementId: null
};

// * Resize State * //
export const resizeState = {
    isResizing: false,
    elementId: null,
    handle: null,
    startMouseX: 0,
    startMouseY: 0,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0
};