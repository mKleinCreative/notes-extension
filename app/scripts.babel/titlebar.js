const closeWindow = () => {
  window.close();
}

const updateImageUrl = (image_id, new_image_url) => {
  var image = document.getElementById(image_id);
  if (image)
    image.src = new_image_url;
}

const createImage = (image_id, image_url) => {
  var image = document.createElement("img");
  image.setAttribute("id", image_id);
  image.src = image_url;
  return image;
}

const createButton = (button_id, button_name, normal_image_url,
  hover_image_url, click_func) => {
  var button = document.createElement("div");
  button.setAttribute("class", button_name);
  var button_img = createImage(button_id, normal_image_url);
  button.appendChild(button_img);
  button.onmouseover = () => {
    updateImageUrl(button_id, hover_image_url);
  }
  button.onmouseout = () => {
    updateImageUrl(button_id, normal_image_url);
  }
  button.onclick = click_func;
  return button;
}

const focusTitlebars = (focus) => {
  var bg_color = focus ? "#3a3d3d" : "#7a7c7c";

  var titlebar = document.getElementById("titlebar-top");
  if (titlebar)
    titlebar.style.backgroundColor = bg_color;
  titlebar = document.getElementById("titlebar-bottom");
  if (titlebar)
    titlebar.style.backgroundColor = bg_color;
  titlebar = document.getElementById("titlebar-left");
  if (titlebar)
    titlebar.style.backgroundColor = bg_color;
  titlebar = document.getElementById("titlebar-right");
  if (titlebar)
    titlebar.style.backgroundColor = bg_color;
}

const addTitlebar = (titlebar_name, titlebar_icon_url, titlebar_text) => {
  var titlebar = document.createElement("div");
  titlebar.setAttribute("id", titlebar_name);
  titlebar.setAttribute("class", titlebar_name);

  var icon = document.createElement("div");
  icon.setAttribute("class", titlebar_name + "-icon");
  icon.appendChild(createImage(titlebar_name + "icon", titlebar_icon_url));
  titlebar.appendChild(icon);

  var title = document.createElement("div");
  title.setAttribute("class", titlebar_name + "-text");
  title.innerText = titlebar_text;
  titlebar.appendChild(title);

  var closeButton = createButton(titlebar_name + "-close-button",
    titlebar_name + "-close-button",
    "button_close.png",
    "button_close_hover.png",
    closeWindow);
  titlebar.appendChild(closeButton);

  var divider = document.createElement("div");
  divider.setAttribute("class", titlebar_name + "-divider");
  titlebar.appendChild(divider);

  document.body.appendChild(titlebar);
}

const removeTitlebar = (titlebar_name) => {
  var titlebar = document.getElementById(titlebar_name);
  if (titlebar)
    document.body.removeChild(titlebar);
}

const updateContentStyle = () => {
  var content = document.getElementById("content");
  if (!content)
    return;

  var left = 0;
  var top = 0;
  var width = window.outerWidth;
  var height = window.outerHeight;

  var titlebar = document.getElementById("titlebar-top");
  if (titlebar) {
    height -= titlebar.offsetHeight;
    top += titlebar.offsetHeight;
  }
  titlebar = document.getElementById("titlebar-bottom");
  if (titlebar) {
    height -= titlebar.offsetHeight;
  }
  titlebar = document.getElementById("titlebar-left");
  if (titlebar) {
    width -= titlebar.offsetWidth;
    left += titlebar.offsetWidth;
  }
  titlebar = document.getElementById("titlebar-right");
  if (titlebar) {
    width -= titlebar.offsetWidth;
  }

  var contentStyle = "position: absolute; ";
  contentStyle += "left: " + left + "px; ";
  contentStyle += "top: " + top + "px; ";
  contentStyle += "width: " + width + "px; ";
  contentStyle += "height: " + height + "px; ";
  content.setAttribute("style", contentStyle);
}
