"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowSelectedWithFrozenCell = exports.rowSelectedClassname = exports.rowSelected = exports.rowClassname = exports.row = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _templateObject, _templateObject2, _templateObject3;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const row = exports.row = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.Row {\n    display: contents;\n    line-height: var(--rdg-row-height);\n    background-color: var(--rdg-background-color);\n\n    &:hover {\n      background-color: var(--rdg-row-hover-background-color) !important;\n    }\n\n    &[aria-selected=\"true\"] {\n      background-color: #ebf1dd;\n      &:hover {\n        background-color: var(--rdg-row-selected-hover-background-color);\n      }\n    }\n  }\n"])));
const rowClassname = exports.rowClassname = "rdg-row ".concat(row);
const rowSelected = exports.rowSelected = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.FocusSink {\n    outline: 2px solid var(--rdg-selection-color);\n    outline-offset: -2px;\n  }\n"])));
const rowSelectedClassname = exports.rowSelectedClassname = "rdg-row-selected";
const rowSelectedWithFrozenCell = exports.rowSelectedWithFrozenCell = (0, _core.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  @layer rdg.FocusSink {\n    &::before {\n      content: \"\";\n      display: inline-block;\n      height: 100%;\n      position: sticky;\n      inset-inline-start: 0;\n      border-inline-start: 2px solid var(--rdg-selection-color);\n    }\n  }\n"])));