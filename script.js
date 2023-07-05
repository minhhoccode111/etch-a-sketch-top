// #################### CELL #################### //
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function Cell(isRightest, isBottomest) {
  let _color = 'transparent';
  let _neighbors;
  const setNeighbors = (v) => (_neighbors = v);
  const getNeighbors = () => _neighbors;

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
  if (isBottomest && isRightest) {
    _div.style.borderWidth = '0';
  }

  const getDiv = () => _div;

  const getColor = () => _color;

  const setColor = (c) => {
    _color = c;
    _div.style.backgroundColor = _color;
  };

  const _rdChar = () => hex[Math.floor(Math.random() * hex.length)];
  const random = () => {
    setColor('#' + _rdChar() + _rdChar() + _rdChar() + _rdChar() + _rdChar() + _rdChar());
  };

  const lighten = () => {
    if (_color === 'transparent') {
      setColor(color.bg());
      return;
    }
    let lightenColor = _color.split('').reduce((total, current) => {
      const lower = current.toLowerCase();
      if (current === '#' || lower === 'f') {
        return total + lower;
      }
      return total + hex[hex.indexOf(lower) + 1];
    }, '');
    setColor(lightenColor);
  };
  const shaden = () => {
    if (_color === 'transparent') {
      setColor(color.bg());
      return;
    }
    let shadenColor = _color.split('').reduce((total, current) => {
      const lower = current.toLowerCase();

      if (current === '#' || lower === '0') {
        return total + lower;
      }
      return total + hex[hex.indexOf(lower) - 1];
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
  const _mess0 = document.getElementById('main__info__message_0');
  const _mess1 = document.getElementById('main__info__message_1');
  const modes = (m) => {
    _mess0.textContent = `Mode: ${m}`;
  };
  const penColor = (c) => {
    _mess1.textContent = `Pen color: ${c}`;
  };
  return { modes, penColor };
})();

// #################### COLOR #################### //
const color = (() => {
  const _inputPen = document.getElementById('input__pen');
  const _inputBg = document.getElementById('input__bg');

  const pen = () => _inputPen.value;
  const setPen = (v) => {
    _inputPen.value = v;
    ui.penColor(v);
  };
  const bg = () => _inputBg.value;
  return {
    setPen,
    pen,
    bg,
  };
})();

// #################### BOARD #################### //
const board = (() => {
  const _grid = document.getElementById('main__grid');

  let eleArr = [];
  let mode = 'normal';

  const createGrid = (n) => {
    _grid.innerHTML = '';
    eleArr = [];

    for (let i = 0; i < n * n; i++) {
      //last cell will have no border
      if (i === n * n - 1) {
        eleArr[i] = Cell(true, true);
        continue;
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

    _grid.style.gridTemplate = `repeat(${n},1fr)/repeat(${n},1fr)`;
    for (let i = 0; i < eleArr.length; i++) {
      const current = eleArr[i];
      const top = eleArr[i - n];
      const bottom = eleArr[i + n];
      const right = eleArr[i + 1];
      const left = eleArr[i - 1];
      _grid.appendChild(current.getDiv());
      if (i === 0) {
        current.setNeighbors([right, bottom]);
        continue;
      }
      if (i === n - 1) {
        current.setNeighbors([left, bottom]);
        continue;
      }
      if (i === n * n - n) {
        current.setNeighbors([right, top]);
        continue;
      }
      if (i === n * n - 1) {
        current.setNeighbors([left, top]);
        continue;
      }
      //top-est
      if (i > 0 && i < n - 1) {
        current.setNeighbors([left, right, bottom]);
        continue;
      }
      //left-est
      if (i % n === 0) {
        current.setNeighbors([right, bottom, top]);
        continue;
      }
      //right-est
      if ((i + 1) % n === 0) {
        current.setNeighbors([left, bottom, top]);
        continue;
      }
      //bot-est
      if (i > n * n - n && i < n * n - 1) {
        current.setNeighbors([left, right, top]);
        continue;
      }
      //else
      current.setNeighbors([left, right, top, bottom]);
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
    _grid.style.backgroundColor = v;
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
  const size = document.getElementById('input__size');
  const icon = document.getElementById('header__title__icon');
  const modes = document.querySelectorAll('[data-mode]');

  bg.addEventListener('input', (e) => {
    board.boardBg(color.bg());
  });

  pen.addEventListener('change', (e) => {
    board.setMode('normal');
    ui.penColor(e.target.value);
  });

  modes.forEach((el) =>
    el.addEventListener('click', (e) => {
      board.setMode(e.target.dataset.mode);
    })
  );

  ok.addEventListener('click', () => {
    if (+size.value <= 80 && +size.value >= 2) {
      board.createGrid(+size.value);
      board.setMode('normal');
    }
  });

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
