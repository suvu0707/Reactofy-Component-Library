"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topRowIsSelectedClassName = exports.topRowIsSelected = exports.rowIsSelectedClassName = exports.rowIsSelected = exports.cellFrozenLastClassname = exports.cellFrozenLast = exports.cellFrozenClassname = exports.cellFrozen = exports.cellEditorClassname = exports.cellClassname = exports.cell = exports.bottomRowIsSelectedClassName = exports.bottomRowIsSelected = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const cell = exports.cell = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    /* max-content does not work with size containment\n     * dynamically switching between different containment styles incurs a heavy relayout penalty\n     * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear\n     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946\n     */\n    contain: style;\n    position: relative; /* needed for absolute positioning to work */\n    padding-block: 0;\n    padding-inline: 0px;\n    border-inline-end: 1px solid var(--rdg-border-color);\n    border-block-end: 1px solid var(--rdg-border-color);\n    grid-row-start: var(--rdg-grid-row-start);\n    background-color: inherit;\n    text-align: center;\n    \n    white-space: nowrap;\n    overflow: hidden;\n    overflow: clip;\n    text-overflow: ellipsis;\n    outline: none;\n\n    &[aria-selected=\"true\"] {\n      outline: 1px solid var(--rdg-selection-color);\n      outline-offset: -2px;\n    }\n   \n  }\n"])));
const cellClassname = exports.cellClassname = "rdg-cell ".concat(cell);
const cellFrozen = exports.cellFrozen = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    position: sticky;\n    /* Should have a higher value than 0 to show up above unfrozen cells */\n    z-index: 1;\n  }\n"])));
const cellFrozenClassname = exports.cellFrozenClassname = "rdg-cell-frozen ".concat(cellFrozen);
const cellFrozenLast = exports.cellFrozenLast = (0, _core.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);\n  }\n"])));
const cellFrozenLastClassname = exports.cellFrozenLastClassname = "rdg-cell-frozen-last ".concat(cellFrozenLast);
const cellEditorClassname = exports.cellEditorClassname = (0, _core.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n  }\n"])));
const rowIsSelected = exports.rowIsSelected = (0, _core.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    border-block-start: 1px solid #9bbb59;\n    border-block-end: 1px solid #9bbb59;\n  }\n"])));
const rowIsSelectedClassName = exports.rowIsSelectedClassName = "rdg-middle-row-is-selected ".concat(rowIsSelected);
const topRowIsSelected = exports.topRowIsSelected = (0, _core.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    border-block-end: 1px solid #9bbb59;\n  }\n"])));
const topRowIsSelectedClassName = exports.topRowIsSelectedClassName = "rdg-top-row-is-selected ".concat(topRowIsSelected);
const bottomRowIsSelected = exports.bottomRowIsSelected = (0, _core.css)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    border-block-start: 1px solid #9bbb59;\n  }\n"])));
const bottomRowIsSelectedClassName = exports.bottomRowIsSelectedClassName = "rdg-bottom-row-is-selected ".concat(bottomRowIsSelected);