"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProgressBarEditor;
var _core = require("@linaria/core");
var _templateObject, _templateObject2, _templateObject3;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const progressBar = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.ProgressBar {\n    height: 5px;\n    width: 90%;\n    background-color: #f5f5f5;\n    display: flex;\n    flex-direction: row;\n  }\n"])));
const progress = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.Progress {\n    background-color: #16365D;\n    height: 100%;\n  }\n"])));
const progressContainer = (0, _core.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  @layer rdg.ProgressContainer {\n    display: flex;\n    align-items: center;\n    flex-direction: row;\n    width: 100%;\n    height: 100%;\n    column-gap: 5%;\n    font-size: var(--rdg-font-size);\n    font-family: var(--rdg-font-family);\n  }\n"])));
function ProgressBarEditor(_ref) {
  let {
    column,
    row,
    onRowChange
  } = _ref;
  const value = row[column.key];
  return /*#__PURE__*/React.createElement("div", {
    className: "rdg-progressBar-container ".concat(progressContainer)
  }, /*#__PURE__*/React.createElement("div", {
    className: "rdg-progress-bar ".concat(progressBar)
  }, /*#__PURE__*/React.createElement("div", {
    className: "rdg-progress ".concat(progress),
    style: {
      width: "".concat(value, "%")
    }
  })), Math.round(value), "%");
}