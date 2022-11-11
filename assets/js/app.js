console.log("Hello, World!");
// ******** INITIALIZE VARIABLES **************
let color = "transparent";
let colorPen = "black";
let colorBg = "white";
let draw = true;

const board = document.querySelector("#board");
function changeColorPen(value) {
  colorPen = value;
}
function colorBgOnchange(value) {
  colorBg = value;
  colorBgSet(colorBg);
}
function colorBgSet(value) {
  board.style.backgroundColor = value;
}
//1. change span of grid size when input is changed
function createItemsGrid(num) {
  for (let i = 0; i < num ** 2; i++) {
    const div = document.createElement("div");
    div.classList.add("items");
    div.setAttribute("draggable", "false"); //can't be grabbed
    div.style.backgroundColor = color;
    const resetBtn = document.querySelector("#btn-reset");
    resetBtn.addEventListener("click", () => {
      div.style.backgroundColor = color;
      console.log("aa");
    });
    div.addEventListener("mouseover", () => {
      if (draw) {
        div.style.backgroundColor = colorPen;
      } else {
      }
    });
    board.style.cssText = `grid-template-columns: repeat(${num},1fr);grid-template-rows: repeat(${num},1fr);background-color=${colorBg}`;
    board.insertAdjacentElement("beforeend", div);
    colorBgSet(colorBg);
  }
} //this function take a number of grid items then create and append to the parent element #board
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
  createItemsGrid(slider.value); //use **2 || slider.value*slider.value
  slider.onchange = function () {
    if (this.value >= 1 && this.value <= 96) {
      colorBgSet(colorBg);

      deleteItemsGrid();
      createItemsGrid(this.value);
      //these function create #board 's items
      output.innerHTML = `Grid Size: ${this.value}x${this.value}`;
    } else {
      alert("Enter a NUMBER between 1 and 96 right now!");
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
//2.2 toggle grid layout buttons specific to other buttons
//2.2.1 toggle reset button

//################################################################
// features functions
