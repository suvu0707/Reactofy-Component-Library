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
require("core-js/modules/es.string.starts-with.js");
var _react = _interopRequireWildcard(require("react"));
var _VirtualizedList = _interopRequireDefault(require("./VirtualizedList"));
var _ArrowDropDown = _interopRequireDefault(require("@mui/icons-material/ArrowDropDown"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _ToolTip = _interopRequireDefault(require("./ToolTip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Combobox(_ref) {
  let {
    options,
    valueKey,
    labelKey,
    multiSelect,
    search,
    containerHeight,
    optionHeight,
    containerWidth,
    getSelectedOptions,
    iconWidth
  } = _ref;
  const [isOpen, setIsOpen] = (0, _react.useState)();
  const [checked, setChecked] = (0, _react.useState)(false);
  const [selectedOptions, setSelectedOptions] = (0, _react.useState)([]);
  const [selectedOption, setSelectedOption] = (0, _react.useState)(null);
  const [isToolTipOpen, setIsToolTipOpen] = (0, _react.useState)(false);
  const [loadedOptions, setLoadedOptions] = (0, _react.useState)([]);
  const [searchInput, setSearchInput] = (0, _react.useState)(""); // State
  const containerRef = (0, _react.useRef)(null);
  const isMounted = (0, _react.useRef)(true);
  const modifiedOptions = options === null || options === void 0 ? void 0 : options.map(obj => {
    return {
      value: obj[valueKey],
      label: obj[labelKey]
    };
  });
  (0, _react.useEffect)(() => {
    setLoadedOptions(modifiedOptions ? modifiedOptions : []);
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  getSelectedOptions && getSelectedOptions(selectedOptions.length > 0 ? selectedOptions : selectedOption);
  const handleOptionClick = option => {
    setSearchInput("");
    setIsToolTipOpen(false);
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      // setSelectedOption( option);
      setIsOpen(false);
    }
  };
  const handleClickOutside = event => {
    setSearchInput("");
    if (containerRef.current && !containerRef.current.contains(event.target) && event.target !== containerRef.current.previousSibling) {
      setIsOpen(false);
    }
  };
  (0, _react.useEffect)(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const cleanup = () => {
      if (isMounted.current) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
    window.addEventListener("beforeunload", cleanup);
    return () => {
      cleanup();
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);
  const filteredOptions = loadedOptions.filter(option => {
    var _option$label;
    return (_option$label = option.label) === null || _option$label === void 0 ? void 0 : _option$label.toLowerCase().startsWith(searchInput === null || searchInput === void 0 ? void 0 : searchInput.toLowerCase());
  });
  const optionsForMultiSelect = selectedOptions.length > 0 ? selectedOptions.map(item => item.label).join(", ") : "Select an item";
  console.log("optionsForMultiSelect", selectedOptions.length);
  const optionsForSingleSelect = selectedOption ? selectedOption.label : "Select an item";
  const contHeight = containerHeight ? containerHeight : 200;
  const optHeight = optionHeight ? optionHeight : 24;
  let totalOptionsHeight;
  if (filteredOptions.length * optHeight < contHeight && filteredOptions.length > 0) {
    totalOptionsHeight = filteredOptions.length * optHeight;
  } else if (filteredOptions.length === 0) {
    totalOptionsHeight = optHeight;
  } else {
    totalOptionsHeight = contHeight;
  }
  console.log("filteredOptions", contHeight, optHeight, totalOptionsHeight);
  const onHandleClick = () => {
    setIsOpen(!isOpen);
  };
  const toggleIconWidth = iconWidth ? iconWidth : 24;
  const handleToolTipOpen = () => {
    if (isOpen === false && selectedOptions.length === 0) {
      setIsToolTipOpen(true);
    } else {
      setIsToolTipOpen(false);
    }
  };

  // Calculate the left position of the tooltip based on the buttonRect and viewport width

  const stopPropagation = event => {
    event.stopPropagation();
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    className: "large-combobox ".concat(isOpen ? "open" : ""),
    style: {
      cursor: "pointer",
      width: "max-content"
    },
    role: "combobox",
    onMouseEnter: handleToolTipOpen,
    onMouseLeave: () => setIsToolTipOpen(false)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "combobox-header",
    onClick: toggleDropdown,
    style: {
      width: "".concat(containerWidth ? containerWidth : 145, "px"),
      border: "1px solid ".concat(isOpen === false && selectedOptions.length === 0 ? "red" : "blue"),
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "white",
      boxSizing: "border-box"
    }
  }, search && /*#__PURE__*/_react.default.createElement("input", {
    style: {
      width: "".concat(containerWidth - 24, "px"),
      position: "absolute",
      boxSizing: "border-box",
      top: "0px",
      zIndex: isOpen ? 1 : -1
    },
    placeholder: "Search Your Item",
    value: searchInput,
    onChange: e => setSearchInput(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "".concat(containerWidth - toggleIconWidth, "px")
    }
  }, optionsForMultiSelect), /*#__PURE__*/_react.default.createElement("div", {
    onClick: onHandleClick,
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowDropDown.default, {
    style: {
      transform: isOpen === false || isOpen === undefined ? "rotate(0deg)" : "rotate(180deg)",
      fill: "white",
      background: "blue",
      stroke: "blue",
      height: "100%",
      position: "absolute",
      right: 0,
      bottom: 0
    }
  })), isToolTipOpen && /*#__PURE__*/_react.default.createElement(_ToolTip.default, {
    stopPropagation: stopPropagation
  })), isOpen && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      zIndex: 9999
    }
  }, /*#__PURE__*/_react.default.createElement(_VirtualizedList.default, {
    multiSelect: multiSelect,
    checked: checked,
    items: filteredOptions,
    selectedOptions: selectedOptions,
    optionHeight: optHeight,
    containerWidth: containerWidth ? containerWidth : 145,
    containerHeight: totalOptionsHeight,
    handleOptionClick: handleOptionClick
  })));
}
var _default = exports.default = Combobox;