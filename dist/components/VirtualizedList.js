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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var _default = VirtualizedList;
exports.default = _default;