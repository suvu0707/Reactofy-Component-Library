"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextEditor;
exports.textEditorClassname = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
const _excluded = ["row", "column", "onRowChange", "onClose"];
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const textEditorInternalClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.TextEditor {\n    appearance: none;\n    box-sizing: border-box;\n    inline-size: 100%;\n    block-size: 100%;\n    height: 20px;\n    margin: 2px 0;\n    padding-block: 0;\n    padding-inline: 6px;\n    border: none;\n    vertical-align: top;\n    color: var(--rdg-color);\n    background-color: var(--rdg-background-color);\n    font-family: inherit;\n    font-size: var(--rdg-font-size);\n\n    &:focus {\n      border-color: var(--rdg-selection-color);\n      outline: none;\n    }\n\n    &::placeholder {\n      color: #999;\n      opacity: 1;\n    }\n  }\n"])));
const textEditorClassname = "rdg-text-editor ".concat(textEditorInternalClassname);
exports.textEditorClassname = textEditorClassname;
function TextEditor(_ref) {
  let {
      row,
      column,
      onRowChange,
      onClose
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var type = column.type ? column.type : "text";
  type = type.toLowerCase() === "masked" || type.toLowerCase() === "mask" ? "password" : type;
  let value = row[column.key];
  return /*#__PURE__*/_react.default.createElement("input", _extends({
    spellCheck: "true",
    role: "gridcellTextbox",
    className: textEditorClassname,
    type: type,
    disabled: column.editable ? column.editable : false,
    value: value
  }, column.inputProps, {
    onChange: event => onRowChange(_objectSpread(_objectSpread({}, row), {}, {
      [column.key]: event.target.value
    }))
  }));
}