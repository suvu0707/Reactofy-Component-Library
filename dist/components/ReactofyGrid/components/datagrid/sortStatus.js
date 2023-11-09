"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortStatus;
exports.sortIcon = sortIcon;
exports.sortPriority = sortPriority;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const arrow = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.SortIcon {\n    fill: currentColor;\n\n    > path {\n      transition: d 0.1s;\n    }\n  }\n"])));
const arrowClassname = "rdg-sort-arrow ".concat(arrow);
function sortStatus(_ref) {
  let {
    sortDirection,
    priority
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, sortIcon({
    sortDirection
  }), sortPriority({
    priority
  }));
}
function sortIcon(_ref2) {
  let {
    sortDirection
  } = _ref2;
  if (sortDirection === undefined) return null;
  return /*#__PURE__*/_react.default.createElement("svg", {
    viewBox: "0 0 12 8",
    width: "12",
    height: "8",
    className: arrowClassname,
    "aria-hidden": true
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: sortDirection === "ASC" ? "M0 8 6 0 12 8" : "M0 0 6 8 12 0"
  }));
}
function sortPriority(_ref3) {
  let {
    priority
  } = _ref3;
  return priority;
}