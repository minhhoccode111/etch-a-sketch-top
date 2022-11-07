console.log("Hello, World!");
// interactive UI with JS
//1. toggle buttons (not contain toggle-grid-btn)
const toggleBtn = document.querySelectorAll(".btn");
const removeToggle = () => {
  toggleBtn.forEach((btn) => {
    btn.classList.remove("btn-toggle");
  });
}; //remove class .btn-toggle from every button
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
//1.2 toggle grid layout buttons specific to other buttons
const gridBorder = document.querySelector("#btn-toggle-border");
gridBorder.addEventListener("click", () => {
  gridBorder.classList.toggle("btn-toggle-border");
});
//2. change span of grid size when input is changed
const board = document.querySelector("#board");
const createItemsGrid = (num) => {
  if (num == 0) {
    return;
  } else {
    const div = document.createElement("div");
    board.append(div);

    return createItemsGrid(num - 1);
  }
}; //this function take a number of grid items then create and append to the parent element #board
const deleteItemsGrid = () => {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}; //this function use to delete old items before new new items pass in
const setGridTemplate = (num) => {
  board.style.cssText = `grid-template-columns: repeat(${num},1fr);grid-template-rows: repeat(${num},1fr)`;
}; // this function use to set grid template columns and rows after create items and append to the parent element #board
const sliderInput = () => {
  const output = document.querySelector(".show-grid-size");
  const slider = document.querySelector(".grid-range");
  output.innerHTML = `Grid Size: ${slider.value}x${slider.value}`;
  console.log(slider.value);
  deleteItemsGrid();
  createItemsGrid(slider.value ** 2);
  setGridTemplate(slider.value);
  slider.oninput = function () {
    console.log(this.value);
    deleteItemsGrid();
    createItemsGrid(this.value ** 2);
    setGridTemplate(this.value);
    output.innerHTML = `Grid Size: ${this.value}x${this.value}`;
  }; //small span to show grid size
};
sliderInput();
// interactive UI with JS
