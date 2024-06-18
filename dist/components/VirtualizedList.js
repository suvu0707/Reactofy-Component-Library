"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
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
    search,
    searchInput,
    setSearchInput
  } = _ref;
  const [scrollTop, setScrollTop] = (0, _react.useState)(0);
  const startIndex = Math.floor(scrollTop / optionHeight);
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / optionHeight), items.length);
  const visibleItems = items.slice(startIndex, endIndex);
  const invisibleItemsHeight = (items.length - visibleItems.length) * optionHeight;
  const containerRef = (0, _react.useRef)(null);
  const handleScroll = event => {
    setScrollTop(event.target.scrollTop);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "virtualized-list"
  }, search && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100%",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "1px solid #000",
      backgroundColor: "#f3f3ff"
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    style: {
      width: "85%",
      height: "24px"
    },
    placeholder: "Search Your Item",
    value: searchInput,
    onChange: e => setSearchInput(e.target.value)
  })), visibleItems.length === 0 ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "".concat(40, "px"),
      width: "".concat(containerWidth, "px"),
      color: "grey"
    }
  }, "No option found") : /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    style: {
      height: "".concat(containerHeight, "px"),
      width: "".concat(containerWidth, "px"),
      overflowY: "auto",
      background: "white",
      boxSizing: "border-box"
    },
    onScroll: handleScroll
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "".concat(items.length * optionHeight, "px"),
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      top: "".concat(startIndex * optionHeight, "px"),
      width: "100%"
    }
  }, visibleItems.map(item => /*#__PURE__*/_react.default.createElement("div", {
    key: item.value,
    className: "virtualized-list-item",
    style: {
      height: "".concat(optionHeight, "px"),
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #ccc"
    },
    onClick: () => handleOptionClick(item)
  }, multiSelect && /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: selectedOptions.includes(item),
    style: {
      cursor: "pointer"
    },
    readOnly: true
  }), item.label))))));
}
var _default = exports.default = VirtualizedList;