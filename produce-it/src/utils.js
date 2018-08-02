export function copyStyles(sourceDoc, targetDoc) {
    console.log("sourceDoc", sourceDoc.cssText);
    targetDoc
      .getElementsByTagName("div")[0]
      .setAttribute("style", sourceDoc.cssText);
}