"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCtrlKeyHeldDown = isCtrlKeyHeldDown;
exports.isDefaultCellInput = isDefaultCellInput;
exports.onEditorNavigation = onEditorNavigation;
require("core-js/modules/web.dom-collections.iterator.js");
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const nonInputKeys = new Set([
// Special keys
"Unidentified",
// Modifier keys
"Alt", "AltGraph", "CapsLock", "Control", "Fn", "FnLock", "Meta", "NumLock", "ScrollLock", "Shift",
// Whitespace keys
"Tab",
// Navigation keys
"ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "End", "Home", "PageDown", "PageUp",
// Editing
"Insert",
// UI keys
"ContextMenu", "Escape", "Pause", "Play",
// Device keys
"PrintScreen",
// Function keys
"F1",
// 'F2', /!\ specifically allowed, do not edit
"F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"]);
function isCtrlKeyHeldDown(e) {
  return (e.ctrlKey || e.metaKey) && e.key !== "Control";
}
function isDefaultCellInput(event) {
  return !nonInputKeys.has(event.key);
}

/**
 * By default, the following navigation keys are enabled while an editor is open, under specific conditions:
 * - Tab:
 *   - The editor must be an <input>, a <textarea>, or a <select> element.
 *   - The editor element must be the only immediate child of the editor container/a label.
 */
function onEditorNavigation(_ref) {
  let {
    key,
    target
  } = _ref;
  if (key === "Tab" && (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
    return target.matches(".rdg-editor-container > :only-child, .rdg-editor-container > label:only-child > :only-child, .rdg-editor-container > div:only-child > label:only-child > :only-child");
  }
  return false;
}