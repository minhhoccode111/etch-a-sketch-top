// console.log("Hello, World! From script.js");

// #################### CELL #################### //
function Cell(isRightest, isBottomest) {
  let _color = "transparent";

  const _div = document.createElement("div");
  _div.style.backgroundColor = "red";
  _div.style.borderWidth = "0 1px 1px 0";
  _div.style.borderColor = "gray";
  _div.style.borderStyle = "solid";

  if (isRightest) {
    _div.style.borderTopWidth = "0";
  }
  if (isBottomest) {
    _div.style.borderBottomWidth = "0";
  }

  const getDiv = () => _div;

  const getColor = () => _color;

  const setColor = (c) => {
    _color = c;
    _div.style.backgroundColor = _color;
  };

  const toggleBorder = () => {
    _div.style.borderColor === "gray"
      ? _div.style.borderColor === "transparent"
      : _div.style.borderColor === "gray";
  };

  return {
    toggleBorder,
    getColor,
    setColor,
    getDiv,
  };
}

// #################### BOARD #################### //
const board = (() => {
  const grid = document.getElementById("main__grid");

  let eleArr = [];

  const createGrid = (n) => {
    for (let i = n * n - 1; i >= 0; i--) {
      if ((i + 1) % n === 0) {
        //except last index
        eleArr[i] = Cell(true, false); //the right-est
        continue;
      }
      if (i >= n * n - n) {
        eleArr[i] = Cell(false, true); //the bottom-est
        continue;
      }
      eleArr[i] = Cell(false, false);
    }
    eleArr[n * n - 1] = Cell(true, true);

    grid.style.gridTemplate = `repeat(${n},1fr)/repeat(${n},1fr)`;

    for (let i = 0; i < eleArr.length; i++) {
      grid.appendChild(eleArr[i].getDiv());
    }
  };

  const toggleBorder = () => {
    for (const e of eleArr) {
      e.toggleBorder();
    }
    for (let i = 0; i < eleArr.length; i++) {
      grid.appendChild(eleArr[i].getDiv());
    }
    // let children = grid.querySelectorAll("div");
    // children.forEach((child) => child.toggleBorder());
    // for (const el of eleArr) {
    //   grid.appendChild(el.toggleBorder().getDiv());
    // }
  };

  return {
    createGrid,
    toggleBorder,
  };
})();

// #################### HANDLER #################### //
const handler = (() => {
  const size = document.getElementById("input__size");
  const pen = document.getElementById("input__pen");
  const bg = document.getElementById("input__bg");

  const border = document.getElementById("button__border");
  const ok = document.getElementById("button__size");

  border.addEventListener("click", (e) => {
    board.toggleBorder();
  });

  ok.addEventListener("click", () => {
    board.createGrid(+size.value);
  });

  window.addEventListener("DOMContentLoaded", () => {
    board.createGrid(+size.value);
  });
})();
