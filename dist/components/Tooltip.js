"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolTip = ToolTip;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ToolTip() {
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
  const tooltipLeft = left + tooltipWidth > 300 ? left - tooltipWidth : left;
  return /*#__PURE__*/_react.default.createElement("div", null, isOpen ? /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/_react.default.createElement("div", {
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
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "200px",
      padding: "10px 10px",
      background: "white",
      borderRadius: "6px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)"
    }
  }, "Please Select Combobox Value")), document.body) : null);
}