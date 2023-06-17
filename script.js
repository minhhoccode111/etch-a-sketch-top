// console.log("Hello, World! From script.js");

// #################### CELL #################### //
function Cell(isRightest, isBottomest) {
  const hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
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

  const random = () => {
    const rdChar = () => hex[Math.floor(Math.random() * hex.length)];
    setColor(
      "#" + rdChar() + rdChar() + rdChar() + rdChar() + rdChar() + rdChar()
    );
  };

  const lighten = () => {
    if (_color === "transparent") {
      setColor(color.bg());
      return;
    }
    let lightenColor = _color.split("").reduce((total, current) => {
      console.log(typeof current);
      if (current === "#" || current === "f") {
        return total + current;
      }
      current = hex[hex.indexOf(current) + 1];
      return total + current;
    }, "");
    setColor(lightenColor);
  };
  const shaden = () => {
    if (_color === "transparent") {
      setColor(color.bg());
      return;
    }
    let shadenColor = _color.split("").reduce((total, current) => {
      console.log(typeof current);
      if (current === "#" || current === "0") {
        return total + current;
      }
      current = hex[hex.indexOf(current) - 1];
      return total + current;
    }, "");
    setColor(shadenColor);
  };

  const toggleBorder = () => {
    _div.style.borderColor =
      _div.style.borderColor === "gray" ? "transparent" : "gray";
  };

  return {
    toggleBorder,
    getColor,
    setColor,
    lighten,
    shaden,
    random,
    getDiv,
  };
}

// #################### UI #################### //
const ui = (() => {})();

// #################### COLOR #################### //
const color = (() => {
  const inputPen = document.getElementById("input__pen");
  const inputBg = document.getElementById("input__bg");

  const pen = () => inputPen.value;
  const setPen = (v) => (inputPen.value = v);
  const bg = () => inputBg.value;
  return {
    setPen,
    pen,
    bg,
  };
})();

// #################### BOARD #################### //
const board = (() => {
  const grid = document.getElementById("main__grid");

  let eleArr = [];
  let mode = "normal";
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
    for (const el of eleArr) {
      grid.appendChild(el.getDiv());
    }
  };

  const setMode = (m) => {
    for (const el of eleArr) {
      if (m === "clear") {
        el.setColor("transparent");
        continue;
      }
      if (m === "border") {
        el.toggleBorder();
        continue;
      }
      //else mode = m and addEventListener base on mode
      mode = m;
      el.getDiv().addEventListener("mouseover", (e) => {
        switch (mode) {
          case "normal":
            el.setColor(color.pen());
            break;
          case "eraser":
            el.setColor("transparent");
            break;
          case "rainbow":
            el.random();
            break;
          case "lighten":
            el.lighten();
            break;
          case "shaden":
            el.shaden();
            break;
          case "grabber":
            grabber(el);
            break;
          case "filler":
            filler(el);
            break;
        }
      });
    }
  };

  const grabber = (element) => {
    //cancel mouseover event
    element.getDiv().onmouseover = null;
    //click a cell and change pen's color to cell's color (color picker)
    element.getDiv().addEventListener("click", (e) => {
      if (element.getColor() !== "transparent") {
        color.setPen(element.getColor());
        setMode("normal"); //then back to normal
      }
    });
  };

  const filler = () => {};

  const boardBg = (v) => {
    grid.style.backgroundColor = v;
  };

  return {
    clickedFalse,
    clickedTrue,
    createGrid,
    boardBg,
    setMode,
  };
})();

// #################### HANDLER #################### //
const handler = (() => {
  const bg = document.getElementById("input__bg");
  const ok = document.getElementById("button__size");
  const pen = document.getElementById("input__pen");
  const grid = document.getElementById("main__grid");
  const size = document.getElementById("input__size");
  const icon = document.getElementById("header__title__icon");
  const modes = document.querySelectorAll("[data-mode]");

  bg.addEventListener("input", (e) => {
    board.boardBg(color.bg());
  });

  pen.addEventListener("change", (e) => {
    board.setMode("normal");
  });

  modes.forEach((el) =>
    el.addEventListener("click", (e) => {
      board.setMode(e.target.textContent);
    })
  );

  ok.addEventListener("click", () => {
    if (+size.value <= 80 && +size.value >= 2) {
      board.createGrid(+size.value);
      board.setMode("normal");
    }
  });

  grid.addEventListener("mousedown", board.clickedTrue);
  grid.addEventListener("mouseup", board.clickedFalse);

  icon.addEventListener("click", (e) => {
    alert("Enter to set the size input and Space to clear the board");
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "Enter") ok.click();
    if (e.code === "Space") board.setMode("clear");
  });

  window.addEventListener("DOMContentLoaded", () => {
    board.createGrid(24);
    board.setMode("normal");
    // board.createGrid(+size.value);
  });
})();
