const mess = document.getElementById('main__info__message_0');

const modes = (m) => {
  mess.textContent = `Mode: ${m}`;
};

export { modes as displayModes };
