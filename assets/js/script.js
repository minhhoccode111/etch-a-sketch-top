console.log("Hello, World!");

const DEFAULT_PEN_COLOR = "#000000";
const DEFAULT_BACKGROUND_COLOR = "#ffffff";
const DEFAULT_GRID_SIZE = 24;
const DEFAULT_TRANSPARENT_COLOR = "transparent";

window.onload = () => {
  // createGridItems(DEFAULT_GRID_SIZE);
  setBgColor(DEFAULT_BACKGROUND_COLOR);
};

let penColor = DEFAULT_PEN_COLOR;
let bgColor = DEFAULT_BACKGROUND_COLOR;
let gridSize = DEFAULT_GRID_SIZE;

function setPenColor(value = DEFAULT_PEN_COLOR) {
  penColor = value;
}
function setBgColor(value) {
  bgColor = value;
  board.style.backgroundColor = bgColor;
}
function setGridSize(value) {
  gridSize = value;
}

let isDrawing = true;
let isEraserOn = false;
let isRainbowOn = false;
let isGrabOn = false;
let isBordered = false;

let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

const penColorPicker = document.querySelector("#color-pen");
const bgColorPicker = document.querySelector("#color-bg");
const sizeInput = document.querySelector("#myRange");
const board = document.querySelector("#board");
const resetBtn = document.querySelector("#btn-reset");
const eraserBtn = document.querySelector("#btn-eraser");
const rainbowBtn = document.querySelector("#btn-rainbow");
const borderBtn = document.querySelector(".btn-border");
const mode = document.querySelector(".mode");
const grabBtn = document.querySelector("#btn-grab");
const output = document.querySelector(".show-grid-size");

penColorPicker.oninput = (e) => setPenColor(e.target.value);
bgColorPicker.oninput = (e) => setBgColor(e.target.value);
sizeInput.onchange = (e) => changeGridSize(e.target.value);
eraserBtn.onclick = () => eraserBtnClickedSetMode();
rainbowBtn.onclick = () => rainbowBtnClickedSetMode();
// resetBtn.onclick = () => reloadGrid();

function eraserBtnClickedSetMode() {
  if (isEraserOn == false) {
    isEraserOn = true;
    //when this button is off and we click it we turn it on and turn all off
    isDrawing = false;
    isRainbowOn = false;
    isGrabOn = false;
  } else if (isEraserOn == true) {
    isDrawing = true;
    //when this button is already on and we click it, we turn it off and turn back the normal drawing feature
    isEraserOn = false;
    isRainbowOn = false;
    isGrabOn = false;
  }
}

function rainbowBtnClickedSetMode() {
  if (isRainbowOn == false) {
    isRainbowOn = true;
    //when this button is off and we click it we turn it on and turn all off
    isEraserOn = false;
    isDrawing = false;
    isGrabOn = false;
  } else if (isRainbowOn == true) {
    isDrawing = true;
    //when this button is already on and we click it, we turn it off and turn back the normal drawing feature
    isEraserOn = false;
    isRainbowOn = false;
    isGrabOn = false;
  }
}

function changeGridSize(value) {
  changeOutput(value);
  if (value >= 1 && value <= 64) {
    setGridSize(value);
    reloadGrid();
  }
}

function changeOutput(value) {
  if (value >= 1 && value <= 64) {
    output.innerHTML = `Grid Size: ${value}x${value}`;
  } else {
    output.textContent = "Only 1 - 64 is allowed";
  }
}

function reloadGrid() {
  setBgColor(bgColor);
  deleteGridItems();
  createGridItems(gridSize);
}

function deleteGridItems() {
  board.innerHTML = "";
}

function createGridItems(size) {
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("items");
    div.setAttribute("draggable", "false"); //can't be grabbed
    div.style.backgroundColor = DEFAULT_TRANSPARENT_COLOR; //transparent notColored
    borderBtn.addEventListener("click", () => {
      if (isBordered == false) {
        isBordered = true;
        div.classList.toggle("border-tl");
        board.classList.toggle("border-rb");
      } else if (isBordered == true) {
        isBordered = false;
        div.classList.toggle("border-tl");
        board.classList.toggle("border-rb");
      }
    });
    resetBtn.addEventListener("click", () => {
      div.style.backgroundColor = "transparent";
    });
    div.addEventListener("mouseover", colorDiv);
    div.addEventListener("mousedown", colorDiv);
    board.appendChild(div);
  }
}
function colorDiv(e) {
  if (e.type === "mouseover" && !mousedown) return;
  if (isDrawing == true) {
    if (mousedown) {
      e.target.style.backgroundColor = penColor;
      mode.textContent = "Status: coloring";
    } else {
      mode.textContent = "Status: Mousedown to color";
    }
  } else if (isEraserOn == true) {
    if (mousedown) {
      mode.textContent = "Status: doing eraser";
      e.target.style.backgroundColor = DEFAULT_TRANSPARENT_COLOR;
    } else {
      mode.textContent = "Status: Mousedown to eraser";
    }
  } else if (isRainbowOn == true) {
    if (mousedown) {
      mode.textContent = "Status: doing rainbow";
      e.target.style.backgroundColor = `rgb(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )})`;
    } else {
      mode.textContent = "Status: Mousedown to draw rainbow";
    }
  }
}
createGridItems(52); //FIXME:remember to change back to default value(24)

// ##############  STYLING BUTTONS  ###############
// ##############  STYLING BUTTONS  ###############
// ##############  STYLING BUTTONS  ###############
// ##############  STYLING BUTTONS  ###############
// ##############  STYLING BUTTONS  ###############
const toggleBtn = document.querySelectorAll(".btn");
function removeToggle() {
  toggleBtn.forEach((btn) => {
    btn.classList.remove("btn-toggle");
  });
} //this function remove class .btn-toggle from every button
toggleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn-toggle")) {
      btn.classList.toggle("btn-toggle");
      // if we click a button that already contained class .btn-toggle then we just toggle it again
    } else {
      removeToggle();
      btn.classList.toggle("btn-toggle");
      // but if we click a button that not contains class .btn-toggle then we first remove the class .btn-toggle from others the we toggle the one have been clicked
    }
  });
});
//specific border button
borderBtn.addEventListener("click", () => {
  borderBtn.classList.toggle("btn-toggle");
});
