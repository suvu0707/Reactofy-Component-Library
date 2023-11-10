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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(TreeCell);