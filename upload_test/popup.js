const createPostit = document.querySelector(".postit__create");

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