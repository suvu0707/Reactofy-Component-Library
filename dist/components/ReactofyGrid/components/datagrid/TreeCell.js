"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
var _useRovingCellRef = require("./hooks/useRovingCellRef");
var _core = require("@linaria/core");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function TreeCell(_ref) {
  var _column$treeFormatter;
  let {
    id,
    childRows,
    isExpanded,
    isCellSelected,
    column,
    row,
    groupColumnIndex,
    toggleTree: toggleTreeWrapper,
    level
  } = _ref;
  const {
    ref,
    tabIndex,
    onFocus
  } = (0, _useRovingCellRef.useRovingCellRef)(isCellSelected);
  function toggleTree() {
    toggleTreeWrapper(id);
  }
  const style = (0, _utils.getCellStyle)(column);
  return (
    /*#__PURE__*/
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    _react.default.createElement("div", {
      role: "gridcell",
      "aria-colindex": column.idx + 1,
      "aria-selected": isCellSelected,
      ref: ref,
      tabIndex: tabIndex,
      key: column.key,
      className: (0, _utils.getCellClassname)(column),
      style: _objectSpread(_objectSpread({}, style), {}, {
        display: "flex",
        width: "100%",
        justifyContent: "center"
      })
      //   onClick={isLevelMatching ? toggleGroup : undefined}
      ,
      onFocus: onFocus,
      onDoubleClick: toggleTree
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tree-expand-icon",
      style: {
        width: "30%",
        textAlign: "start"
      }
    }, column.idx < 1 && /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "black",
        fontSize: "12px",
        cursor: "pointer",
        paddingLeft: "".concat(level * 10 + 10, "px")
      },
      onClick: toggleTree
    }, isExpanded ? '\u25BC' : '\u25B6')), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: "70%",
        textAlign: "start",
        paddingLeft: "".concat(level * 5 + 5, "px")
      }
    }, (!column.rowGroup || groupColumnIndex === column.idx) && ((_column$treeFormatter = column.treeFormatter) === null || _column$treeFormatter === void 0 ? void 0 : _column$treeFormatter.call(column, {
      childRows,
      column,
      row,
      isExpanded,
      isCellSelected,
      toggleTree
    }))))
  );
}
var _default = /*#__PURE__*/(0, _react.memo)(TreeCell);
exports.default = _default;