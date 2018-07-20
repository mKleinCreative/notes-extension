'use strict';

chrome.app.runtime.onLaunched.addListener(() => {
  chrome.app.window.create('popup.html',
    {
      frame: 'none',
      id: 'framelessWinID',
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


chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');
