# 🎨 Figma‑Lite Canvas Editor

A lightweight, browser‑based design editor inspired by Figma. This project lets you create, edit, and manage basic shapes and text on a canvas with modern UI, keyboard accessibility, persistence, and export support — all built using **vanilla HTML, CSS, and JavaScript**.

**🔗 Live Preview:** *https://figma-three-ashy.vercel.app/*

## ✨ Features

### 🧱 Canvas & Elements

* Add **rectangles** and **text elements**
* Drag, resize, and rotate elements
* Layer ordering using **z‑index**
* Inline text editing (double‑click to edit, Enter to save)

### 🧰 Properties Panel

* Width & height controls
* Background color (rectangles)
* Text content & text color (text elements)
* Live updates synced with canvas

### 🗂 Layers Panel

* View all elements in stacking order
* Active layer highlighting
* Syncs with canvas selection

### ⌨️ Keyboard & Accessibility

* **Arrow keys** → Move selected element (5px)
* **Shift + Arrow keys** → Faster movement (10px)
* **Delete** → Remove selected element
* **Escape** → Deselect element
* Keyboard movement respects canvas boundaries
* Proper semantic HTML (`header`, `main`, `section`, `aside`)
* ARIA labels for toolbar & canvas

### 💾 Persistence (localStorage)

* Automatically saves canvas layout
* Restores design on page refresh
* Stores layout as a simple array of objects

### 📤 Export Options

* **JSON Export** → Download raw layout data
* **HTML Export** → Download a standalone HTML file that visually recreates the design

## 🧩 Project Structure

```text
src/
├── scripts/
|    ├── core/
|    |   ├── state.js          # Global editor state
|    |   ├── persistence.js    # localstorage
|    |   └── utils.js          # Shared helper functions
|    |
|    |
|    ├── elements/
|    |    ├── elementData.js     # Element data model
|    |    ├── elementRender.js   # DOM rendering logic
|    |    ├── elementUpdater.js  # Style & text updates
|    |    └── elementSelection.js
|    |
|    ├── interactions/
|    |    ├── keyboard.js
|    |    ├── drag.js
|    |    ├── resize.js
|    |    └── rotate.js
|    |
|    ├── ui/
|    |   ├── layers.js        # Layers panel rendering
|    |   ├── properties.js    # Properties panel UI
|    |   ├── export.js
|    |   ├── canvas.js
|    |   └── toolbar.js
│    |
|    └── app.js                # App bootstrap & wiring
└── style.css             # Global styles
index.html            # Entry HTML
```

## 🛠 Tech Stack

* **HTML5** — Semantic structure
* **CSS3** — Modern design system with CSS variables
* **JavaScript (ES Modules)** — Modular, framework‑free architecture
* **localStorage** — Persistence layer

*No frameworks. No build tools. No dependencies.*

## 📦 Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/raunak-dubey/Figma.git
   ```

2. Open the project

   ```bash
   cd figma
   ```

3. Run locally

   * Open `index.html` directly

## 🎯 Design Goals

* Keep the codebase **small & readable**
* Follow **separation of concerns** without over‑engineering
* Prioritize **accessibility & keyboard UX**
* Match modern design tool behavior with minimal complexity

## 🧠 Learnings

This project focuses on real‑world editor fundamentals:

* State‑driven UI updates
* DOM‑based rendering systems
* Accessibility‑first interactions
* Practical modular architecture

## 🤝 Contributing

Contributions, ideas, and improvements are welcome!
Feel free to open an issue or submit a PR.

## 📄 License

MIT License — free to use, modify, and distribute.