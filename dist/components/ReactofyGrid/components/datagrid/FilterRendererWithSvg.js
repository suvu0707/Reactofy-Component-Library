"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterRendererWithSvg = FilterRendererWithSvg;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function FilterRendererWithSvg(column, filterClassname, filters, setFilters, setFilterType, gridWidth) {
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const [buttonRect, setButtonRect] = (0, _react.useState)(null);
  const tooltipRef = (0, _react.useRef)(null);
  const handleButtonClick = event => {
    setButtonRect(event.target.getBoundingClientRect());
    if (isOpen === false) {
      setIsOpen(true);
    } else if (isOpen === true) {
      setIsOpen(false);
    }
  };
  (0, _react.useEffect)(() => {
    const handleClickOutside = event => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef]);

  // Calculate the left position of the tooltip based on the buttonRect and viewport width
  const left = buttonRect && buttonRect.left + window.pageXOffset;
  const tooltipWidth = 200;
  console.log("viewportWidth", tooltipRef, tooltipWidth);
  const tooltipLeft = left + tooltipWidth > gridWidth ? left - tooltipWidth : left;
  const getFilterValue = (0, _react.useCallback)(event => {
    const value = event.target.value;
    setFilterType(value);
  }, [setFilterType]);
  const getInputValue = (0, _react.useCallback)((event, filters) => {
    const value = event.target.value;
    setFilters(_objectSpread(_objectSpread({}, filters), {}, {
      [column.field]: value
    }));
  }, [setFilters, column.field]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: filterClassname
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10px",
    height: "10px",
    version: "1.1"
    // style="shapeRendering:geometricPrecision; textRendering:geometricPrecision; imageRendering:optimizeQuality; fillRule:evenodd; clipRule:evenodd"
    ,
    viewBox: "0 0 507 511.644",
    onClick: handleButtonClick,
    fill: "white"
  }, /*#__PURE__*/_react.default.createElement("g", {
    id: "Layer_x0020_1"
  }, /*#__PURE__*/_react.default.createElement("metadata", {
    id: "CorelCorpID_0Corel-Layer"
  }), /*#__PURE__*/_react.default.createElement("path", {
    class: "fil0",
    d: "M192.557 241.772c5.368,5.842 8.316,13.476 8.316,21.371l0 232.663c0,14.002 16.897,21.109 26.898,11.265l64.905 -74.378c8.684,-10.422 13.475,-15.581 13.475,-25.901l0 -143.597c0,-7.897 3.001,-15.529 8.318,-21.373l186.236 -202.081c13.947,-15.159 3.21,-39.741 -17.424,-39.741l-459.536 0c-14.188,0 -23.722,11.594 -23.745,23.784 -0.01,5.541 1.945,11.204 6.321,15.957l186.236 202.031 0 0z"
  }))), isOpen ? /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/_react.default.createElement("div", {
    ref: tooltipRef,
    style: {
      position: "absolute",
      zIndex: 1300,
      top: buttonRect.top + buttonRect.height,
      left: tooltipLeft
      // background:"white",
      // padding:"4px",
      // // width:"178px",
      // boxSizing:"border-box",
      // borderRadious:"4px"
    },

    className: "popover"
  }, /*#__PURE__*/_react.default.createElement("form", {
    style: {
      width: "200px",
      padding: "10px 10px",
      background: "white",
      borderRadius: "6px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)"
    }
  }, /*#__PURE__*/_react.default.createElement("select", {
    style: {
      background: "rgba(255,255,255,0.1)",
      fontSize: "16px",
      height: "24px",
      margin: 0,
      outline: 0,
      border: '1px solid #b6b6b6',
      width: "100%",
      backgroundColor: "#e8eeef",
      color: "black",
      boxShadow: "0 1px 0 rgba(0,0,0,0.03) inset",
      marginBottom: "10px",
      borderRadius: "2px"
    },
    onChange: getFilterValue
  }, /*#__PURE__*/_react.default.createElement("option", null, "Contain"), /*#__PURE__*/_react.default.createElement("option", null, "Starts With..."), /*#__PURE__*/_react.default.createElement("option", null, "Ends With..."), /*#__PURE__*/_react.default.createElement("option", null, "Equals"), /*#__PURE__*/_react.default.createElement("option", null, "Not Equals")), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    style: {
      background: "rgba(255,255,255,0.1)",
      fontSize: "16px",
      height: "24px",
      margin: 0,
      outline: 0,
      border: '1px solid #b6b6b6',
      boxSizing: "border-box",
      width: "100%",
      backgroundColor: "#e8eeef",
      color: "black",
      boxShadow: "0 1px 0 rgba(0,0,0,0.03) inset",
      marginBottom: "0px",
      borderRadius: "2px"
    },
    value: filters === null || filters === void 0 ? void 0 : filters[column.field],
    placeholder: "Search...",
    onChange: e => getInputValue(e, filters),
    onKeyDown: inputStopPropagation
  }))), document.body) : null);
}
function inputStopPropagation(event) {
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.stopPropagation();
  }
}