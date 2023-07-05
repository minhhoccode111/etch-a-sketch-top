# etch-a-sketch

- Practice JS DOM and CSS
- features idea and layout, UI idea from <a href="https://github.com/bscottnz/esketch">bscottnz</a>, he did it so well, thank him a lot
  What I have learned:
  - element.onchange(or onclick,oninput,...)=(e)=>functionName(e.target.value)
  - let mousedown = false;
  - fastest way to delete element child is element.innerHTML=''
    document.body.onmousedown = () => (mousedown = true);
    document.body.onmouseup = () => (mousedown = false);
  - app.js is my first try to do features of this app so the code is a little messy
  - and script.js is my second try
  - comeback and do my third try after 6 months, my old code save on "old" branch on gitHub
  - recursive to fill every neighbors element with the same color (`fill` feature)
  - attribute `pattern="#[0-9a-fA-F]{6}"` to strict with value type of input type color
  - when we use `textContent` of a element to pass as argument to a javascript function there may be some unexpected behavior cause when html file auto line break (this happen when an element has so many attributes) and the `textContent` of it become `   some text   ` instead of `some text` and extremely hard to debug. So remember to use element's `data` attribute to pass values in javaScript function as argument to make your life easier.

[View all my projects Live demo links](https://minhhoccode111.github.io/allProjectssLiveDemo/)

[View this project Live demo](https://minhhoccode111.github.io/etchASketchTOP/)
