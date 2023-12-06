"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ToolTip(_ref) {
  let {
    stopPropagation
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "ValidationTooltip",
    style: {
      position: "absolute",
      zIndex: 9999,
      top: "20px",
      fontSize: "14px",
      width: "max-content",
      padding: "5px 10px",
      background: "white",
      // borderRadius: "6px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)"
    },
    onClick: stopPropagation
  }, "Please Select Combobox Value");
}
var _default = exports.default = ToolTip;