import { bgColor } from './color.js';

const hex = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
];
class Cell {
  #color = 'transparent';
  #neighbors = null;
  #div = document.createElement('div');

  constructor() {
    this.#div.style.backgroundColor = 'transparent';
    this.#div.style.borderStyle = 'solid';
    this.#div.style.borderWidth = '1px';
    this.#div.style.borderColor = 'lightgrey';
  }

  setNeighbors(neighbors) {
    this.#neighbors = neighbors;
  }

  getNeighbors() {
    return this.#neighbors;
  }

  getDiv() {
    return this.#div;
  }

  getColor() {
    return this.#color;
  }

  setColor(c) {
    this.#color = c;
    this.#div.style.backgroundColor = this.#color;
  }
  randomChar() {
    return hex[Math.floor(Math.random() * hex.length)];
  }

  random() {
    this.setColor(
      '#' +
        this.randomChar() +
        this.randomChar() +
        this.randomChar() +
        this.randomChar() +
        this.randomChar() +
        this.randomChar()
    );
  }

  lighten() {
    if (this.#color === 'transparent') {
      this.setColor(bgColor());
      return;
    }
    let lightenColor = this.#color.split('').reduce((total, current, index) => {
      let lower = current.toLowerCase();
      if (lower === '#' || lower === 'f') {
        return total + lower;
      }
      let lighter = hex[hex.indexOf(lower) + 1];
      return total + lighter;
    }, '');
    this.setColor(lightenColor);
  }

  shaden() {
    if (this.#color === 'transparent') {
      this.setColor(bgColor());
      return;
    }
    let shadenColor = this.#color.split('').reduce((total, current) => {
      let lower = current.toLowerCase();
      if (lower === '#' || lower === '0') {
        return total + lower;
      }
      let darker = hex[hex.indexOf(lower) - 1];
      return total + darker;
    }, '');
    this.setColor(shadenColor);
  }

  toggleBorder() {
    this.#div.style.borderColor =
      this.#div.style.borderColor === 'lightgrey' ? 'transparent' : 'lightgrey';
  }
}

export { Cell };
