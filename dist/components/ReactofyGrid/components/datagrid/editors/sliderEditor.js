"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SliderEditor;
exports.sliderEditorClassname = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _templateObject, _templateObject2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const sliderContainer = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n"])));
const sliderEditorInternalClassname = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.SliderEditor {\n    cursor: pointer;\n    width: 85%;\n    font-size: var(--rdg-font-size);\n    font-family: var(--rdg-font-family);\n  }\n"])));
const sliderEditorClassname = "rdg-slider-editor ".concat(sliderEditorInternalClassname);
exports.sliderEditorClassname = sliderEditorClassname;
function SliderEditor(_ref) {
  let {
    row,
    column,
    onRowChange
  } = _ref;
  const value = row[column.key];
  return /*#__PURE__*/_react.default.createElement("div", {
    className: sliderContainer
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    type: "range",
    value: value,
    className: sliderEditorClassname
  }, column.inputProps, {
    onChange: e => {
      onRowChange(_objectSpread(_objectSpread({}, row), {}, {
        [column.key]: e.target.value
      }));
    }
  })), Math.round(value), "%");
}