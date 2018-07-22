const editButton = document.querySelector('.postit__edit');
const postit = document.querySelector('.draggable');
const postitContent = document.querySelector('.postit__content');

function randomColor() {
  let randomRGB = () => Math.floor(Math.random() * 255)
  return `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`
}

editButton.onclick = function() {
  postit.setAttribute("style", 
    `background: ${randomColor()};
    border: 5px solid ${randomColor()};`
  )
  postitContent.setAttribute("style", `color: ${randomColor()}`)
}