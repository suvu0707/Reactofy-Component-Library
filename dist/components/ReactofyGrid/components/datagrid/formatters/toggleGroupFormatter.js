"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleGroup = ToggleGroup;
exports.toggleGroupFormatter = toggleGroupFormatter;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _useFocusRef = require("../hooks/useFocusRef");
var _templateObject, _templateObject2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const groupCellContent = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.GroupCellContent {\n    outline: none;\n  }\n"])));
const groupCellContentClassname = "rdg-group-cell-content ".concat(groupCellContent);
const caret = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.GroupCellCaret {\n    margin-inline-start: 4px;\n    stroke: currentColor;\n    stroke-width: 1.5px;\n    fill: transparent;\n    vertical-align: middle;\n\n    > path {\n      transition: d 0.1s;\n    }\n  }\n"])));
const caretClassname = "rdg-caret ".concat(caret);
function toggleGroupFormatter(props) {
  return /*#__PURE__*/_react.default.createElement(ToggleGroup, props);
}
function ToggleGroup(_ref) {
  let {
    groupKey,
    isExpanded,
    isCellSelected,
    toggleGroup
  } = _ref;
  const {
    ref,
    tabIndex
  } = (0, _useFocusRef.useFocusRef)(isCellSelected);
  function handleKeyDown(_ref2) {
    let {
      key
    } = _ref2;
    if (key === "Enter") {
      toggleGroup();
    }
  }
  const d = isExpanded ? "M1 1 L 7 7 L 13 1" : "M1 7 L 7 1 L 13 7";
  return /*#__PURE__*/_react.default.createElement("span", {
    ref: ref,
    className: groupCellContentClassname,
    tabIndex: tabIndex,
    onKeyDown: handleKeyDown
  }, groupKey, /*#__PURE__*/_react.default.createElement("svg", {
    viewBox: "0 0 14 8",
    width: "14",
    height: "8",
    className: caretClassname,
    "aria-hidden": true
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: d
  })));
}