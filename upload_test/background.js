chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create("index.html",
    {
      frame: "none",
      id: "postHub",
      alwaysOnTop: true,
      innerBounds: {
        width: 360,
        height: 300,
        left: 600,
        minWidth: 220,
        minHeight: 220
      }
    }
  );
});
