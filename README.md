# etch-a-sketch

- Practice JS DOM and CSS
- features idea and layout, UI idea from <a href="https://github.com/bscottnz/esketch">bscottnz</a>, he did it so well, thank him a lot
  What I have learned:
  -element.onchange(or onclick,oninput,...)=(e)=>functionName(e.target.value)
  -let mousedown = false;
  -fastest way to delete element child is element.innerHTML=''
  document.body.onmousedown = () => (mousedown = true);
  document.body.onmouseup = () => (mousedown = false);
  -app.js is my first try to do features of this app so the code is a little messy
  -and script.js is my second try
