"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMeasuringCells = renderMeasuringCells;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const measuringCellClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.MeasuringCell {\n    contain: strict;\n    grid-row: 1;\n    visibility: hidden;\n  }\n"])));
function renderMeasuringCells(viewportColumns) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, viewportColumns.map(_ref => {
    let {
      key,
      idx,
      minWidth,
      maxWidth
    } = _ref;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: key,
      className: measuringCellClassname,
      style: {
        gridColumnStart: idx + 1,
        minWidth,
        maxWidth
      },
      "data-measuring-cell-key": key
    });
  }));
}