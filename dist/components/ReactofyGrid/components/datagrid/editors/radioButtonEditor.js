"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RadioButtonEditor;
var _core = require("@linaria/core");
var _templateObject, _templateObject2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function RadioButtonEditor(_ref) {
  let {
    row,
    column,
    onRowChange
  } = _ref;
  const options = column.options ? column.options : column.buttons;
  const radioButtonContainer = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    font-size: var(--rdg-font-size);\n    font-family: var(--rdg-font-family);\n    flex-direction: row;\n    & > div {\n      display: flex;\n      align-items: center;\n    }\n  "])));
  const radioButton = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    width: 12px;\n    height: 12px;\n    /* UI Properties */\n    background: #ffffff;\n    border: 0.9998000264167786px solid #95b3d7;\n    border-radius: 50%;\n    padding: 2px;\n    &:checked {\n      background-clip: content-box;\n      background-color: #366092;\n    }\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n  "])));
  return /*#__PURE__*/React.createElement("div", {
    className: "rdg-radio-container".concat(radioButtonContainer)
  }, options.map((option, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      value: option.value,
      className: "rdg-radiobutton ".concat(radioButton),
      key: index,
      name: "options".concat(column.rowIndex),
      checked: row[column.key] === (option === null || option === void 0 ? void 0 : option.value),
      onChange: event => {
        onRowChange(_objectSpread(_objectSpread({}, row), {}, {
          [column.key]: event.target.value
        }));
      }
    }), /*#__PURE__*/React.createElement("label", null, option.label));
  }));
}