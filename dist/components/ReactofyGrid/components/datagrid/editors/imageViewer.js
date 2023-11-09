"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ImageViewer;
var _ImageFormatter = require("../components/Formatters/ImageFormatter");
function ImageViewer(_ref) {
  let {
    row,
    column
  } = _ref;
  return /*#__PURE__*/React.createElement(_ImageFormatter.ImageFormatter, {
    value: row[column.key]
  });
}