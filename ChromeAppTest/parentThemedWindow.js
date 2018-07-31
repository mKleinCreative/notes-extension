const createThemedPostit = document.querySelector(".postit__create-themed-note");
const dashboard = document.querySelector("#dashboard__content");

function* idMaker() {
  var index = 0;
  while (index < index + 1)
    yield index++;
}

const idFactory = idMaker();

const postItFactory = (element) => {
  let theme = $(element).data("theme");
  let fileName = `./themes/${theme}.css`;
  let newWindow;

  console.log('theme', theme);
  console.log('fileName', fileName);

  newWindow = chrome.app.window.create(
    "new_note.html",
    {
      frame: "none",
      id: `postit-${theme}-${idFactory.next().value}`,
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
        newWindow.contentWindow.document.documentElement
        .addEventListener('contentload', function () {
          newWindow.executeScript({ code: 'document.body.style.fontSize = "42px"' });
        });
        let test = $($(newWindow.contentWindow.document.documentElement), "body")
        console.log('test (╯°□°)╯︵ ┻━┻ ', test)
      }
    }
  )
}

$(".postit__create-themed-note").click(function() { postItFactory( $(this) )})



dashboard.addEventListener('newwindow', function (e) {
  var newWebview = document.createElement('webview');
  e.window.openWindowDispostion = "new_window"
  document.body.appendChild(newWebview);
  e.window.attach(newWebview);
});


// function onNewWindow(event) {
//   console.log("xiaofeng: ====================" + event.windowOpenDisposition);

//   switch (event.windowOpenDisposition) {
//     case 'ignore':
//       // Not sure what this is used by.  Default enum value, maybe.
//       console.debug('Ignoring new window request');
//       return;

//     case 'save_to_disk':
//       // Ctrl + S, maybe?  Not sure how to reproduce that.
//       console.log('save_to_disk is not implemented');
//       return;

//     case 'current_tab':
//       console.log("xiaofeng: ==================== current_tab");
//       return;

//     case 'new_background_tab':
//     case 'new_foreground_tab':
//       newWindow = open(event.targetUrl, '_blank');
//       if (event.windowOpenDisposition != 'new_background_tab') {
//         newWindow.focus();
//       }
//       break;

//     case 'new_window':
//     case 'new_popup':
//       // if (event.initialWidth && event.initialHeight) {
//       //   features = 'width=' + event.initialWidth + ',height=' + event.initialHeight;
//       // }
//       newWindow = open(event.targetUrl, '_blank');
//       newWindow.focus();
//       break;
//   }
// }

// window.onload = function () {
//   var webview = document.getElementById('dashboard__content');
//   console.log("+++++++++++++++++");
//   webview.addEventListener('newwindow', onNewWindow);
// };

// chrome.app.runtime.onLaunched.addListener(function () {
//   $(".postit__create").on("click", function(e) {
//     postItFactory($(this))
//   })
//   chrome.app.window.create(
//     'note.html',
//     { 'width': 1000, 'height': 1000 },
//     function (win) {
//       win.contentWindow.onload = function () {
//         var webview = win.contentWindow.document.querySelector('#dashboard__content');
//         webview.addEventListener('newwindow', function (e) {
//           e.preventDefault();
//           // e.targetUrl contains the target URL of the original link click
//           // or window.open() call: use it to open your own window to it.
//           // Something to keep in mind: window.open() called from the
//           // app's event page is currently (Nov 2013) handicapped and buggy
//           // (e.g. it doesn't have access to local storage, including cookie
//           // store). You can try to use it here and below, but be prepare that
//           // it may sometimes produce bad results.
//           console.log('hi');
//           // chrome.app.window.create(e.targetUrl, ...);
//         });
//       };
//     }
//   );
// });