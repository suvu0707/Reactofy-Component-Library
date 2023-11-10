"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonClassname = void 0;
exports.default = ButtonEditor;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
const _excluded = ["row", "column"];
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const buttonInternalClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.ButtonEditor {\n    height: 22px;\n    background-color: #4f81bd;\n    color: #ffffff;\n    border: 1px solid #ffffff;\n    cursor: pointer;\n    font-size: var(--rdg-font-size);\n    font-family: var(--rdg-font-family);\n\n    &:focus {\n      background-color: #446ea1;\n    }\n  }\n"])));
const buttonClassname = exports.buttonClassname = "rdg-button-editor ".concat(buttonInternalClassname);
function ButtonEditor(_ref) {
  var _column$inputProps, _column$inputProps2;
  let {
      row,
      column
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  let text;
  if (((_column$inputProps = column.inputProps) === null || _column$inputProps === void 0 ? void 0 : _column$inputProps.text) !== undefined || ((_column$inputProps2 = column.inputProps) === null || _column$inputProps2 === void 0 ? void 0 : _column$inputProps2.text) !== "") {
    var _column$inputProps3;
    text = (_column$inputProps3 = column.inputProps) === null || _column$inputProps3 === void 0 ? void 0 : _column$inputProps3.text;
  } else if (row[column.key] !== undefined || row[column.key] !== "") {
    text = row[column.key];
  } else {
    text = column.headerName;
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", _extends({
    className: buttonClassname,
    disabled: column.editable ? column.editable : false,
    onClick: () => column.onClick(_objectSpread({
      row,
      column
    }, props))
  }, column.inputProps), text));
}