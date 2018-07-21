const createPostit = document.querySelector(".postit__create");
const deletePostit = document.querySelector(".postit__delete");

function* idMaker() {
  var index = 0;
  while (index < index + 1)
    yield index++;
}

var idFactory = idMaker();

createPostit.onclick = function(element) {
  chrome.app.window.create("index.html",
    {
      frame: "none",
      id: `postit-${idFactory.next().value}`,
      alwaysOnTop: true,gaa
      innerBounds: {
        width: 360,
        height: 300,
        left: 600,
        minWidth: 220,
        minHeight: 220
      }
    }
  );
}

deletePostit.onclick = function() {
  window.close()
}