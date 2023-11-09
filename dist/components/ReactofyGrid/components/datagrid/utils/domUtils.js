"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollIntoView = scrollIntoView;
exports.stopPropagation = stopPropagation;
function stopPropagation(event) {
  event.stopPropagation();
}
function scrollIntoView(element) {
  if (element && typeof element.scrollIntoView === 'function') {
    element.scrollIntoView({
      inline: "nearest",
      block: "nearest"
    });
  }
}