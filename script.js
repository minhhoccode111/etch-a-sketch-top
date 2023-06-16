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
    _div.style.borderRightWidth = "0";
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
    _div.style.borderColor =
      _div.style.borderColor === "gray" ? "transparent" : "gray";
  };

  return {
    toggleBorder,
    getColor,
    setColor,
    getDiv,
  };
}

// #################### COLOR #################### //
const color = (() => {
  const inputPen = document.getElementById("input__pen");
  const inputBg = document.getElementById("input__bg");

  const pen = () => inputPen.value;
  const bg = () => inputBg.value;
  return {
    bg,
    pen,
  };
})();

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
      const el = eleArr[i];
      el.getDiv().addEventListener("mouseover", () => {
        el.setColor(color.pen());
      });
      grid.appendChild(el.getDiv());
    }
  };

  const toggleBorder = () => {
    for (const el of eleArr) {
      el.toggleBorder();
    }
  };

  return {
    createGrid,
    toggleBorder,
  };
})();

// #################### HANDLER #################### //
const handler = (() => {
  const size = document.getElementById("input__size");
  const border = document.getElementById("button__border");
  const ok = document.getElementById("button__size");

  border.addEventListener("click", (e) => {
    board.toggleBorder();
  });

  ok.addEventListener("click", () => {
    board.createGrid(+size.value);
  });

  window.addEventListener("DOMContentLoaded", () => {
    board.createGrid(24);
    // board.createGrid(+size.value);
  });
})();