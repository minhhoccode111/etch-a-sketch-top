console.log("Hello, World!");
// ******** INITIALIZE VARIABLES **************
let color = "transparent";
let colorBox = "";
let colorPen = "black";
let colorBg = "white";
let isDrawing = true;
let draw = false;
let isEraserOn = false;
let eraser = false;
let isRainbowOn = false;
let rainbow = false;
let isGrabOn = false;
let grab = false;

const board = document.querySelector("#board");
const resetBtn = document.querySelector("#btn-reset");
const eraserBtn = document.querySelector("#btn-eraser");
const rainbowBtn = document.querySelector("#btn-rainbow");
const grabBtn = document.querySelector("#btn-grab");
let divs = board.querySelectorAll("div");
const mode = document.querySelector(".mode");
const body = document.querySelector("body");

// 3 functions to set colors onchange
function changeColorPen(value) {
  colorPen = value;
}
function colorBgOnchange(value) {
  colorBg = value;
  colorBgSet(value);
}
function colorBgSet(value) {
  board.style.backgroundColor = value;
}
// 3 functions to set colors onchange
//################################################################
// some buttons eventListeners

// some buttons eventListeners
function whatMode() {
  eraserBtn.addEventListener("click", () => {
    if (isDrawing && isEraserOn == false) {
      isDrawing = false;
      isEraserOn = true;
    } else if (isDrawing == false && isEraserOn == true) {
      isDrawing = true;
      isEraserOn = false;
    }
  });
  if (isDrawing) {
    body.addEventListener("mousedown", () => {
      draw = true;
      mode.textContent = "Mode: coloring";
    });
    body.addEventListener("mouseup", () => {
      draw = false;
      mode.textContent = "Mode: Not coloring";
    });
  } else if (isEraserOn) {
    body.addEventListener("mousedown", () => {
      draw = true;
      mode.textContent = "Mode: do eraser-ing";
    });
    body.addEventListener("mouseup", () => {
      draw = false;
      mode.textContent = "Mode: Not do eraser-ing";
    });
  }
}
whatMode();
//1. change span of grid size when input is changed
function createItemsGrid(num) {
  for (let i = 0; i < num ** 2; i++) {
    const div = document.createElement("div");
    div.classList.add("items"); //can't be selected
    div.setAttribute("draggable", "false"); //can't be grabbed
    div.style.backgroundColor = color; //transparent color
    resetBtn.addEventListener("click", () => {
      div.style.backgroundColor = color;
    });
    div.addEventListener("mouseover", colorDiv);
    board.style.cssText = `grid-template-columns: repeat(${num},1fr);grid-template-rows: repeat(${num},1fr);background-color=${colorBg}`;
    board.insertAdjacentElement("beforeend", div);
    colorBgSet(colorBg);
  }
} //this function take a number of grid items then create and append to the parent element #board
function colorDiv() {
  if (isDrawing && draw) {
    this.style.backgroundColor = colorPen;
  } else if (isEraserOn && draw) {
    this.style.backgroundColor = "transparent";
  }
}
createItemsGrid(24);
function deleteItemsGrid() {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
} //this function use to delete old items before new new items pass in
function sliderInput() {
  const output = document.querySelector(".show-grid-size");
  const slider = document.querySelector(".grid-range");
  output.innerHTML = `Grid Size: ${slider.value}x${slider.value}`;
  // colorBgSet(colorBg);
  slider.onchange = function () {
    if (this.value >= 1 && this.value <= 96) {
      colorBgSet(colorBg);
      deleteItemsGrid();
      createItemsGrid(this.value);
      //these function create #board 's items
      output.innerHTML = `Grid Size: ${this.value}x${this.value}`;
    } else {
      output.textContent = "Only 1 - 96 is allowed";
      // alert("Please enter a NUMBER between 1 and 96 right now!");
    }
  }; //small span to show grid size
}
sliderInput();

//#########################################################################
//#########################################################################
//#########################################################################
//#########################################################################
//2. toggle buttons (not contain toggle-grid-btn)
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
