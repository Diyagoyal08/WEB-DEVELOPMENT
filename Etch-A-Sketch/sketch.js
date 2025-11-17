// Get the grid container element
const grid = document.getElementById('container');
const sizevalue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const container = document.getElementById("container");

function makeGrid(size) {
  container.innerHTML = "";

  const cellSize = 400 / size;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    container.appendChild(cell);
  }
}

// default
makeGrid(16);



slider.addEventListener("input", () => {
  const size = slider.value;
  sizeValue.textContent = `${size} x ${size}`;  // updating the div
  makeGrid(size);
});