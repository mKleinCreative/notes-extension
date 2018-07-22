const editButton = document.querySelector('.postit__edit');
const postit = document.querySelector('.draggable');

function randomColor() {
  let randomRGB = () => Math.floor(Math.random() * 255)
  return `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`
}

editButton.onclick = function() {
  postit.setAttribute("style", 
  `background: ${randomColor()};
  border: 5px solid ${randomColor()};`)
}