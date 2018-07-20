console.log('hello')

function updateCheckbox() {
  var top_checkbox = document.getElementById("box-top");
  var bottom_checkbox = document.getElementById("box-bottom");
  var left_checkbox = document.getElementById("box-left");
  var right_checkbox = document.getElementById("box-right");
  if (top_checkbox.checked || bottom_checkbox.checked) {
    left_checkbox.disabled = true;
    right_checkbox.disabled = true;
  } else if (left_checkbox.checked || right_checkbox.checked) {
    top_checkbox.disabled = true;
    bottom_checkbox.disabled = true;
  } else {
    left_checkbox.disabled = false;
    right_checkbox.disabled = false;
    top_checkbox.disabled = false;
    bottom_checkbox.disabled = false;
  }
}

function initCheckbox(checkboxId, titlebar_name, titlebar_text) {
  var elem = document.getElementById(checkboxId);
  if (!elem)
    return;
  elem.onclick = function () {
    if (document.getElementById(checkboxId).checked)
      addTitlebar(titlebar_name, titlebar_text);
    else
      removeTitlebar(titlebar_name);
    focusTitlebars(true);

    updateContentStyle();
    updateCheckbox();
  }
}

window.onfocus = function () {
  console.log("focus");
  focusTitlebars(true);
}

window.onblur = function () {
  console.log("blur");
  focusTitlebars(false);
}

window.onresize = function () {
  updateContentStyle();
}

window.onload = function () {
  initCheckbox("box-top", "titlebar-top", "Top Titlebar");
  initCheckbox("box-bottom", "titlebar-bottom", "Bottom Titlebar");
  initCheckbox("box-left", "titlebar-left", "Left Titlebar");
  initCheckbox("box-right", "titlebar-right", "Right Titlebar");

  document.getElementById("close-window-button").onclick = function () {
    window.close();
  }

  updateContentStyle();
}
