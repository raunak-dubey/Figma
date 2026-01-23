# 🎨 Figma‑Lite Canvas Editor

A lightweight, browser‑based design editor inspired by Figma. This project lets you create, edit, and manage basic shapes and text on a canvas with modern UI, rich keyboard interactions, persistence, and export support — all built using **vanilla HTML, CSS, and JavaScript**.

**🔗 Live Preview:** [https://figma-three-ashy.vercel.app/](https://figma-three-ashy.vercel.app/)

## 🚀 Highlights

* **Undo / Redo / Duplicate** with keyboard shortcuts
* **Rename layers** directly from the Layers panel
* **Smooth interactions** for drag, resize, rotate, and keyboard movement
* **Improved UI & internal logic** with clean separation of concerns
* **💯 Lighthouse Score: 100% in Performance, Accessibility, Best Practices & SEO**

## ✨ Features

### 🧱 Canvas & Elements

* Add **rectangles** and **text elements**
* Drag, resize, and rotate elements
* Precise positioning with keyboard controls
* Layer ordering using **z‑index**
* Inline text editing (double‑click to edit, Enter to save)

### 🧰 Properties Panel

* Width & height controls
* Background color (rectangles)
* Text content & text color (text elements)
* Live updates synced with canvas state

### 🗂 Layers Panel

* View all elements in stacking order
* Active layer highlighting synced with canvas selection
* **Rename layers** (double‑click layer name)
* Reorder layers using up/down controls

### ⌨️ Keyboard Shortcuts

* **Arrow Keys** → Move selected element (5px)
* **Shift + Arrow Keys** → Faster movement (10px)
* **Ctrl + D** → Duplicate selected element
* **Ctrl + Z** → Undo
* **Ctrl + Y** → Redo
* **Delete** → Remove selected element
* **Escape** → Deselect element

Keyboard movement respects canvas boundaries and editing context.

### ♿ Accessibility & Semantics

* Semantic HTML (`header`, `main`, `section`, `aside`)
* ARIA labels for toolbar, panels, and canvas
* Fully keyboard‑operable editor
* **100% Lighthouse Accessibility score**

### 💾 Persistence (localStorage)

* Automatically saves canvas layout
* Restores full design on page refresh
* Layout stored as a simple array of objects

### 📤 Export Options

* **JSON Export** → Download raw layout data
* **HTML Export** → Download a standalone HTML file that visually recreates the design

## 🧩 Project Structure

```text
root/
├── index.html             # Entry HTML
├── scripts/
│   ├── core/
│   │   ├── state.js          # Global editor state
│   │   ├── persistence.js    # localStorage logic
│   │   └── utils.js          # Shared helpers (history, math, rendering)
│   │
│   ├── elements/
│   │   ├── elementData.js     # Element data model
│   │   ├── elementRender.js   # DOM rendering logic
│   │   ├── elementUpdater.js  # Style & text updates
│   │   └── elementSelection.js
│   │
│   ├── interactions/
│   │   ├── keyboard.js        # Shortcuts, undo/redo, duplicate
│   │   ├── drag.js
│   │   ├── resize.js
│   │   └── rotate.js
│   │
│   ├── ui/
│   │   ├── layers.js          # Layers panel + renaming
│   │   ├── properties.js      # Properties panel UI
│   │   ├── export.js          # JSON / HTML export
│   │   ├── canvas.js
│   │   └── toolbar.js
│   │
│   └── app.js                 # App bootstrap & wiring
│
├── styles/
|   ├── style.css
|   └── style.min.css
|
└── assets/              # All images and assets
```

## 🛠 Tech Stack

* **HTML5** — Semantic structure
* **CSS3** — Modern design system with CSS variables
* **JavaScript (ES Modules)** — Modular, framework‑free architecture
* **localStorage** — Persistence layer

**No frameworks. No build tools. No dependencies.**

## 📦 Getting Started

1. Clone the repository

```bash
git clone https://github.com/raunak-dubey/Figma.git
```

2. Move into the project directory

```bash
cd Figma
```

3. Run locally

* Open `index.html` directly in the browser

## 🎯 Design Goals

* Keep the codebase **small, readable, and modular**
* Avoid over‑engineering while maintaining clarity
* Prioritize **keyboard UX and accessibility**
* Recreate core Figma‑like behaviors using plain JavaScript

## 🧠 Learnings

This project explores real‑world editor fundamentals:

* State‑driven rendering
* Undo / redo history management
* DOM‑based interaction systems
* Accessibility‑first UI design
* Clean separation between data, UI, and interactions

## 🤝 Contributing

Contributions, ideas, and improvements are welcome.
Feel free to open an issue or submit a PR.

## 📄 License

MIT License — free to use, modify, and distribute.