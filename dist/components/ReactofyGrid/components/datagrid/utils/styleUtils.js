"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCellClassname = getCellClassname;
exports.getCellStyle = getCellStyle;
exports.getRowStyle = getRowStyle;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _clsx = require("clsx");
var _style = require("../style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getRowStyle(rowIdx, height) {
  if (height !== undefined) {
    return {
      "--rdg-grid-row-start": rowIdx,
      "--rdg-row-height": "".concat(height, "px")
    };
  }
  return {
    "--rdg-grid-row-start": rowIdx
  };
}
function getCellStyle(column, colSpan, rowSpan) {
  return {
    height: "100%",
    gridColumnStart: column.index + 1,
    gridColumnEnd: colSpan !== undefined ? "span ".concat(colSpan) : undefined,
    gridRowEnd: rowSpan !== undefined ? "span ".concat(rowSpan) : undefined,
    insetInlineStart: column.frozen ? "var(--rdg-frozen-left-".concat(column.index, ")") : undefined
  };
}
function getCellClassname(column) {
  for (var _len = arguments.length, extraClasses = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    extraClasses[_key - 1] = arguments[_key];
  }
  return (0, _clsx.clsx)(_style.cellClassname, {
    [_style.cellFrozenClassname]: column.frozen,
    [_style.cellFrozenLastClassname]: column.isLastFrozenColumn
  }, ...extraClasses);
}