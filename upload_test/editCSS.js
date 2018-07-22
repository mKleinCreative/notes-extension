const editButton = document.querySelector('.postit__edit');
const postit = document.querySelector('.draggable');
const postitContent = document.querySelector('.postit__content');

function randomColor() {
  let randomRGB = () => Math.floor(Math.random() * 255)
  let r = randomRGB();
  let g = randomRGB();
  let b = randomRGB();
  let fontColor = (r * 0.299 + g * 0.587 + b * 0.114) > 186
    ? '#000000'
    : '#FFFFFF';
  let borderColor = (`rgb(${255 - r}, ${255 - g}, ${255 - b});`)
  return [`rgb(${r}, ${g}, ${b});`, borderColor, fontColor]
}

let colorTheme;

console.log('theme', colorTheme)
editButton.onclick = function() {
  colorTheme = randomColor();
  postit.setAttribute("style", 
    `background: ${colorTheme[0]}
    border: 5px solid ${colorTheme[1]}`
  )
  postitContent.setAttribute("style", `color: ${colorTheme[2]};`)
}

