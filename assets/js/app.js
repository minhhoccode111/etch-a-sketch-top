console.log("Hello, World!");
// ******** INITIALIZE VARIABLES **************
let color = "transparent";
let colorPen = "black";
let colorBg = "";
let draw = true;

const board = document.querySelector("#board");

//1. change span of grid size when input is changed
function createItemsGrid(num) {
  for (let i = 0; i < num ** 2; i++) {
    const div = document.createElement("div");
    div.classList.add("items");
    div.setAttribute("draggable", "false"); //can't be grabbed
    div.style.backgroundColor = color;
    div.addEventListener("mouseover", () => {
      if (draw) {
        div.style.backgroundColor = colorPen;
      } else {
      }
    });
    board.style.cssText = `grid-template-columns: repeat(${num},1fr);grid-template-rows: repeat(${num},1fr)`;
    board.insertAdjacentElement("beforeend", div);
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
  createItemsGrid(slider.value); //use **2 || slider.value*slider.value
  // setGridTemplate(slider.value);
  slider.oninput = function () {
    deleteItemsGrid();
    createItemsGrid(this.value);
    //these function create #board 's items
    output.innerHTML = `Grid Size: ${this.value}x${this.value}`;
  }; //small span to show grid size
}
sliderInput();

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
const resetBtn = document.querySelector("#btn-reset");
resetBtn.addEventListener("mouseenter", () => {
  resetBtn.classList.toggle("btn-toggle");
});
resetBtn.addEventListener("mouseleave", () => {
  resetBtn.classList.toggle("btn-toggle");
});
resetBtn.addEventListener("click", () => {
  sliderInput();
});
//################################################################
// features functions
