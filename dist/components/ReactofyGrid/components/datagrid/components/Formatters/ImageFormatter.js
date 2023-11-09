"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageFormatter = ImageFormatter;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _templateObject, _templateObject2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const wrapperClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-around;\n"])));
const imageCellClassname = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  background: #efefef;\n  background-size: 100%;\n  display: inline-block;\n  block-size: 28px;\n  inline-size: 28px;\n  vertical-align: middle;\n  background-position: center;\n"])));
function ImageFormatter(_ref) {
  let {
    value
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: wrapperClassname
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: imageCellClassname,
    style: {
      backgroundImage: "url(".concat(value, ")")
    }
  }));
}