"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellExpanderFormatter = CellExpanderFormatter;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _useFocusRef = require("../../hooks/useFocusRef");
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const cellExpandClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  /* needed on chrome */\n  float: right;\n  float: inline-end;\n  display: table;\n  block-size: 100%;\n\n  > span {\n    display: table-cell;\n    vertical-align: middle;\n    cursor: pointer;\n  }\n"])));
function CellExpanderFormatter(_ref) {
  let {
    isCellSelected,
    expanded,
    onCellExpand
  } = _ref;
  const {
    ref,
    tabIndex
  } = (0, _useFocusRef.useFocusRef)(isCellSelected);
  function handleKeyDown(e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onCellExpand();
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: cellExpandClassname
  }, /*#__PURE__*/_react.default.createElement("span", {
    onClick: onCellExpand,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/_react.default.createElement("span", {
    ref: ref,
    tabIndex: tabIndex
  }, expanded ? "\u25BC" : "\u25B6")));
}