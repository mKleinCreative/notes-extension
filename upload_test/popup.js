const createPostit = document.querySelector(".postit__create");
const deletePostit = document.querySelector(".postit__delete");
const parentStyle = document.querySelector("style");

console.log("parent style", parentStyle);

function* idMaker() {
  var index = 0;
  while (index < index + 1)
    yield index++;
}

var idFactory = idMaker();


createPostit.onclick = function(element) {
  let parent = chrome.app.window.current()
  newWindow = chrome.app.window.create("index.html",
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
        console.log('test', test[0])
      }
    }
  )

  // element.style = parentStyle
}

deletePostit.onclick = function() {
  window.close()
}