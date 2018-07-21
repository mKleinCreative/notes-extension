const editButton = document.querySelector('.postit__edit');
const postit = document.querySelector('.draggable');

function randomColor() {
  let randomR = Math.floor(Math.random() * 255)
  let randomG = Math.floor(Math.random() * 255)
  let randomB = Math.floor(Math.random() * 255)
  return `rgb(${randomR}, ${randomG}, ${randomB})`
}


editButton.onclick = function() {
  postit.setAttribute("style", `background: ${randomColor()}`)
}