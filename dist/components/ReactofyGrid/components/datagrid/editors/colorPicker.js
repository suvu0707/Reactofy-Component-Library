"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorInputClassname = void 0;
exports.default = ColorPicker;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _core = require("@linaria/core");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const colorInput = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.ColorInput {\n    /* display: none; */\n    all: unset;\n    width: 0;\n  }\n"])));
const colorInputClassname = "rdg-color-input ".concat(colorInput);
exports.colorInputClassname = colorInputClassname;
function ColorPicker(_ref) {
  var _row$column$key;
  let {
    row,
    column,
    onRowChange
  } = _ref;
  let ref = (0, _react.useRef)(null);
  const handleClick = () => {
    ref.current.click();
    setClicked(true);
  };
  const checkbox = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    @layer rdg.ColorPicker {\n      height: 100%;\n      width: 80%;\n    }\n  "])));
  const colorPickerClassname = "rdg-colorPicker ".concat(checkbox);
  const iconClass = (0, _core.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    width: 22px;\n    height: 100%;\n    background-color: white;\n    background-image: linear-gradient(45deg, transparent 50%, white 50%),\n      linear-gradient(135deg, white 50%, transparent 50%),\n      radial-gradient(#95b3d7 100%, transparent 72%);\n\n    background-position: calc(100% - 10px) calc(8px), calc(100% - 6px) calc(8px),\n      calc(100% - 2px) 2px;\n\n    background-size: 5px 5px, 5px 6px, 1.5em 1.5em;\n    background-repeat: no-repeat;\n  "])));
  const iconClassclicked = (0, _core.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    width: 22px;\n    height: 100%;\n    background-image: linear-gradient(45deg, white 50%, transparent 50%),\n      linear-gradient(135deg, transparent 50%, white 50%),\n      radial-gradient(#95b3d7 100%, transparent 72%);\n    background-position: calc(100% - 5px) 8px, calc(100% - 9px) 8px,\n      calc(100% - 2px) 2px;\n    background-size: 5px 5px, 5px 5px, 1.5em 1.5em;\n    background-repeat: no-repeat;\n    background-repeat: no-repeat;\n  "])));
  const [clicked, setClicked] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleClick,
    style: {
      display: "flex",
      flexDirection: "row",
      height: "20px",
      margin: "2px 0"
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "color",
    ref: ref,
    id: "color".concat(column.rowIndex),
    className: colorInputClassname,
    value: row[column.key],
    onChange: event => {
      onRowChange(_objectSpread(_objectSpread({}, row), {}, {
        [column.key]: event.target.value
      }));
      setClicked(false);
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: colorPickerClassname,
    style: {
      backgroundColor: "".concat((_row$column$key = row[column.key]) !== null && _row$column$key !== void 0 ? _row$column$key : "white")
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: iconClass
  }));
}