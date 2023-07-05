// #################### CELL #################### //
function Cell(isRightest, isBottomest) {
  const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let _color = 'transparent';
  let neighbors;
  const setNeighbors = (v) => (neighbors = v);
  const getNeighbors = () => neighbors;

  const _div = document.createElement('div');
  _div.style.backgroundColor = 'transparent';
  _div.style.borderWidth = '0 1px 1px 0';
  _div.style.borderColor = 'gray';
  _div.style.borderStyle = 'solid';

  if (isRightest) {
    _div.style.borderWidth = '0 0 1px 0';
  }
  if (isBottomest) {
    _div.style.borderWidth = '0 1px 0 0';
  }

  const getDiv = () => _div;

  const getColor = () => _color;

  const setColor = (c) => {
    _color = c;
    _div.style.backgroundColor = _color;
  };

  const random = () => {
    const rdChar = () => hex[Math.floor(Math.random() * hex.length)];
    setColor('#' + rdChar() + rdChar() + rdChar() + rdChar() + rdChar() + rdChar());
  };

  const lighten = () => {
    if (_color === 'transparent') {
      setColor(color.bg());
      return;
    }
    let lightenColor = _color.split('').reduce((total, current) => {
      if (current === '#' || current === 'f') {
        return total + current;
      }
      current = hex[hex.indexOf(current) + 1];
      return total + current;
    }, '');
    setColor(lightenColor);
  };
  const shaden = () => {
    if (_color === 'transparent') {
      setColor(color.bg());
      return;
    }
    let shadenColor = _color.split('').reduce((total, current) => {
      if (current === '#' || current === '0') {
        return total + current;
      }
      current = hex[hex.indexOf(current) - 1];
      return total + current;
    }, '');
    setColor(shadenColor);
  };

  const toggleBorder = () => {
    _div.style.borderColor = _div.style.borderColor === 'gray' ? 'transparent' : 'gray';
  };

  return {
    setNeighbors,
    getNeighbors,
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
const ui = (() => {
  const mess = document.getElementById('main__info__message_0');
  const modes = (m) => {
    mess.textContent = `Mode: ${m}`;
  };
  return { modes };
})();

// #################### COLOR #################### //
const color = (() => {
  const inputPen = document.getElementById('input__pen');
  const inputBg = document.getElementById('input__bg');

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
  const grid = document.getElementById('main__grid');

  let eleArr = [];
  let mode = 'normal';

  const createGrid = (n) => {
    grid.innerHTML = '';
    eleArr = [];

    for (let i = 0; i < n * n; i++) {
      //last cell will have no border
      if (i === n * n - 1) {
        eleArr[i] = Cell(true, true);
      }
      // right-est
      if ((i + 1) % n === 0) {
        eleArr[i] = Cell(true, false);
        continue;
      }
      //bot-est
      if (i >= n * n - n && i < n * n - 1) {
        eleArr[i] = Cell(false, true);
        continue;
      }
      eleArr[i] = Cell(false, false);
    }

    grid.style.gridTemplate = `repeat(${n},1fr)/repeat(${n},1fr)`;
    for (let i = 0; i < eleArr.length; i++) {
      grid.appendChild(eleArr[i].getDiv());
      if (i === 0) {
        eleArr[i].setNeighbors([eleArr[i + 1], eleArr[i + n]]);
        continue;
      }
      if (i === n - 1) {
        eleArr[i].setNeighbors([eleArr[i - 1], eleArr[i + n]]);
        continue;
      }
      if (i === n * n - n) {
        eleArr[i].setNeighbors([eleArr[i + 1], eleArr[i - n]]);
        continue;
      }
      if (i === n * n - 1) {
        eleArr[i].setNeighbors([eleArr[i - 1], eleArr[i - n]]);
        continue;
      }
      //top-est
      if (i > 0 && i < n - 1) {
        eleArr[i].setNeighbors([eleArr[i - 1], eleArr[i + 1], eleArr[i + n]]);
        continue;
      }
      //left-est
      if (i % n === 0) {
        eleArr[i].setNeighbors([eleArr[i + 1], eleArr[i + n], eleArr[i - n]]);
        continue;
      }
      //right-est
      if ((i + 1) % n === 0) {
        eleArr[i].setNeighbors([eleArr[i - 1], eleArr[i + n], eleArr[i - n]]);
        continue;
      }
      //bot-est
      if (i > n * n - n && i < n * n - 1) {
        eleArr[i].setNeighbors([eleArr[i - 1], eleArr[i + 1], eleArr[i - n]]);
        continue;
      }
      //else
      eleArr[i].setNeighbors([eleArr[i - 1], eleArr[i + 1], eleArr[i - n], eleArr[i + n]]);
    }
  };

  const setMode = (m) => {
    for (let i = 0; i < eleArr.length; i++) {
      const el = eleArr[i];
      if (m === 'clear') {
        el.setColor('transparent');
        continue;
      }
      if (m === 'border') {
        el.toggleBorder();
        continue;
      }
      //else mode = m and addEventListener base on mode
      mode = m;
      ui.modes(mode);
      el.getDiv().addEventListener('mouseover', (e) => {
        switch (mode) {
          case 'normal':
            el.setColor(color.pen());
            break;
          case 'eraser':
            el.setColor('transparent');
            break;
          case 'rainbow':
            el.random();
            break;
          case 'lighten':
            el.lighten();
            break;
          case 'shaden':
            el.shaden();
            break;
          case 'grabber':
            grabber(el);
            break;
          case 'filler':
            filler(el);
            break;
        }
      });
    }
  };

  const grabber = (element) => {
    element.getDiv().onmouseover = null;
    element.getDiv().addEventListener('click', (e) => {
      if (element.getColor() !== 'transparent') {
        color.setPen(element.getColor());
        setMode('normal');
      }
    });
  };

  const filler = (element) => {
    const currentColor = element.getColor();
    element.getDiv().onmouseover = null;

    const fill = (el) => {
      const neighbors = el.getNeighbors();
      el.setColor(color.pen());
      for (const neighbor of neighbors) {
        if (neighbor.getColor() !== currentColor) continue;
        fill(neighbor);
      }
    };

    element.getDiv().addEventListener('click', () => {
      fill(element);
    });
  };

  const boardBg = (v) => {
    grid.style.backgroundColor = v;
  };

  return {
    createGrid,
    boardBg,
    setMode,
  };
})();

// #################### HANDLER #################### //
const handler = (() => {
  const bg = document.getElementById('input__bg');
  const ok = document.getElementById('button__size');
  const pen = document.getElementById('input__pen');
  const grid = document.getElementById('main__grid');
  const size = document.getElementById('input__size');
  const icon = document.getElementById('header__title__icon');
  const modes = document.querySelectorAll('[data-mode]');

  bg.addEventListener('input', (e) => {
    board.boardBg(color.bg());
  });

  pen.addEventListener('change', (e) => {
    board.setMode('normal');
  });

  modes.forEach((el) =>
    el.addEventListener('click', (e) => {
      board.setMode(e.target.textContent);
    })
  );

  ok.addEventListener('click', () => {
    if (+size.value <= 80 && +size.value >= 2) {
      board.createGrid(+size.value);
      board.setMode('normal');
    }
  });

  grid.addEventListener('mousedown', board.clickedTrue);
  grid.addEventListener('mouseup', board.clickedFalse);

  icon.addEventListener('click', (e) => {
    alert('Enter to set the size input and Space to clear the board');
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') ok.click();
    if (e.code === 'Space') board.setMode('clear');
  });

  window.addEventListener('DOMContentLoaded', () => {
    board.createGrid(+size.value);
    board.setMode('normal');
    board.boardBg(color.bg());
  });
})();
