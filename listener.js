import { boardBg, createGrid, setMode } from './board.js';
import { penColor, bgColor, setPenColor } from './color.js';

const bg = document.getElementById('input__bg');
const ok = document.getElementById('button__size');
const pen = document.getElementById('input__pen');
const grid = document.getElementById('main__grid');
const size = document.getElementById('input__size');
const icon = document.getElementById('header__title__icon');
const modes = document.querySelectorAll('[data-mode]');

bg.addEventListener('input', (e) => {
  boardBg(bgColor());
});

pen.addEventListener('change', (e) => {
  setMode('normal');
});

modes.forEach((el) =>
  el.addEventListener('click', (e) => {
    setMode(e.target.dataset.mode);
  })
);

ok.addEventListener('click', () => {
  if (+size.value <= 80 && +size.value >= 2) {
    createGrid(+size.value);
    setMode('normal');
  }
});

icon.addEventListener('click', (e) => {
  alert('Enter to set the size input and Space to clear the board');
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') ok.click();
  if (e.code === 'Space') setMode('clear');
});

window.addEventListener('DOMContentLoaded', () => {
  createGrid(+size.value);
  setMode('normal');
  boardBg(bgColor());
});
