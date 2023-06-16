// console.log("Hello, World! From script.js");

// #################### CELL #################### //
function Cell(isRightest, isBottomest) {
  let _color = "transparent";

  const _div = document.createElement("div");
  _div.style.backgroundColor = "transparent";
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
    pen,
    bg,
  };
})();

// #################### BOARD #################### //
const board = (() => {
  const grid = document.getElementById("main__grid");

  let eleArr = [];
  let clicked = false;

  const clickedTrue = () => (clicked = true);
  const clickedFalse = () => (clicked = false);

  const createGrid = (n) => {
    grid.innerHTML = "";
    eleArr = [];
    for (let i = 0; i < n * n; i++) {
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
  };

  const normalDraw = () => {
    for (let i = 0; i < eleArr.length; i++) {
      const el = eleArr[i];
      grid.appendChild(el.getDiv());
      el.getDiv().addEventListener("mouseover", () => {
        el.setColor(color.pen());
      });
    }
  };

  const eraser = () => {
    for (const el of eleArr) {
      el.getDiv().addEventListener("mouseover", () => {
        el.setColor("transparent");
      });
    }
  };

  const toggleBorder = () => {
    for (const el of eleArr) {
      el.toggleBorder();
    }
  };

  const clear = () => {
    for (const el of eleArr) {
      el.setColor("transparent");
    }
  };

  const boardBg = (v) => {
    grid.style.backgroundColor = v;
  };

  return {
    toggleBorder,
    createGrid,
    normalDraw,
    clickedTrue,
    clickedFalse,
    clear,
    boardBg,
    eraser,
  };
})();

// #################### HANDLER #################### //
const handler = (() => {
  const size = document.getElementById("input__size");
  const border = document.getElementById("button__border");
  const ok = document.getElementById("button__size");
  const grid = document.getElementById("main__grid");
  const bg = document.getElementById("input__bg");
  const pen = document.getElementById("input__pen");
  const clear = document.getElementById("button__clear");
  const eraser = document.getElementById("button__eraser");
  const normal = document.getElementById("button__normal");

  bg.addEventListener("input", (e) => {
    board.boardBg(color.bg());
  });

  pen.addEventListener("change", board.normalDraw);

  border.addEventListener("click", board.toggleBorder);

  clear.addEventListener("click", board.clear);

  eraser.addEventListener("click", board.eraser);

  normal.addEventListener("click", board.normalDraw);

  ok.addEventListener("click", () => {
    if (+size.value <= 80 && +size.value >= 2) {
      board.createGrid(+size.value);
      board.normalDraw();
    }
  });

  grid.addEventListener("mousedown", board.clickedTrue);
  grid.addEventListener("mouseup", board.clickedFalse);

  window.addEventListener("keyup", (e) => {
    if (e.key === "Enter") ok.click();
    if (e.code === "Space") clear.click();
  });

  window.addEventListener("DOMContentLoaded", () => {
    board.createGrid(24);
    board.normalDraw();
    // board.createGrid(+size.value);
  });
})();
