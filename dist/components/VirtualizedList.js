"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function VirtualizedList(_ref) {
  let {
    multiSelect,
    items,
    selectedOptions,
    optionHeight,
    containerWidth,
    containerHeight,
    handleOptionClick,
    checked
  } = _ref;
  const [scrollTop, setScrollTop] = (0, _react.useState)(0);
  const startIndex = Math.floor(scrollTop / optionHeight);
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / optionHeight), items.length);
  const visibleItems = items.slice(startIndex, endIndex);
  const invisibleItemsHeight = (startIndex + visibleItems.length - endIndex) * optionHeight;
  const containerRef = (0, _react.useRef)(null);
  const handleScroll = event => {
    setScrollTop(event.target.scrollTop);
  };
  (0, _react.useEffect)(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    style: {
      height: "".concat(containerHeight, "px"),
      width: "".concat(containerWidth, "px"),
      overflowY: "auto",
      background: "white"
    },
    onScroll: handleScroll
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "".concat(items.length * optionHeight, "px")
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "relative",
      height: "".concat(visibleItems.length * optionHeight, "px"),
      top: "".concat(startIndex * optionHeight, "px")
    }
  }, visibleItems.map(item => /*#__PURE__*/_react.default.createElement("div", {
    key: item.value,
    style: {
      height: "".concat(optionHeight, "px"),
      cursor: "pointer",
      display: "flex",
      alignItems: "center"
    },
    onClick: () => handleOptionClick(item)
  }, multiSelect && /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: selectedOptions.includes(item)
  }), item.label))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "".concat(invisibleItemsHeight, "px")
    }
  })));
}
var _default = exports.default = VirtualizedList;