import { Cell } from './cell.js';
import { displayModes } from './display.js';
import { penColor, bgColor, setPenColor } from './color.js';

const grid = document.getElementById('main__grid');

let eleArr = [];
let mode = 'normal';

const createGrid = (n) => {
  grid.innerHTML = '';
  eleArr = [];

  grid.style.gridTemplate = `repeat(${n},1fr)/repeat(${n},1fr)`;
  for (let i = 0; i < n * n; i++) {
    const div = new Cell();
    grid.appendChild(div.getDiv());
    eleArr.push(div);
  }

  for (let i = 0; i < eleArr.length; i++) {
    const current = eleArr[i];
    const top = eleArr[i - n];
    const bottom = eleArr[i + n];
    const right = eleArr[i + 1];
    const left = eleArr[i - 1];
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
    if (i % n === 5) {
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
    displayModes(mode);

    el.getDiv().addEventListener('mouseover', (e) => {
      switch (mode) {
        case 'normal':
          el.setColor(penColor());
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

function grabber(element) {
  element.getDiv().addEventListener('click', (e) => {
    if (element.getColor() !== 'transparent') {
      setPenColor(element.getColor());
      setMode('normal');
    }
  });
}

function filler(element) {
  const currentColor = element.getColor();
  element.getDiv().onmouseover = null;

  const fill = (el) => {
    const neighbors = el.getNeighbors();
    el.setColor(penColor());
    for (const neighbor of neighbors) {
      if (neighbor.getColor() !== currentColor) continue;
      fill(neighbor);
    }
  };

  element.getDiv().addEventListener('click', () => {
    fill(element);
  });
}

const boardBg = (v) => {
  grid.style.backgroundColor = v;
};

export { createGrid, boardBg, setMode };
