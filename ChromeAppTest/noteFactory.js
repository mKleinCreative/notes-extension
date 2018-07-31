const createThemedPostit = document.querySelector(".postit__create-themed-note");
const createPostit = document.querySelector(".postit__create");
const deletePostit = document.querySelector(".postit__delete");
const parentStyle = document.querySelector("style");
const editButton = document.querySelector('.postit__edit');
const postit = document.querySelector('.draggable');
const postitContent = document.querySelector('.postit__content');

let colorTheme = {
  lemon: {
    cssFilePath: './themes/lemon.css'
  },
  grape: {
    cssFilePath: './themes/grape.css'
  },
  watermelon: {
    cssFilePath: './themes/watermelon.css'
  },
};


function* idMaker() {
  var index = 0;
  while (index < index + 1)
    yield index++;
}

var idFactory = idMaker();

const postItFactory = (element) => {
  newWindow = chrome.app.window.create("new_note.html",
    {
      frame: "none",
      id: `postit-${idFactory.next().value}`,
      alwaysOnTop: true,
      innerBounds: {
        width: 360,
        height: 300,
        left: 600,
        minWidth: 220,
        minHeight: 220
      }
    }, async function (newWindow) {
      let newWindowMade = await newWindow
      console.log('newWindowMade (╯°□°)╯︵ ┻━┻ ', newWindowMade)
      if (newWindowMade) {
        let test = $($(newWindow.contentWindow.document.documentElement), "body")
      }
    }
  )
}

$(createPostit).click(() => { postItFactory() })

$(deletePostit).on("click", function() {
  window.close()
})

deletePostit.onclick = function() {
  window.close()
}