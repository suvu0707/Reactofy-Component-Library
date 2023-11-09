"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildRowDeleteButton = ChildRowDeleteButton;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _useFocusRef = require("../../hooks/useFocusRef");
var _templateObject, _templateObject2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const childRowActionCrossClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  &::before,\n  &::after {\n    content: \"\";\n    position: absolute;\n    background: grey;\n  }\n\n  &::before {\n    inset-inline-start: 21px;\n    inline-size: 1px;\n    block-size: 100%;\n  }\n\n  &::after {\n    inset-block-start: 50%;\n    inset-inline-start: 20px;\n    block-size: 1px;\n    inline-size: 15px;\n  }\n\n  &:hover {\n    background: red;\n  }\n"])));
const childRowButtonClassname = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  position: absolute;\n  inset-inline-start: 21px;\n  transform: translateX(-50%);\n  filter: grayscale(1);\n  &:dir(rtl) {\n    transform: translateX(50%);\n  }\n"])));
function ChildRowDeleteButton(_ref) {
  let {
    isCellSelected,
    onDeleteSubRow,
    isDeleteSubRowEnabled
  } = _ref;
  const {
    ref,
    tabIndex
  } = (0, _useFocusRef.useFocusRef)(isCellSelected);
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onDeleteSubRow();
    }
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: childRowActionCrossClassname
  }), isDeleteSubRowEnabled &&
  /*#__PURE__*/
  // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
  _react.default.createElement("div", {
    className: childRowButtonClassname,
    onClick: onDeleteSubRow
  }, /*#__PURE__*/_react.default.createElement("span", {
    ref: ref,
    tabIndex: tabIndex,
    onKeyDown: handleKeyDown
  }, "\u274C")));
}