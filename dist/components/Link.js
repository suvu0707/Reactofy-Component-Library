"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Link = _interopRequireDefault(require("@mui/material/Link"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ReactofyLink(props) {
  return /*#__PURE__*/_react.default.createElement(_Link.default, {
    href: props.href
  }, props.text);
}
var _default = exports.default = ReactofyLink;