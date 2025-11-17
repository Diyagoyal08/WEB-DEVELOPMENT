 // ===== GET DOM ELEMENTS =====
const container = document.getElementById("container");
const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraseBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

// ===== GLOBAL VARIABLES =====
let currentMode = "color";   // color / rainbow / eraser

// ===== GRID CREATION =====
function makeGrid(size) {
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    container.appendChild(cell);
  }
}

// default grid
makeGrid(16);

// ===== SLIDER =====
sizeSlider.addEventListener("input", () => {
  sizeValue.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
});

sizeSlider.addEventListener("change", () => {
  makeGrid(sizeSlider.value);
});

// ===== BUTTONS & MODES =====
function activateButton(button) {
  colorBtn.classList.remove("active");
  rainbowBtn.classList.remove("active");
  eraseBtn.classList.remove("active");
  clearBtn.classList.remove("active"); // optional: show highlight on Clear
  button.classList.add("active");
}

// Mode buttons
colorBtn.addEventListener("click", () => {
  currentMode = "color";
  activateButton(colorBtn);
});

rainbowBtn.addEventListener("click", () => {
  currentMode = "rainbow";
  activateButton(rainbowBtn);
});

eraseBtn.addEventListener("click", () => {
  currentMode = "eraser";
  activateButton(eraseBtn);
});

// Clear button
clearBtn.addEventListener("click", () => {
  const cells = container.querySelectorAll(".grid-cell");
  cells.forEach(cell => cell.style.backgroundColor = "white");
  activateButton(clearBtn);
});

// ===== DRAWING LOGIC =====
container.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("grid-cell")) return;

  if (currentMode === "color") {
    e.target.style.backgroundColor = colorPicker.value;
  } else if (currentMode === "rainbow") {
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  }
});

// Draw single cell on click (optional)
container.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("grid-cell")) return;

  if (currentMode === "color") {
    e.target.style.backgroundColor = colorPicker.value;
  } else if (currentMode === "rainbow") {
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  }
});
