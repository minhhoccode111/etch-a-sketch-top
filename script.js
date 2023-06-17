// console.log("Hello, World! From script.js");

// #################### CELL #################### //
function Cell(isRightest, isBottomest) {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
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
    const randomR0 = hex[Math.floor(Math.random() * hex.length)];
    const randomR1 = hex[Math.floor(Math.random() * hex.length)];
    const randomG0 = hex[Math.floor(Math.random() * hex.length)];
    const randomG1 = hex[Math.floor(Math.random() * hex.length)];
    const randomB0 = hex[Math.floor(Math.random() * hex.length)];
    const randomB1 = hex[Math.floor(Math.random() * hex.length)];
    setColor(
      "#" + randomR0 + randomR1 + randomG0 + randomG1 + randomB0 + randomB1
    );
  };

  const toggleBorder = () => {
    _div.style.borderColor =
      _div.style.borderColor === "gray" ? "transparent" : "gray";
  };

  return {
    toggleBorder,
    getColor,
    setColor,
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
        return;
      }
      if (m === "border") {
        e.toggleBorder();
        return;
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
        }
      });
    }
  };

  const normalDraw = () => {
    for (let i = 0; i < eleArr.length; i++) {
      const el = eleArr[i];
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
  const rainbow = () => {};

  const border = () => {
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
    clickedFalse,
    clickedTrue,
    normalDraw,
    createGrid,
    rainbow,
    boardBg,
    border,
    eraser,
    clear,
    setMode,
  };
})();

// #################### HANDLER #################### //
const handler = (() => {
  const ok = document.getElementById("button__size");
  const bg = document.getElementById("input__bg");
  const pen = document.getElementById("input__pen");
  const size = document.getElementById("input__size");
  const grid = document.getElementById("main__grid");
  const clear = document.getElementById("button__clear");
  const border = document.getElementById("button__border");
  const eraser = document.getElementById("button__eraser");
  const normal = document.getElementById("button__normal");
  const rainbow = document.getElementById("button__rainbow");
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
