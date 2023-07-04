const inputPen = document.getElementById('input__pen');
const inputBg = document.getElementById('input__bg');

const pen = () => inputPen.value;

const setPen = (v) => (inputPen.value = v);

const bg = () => inputBg.value;

export { pen as penColor, bg as bgColor, setPen as setPenColor };
