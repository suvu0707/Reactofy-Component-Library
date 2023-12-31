"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.defaultRowRenderer = defaultRowRenderer;
var _react = _interopRequireWildcard(require("react"));
var _clsx = require("clsx");
var _Cell = _interopRequireDefault(require("./Cell"));
var _hooks = require("./hooks");
var _utils = require("./utils");
var _style = require("./style");
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
const _excluded = ["className", "indexR", "styleR", "rowIdx", "gridTemplateColumns", "rowArray", "gridRowStart", "height", "selectedCellIdx", "isRowSelected", "copiedCellIdx", "draggedOverCellIdx", "lastFrozenColumnIndex", "api", "row", "selectedCellRowStyle", "rows", "node", "viewportColumns", "selectedCellEditor", "selectedCellDragHandle", "onRowClick", "onRowDoubleClick", "rowClass", "setDraggedOverRowIdx", "onMouseEnter", "onRowChange", "selectCell", "totalColumns", "subColumn", "handleReorderRow", "onCellClick", "onCellDoubleClick", "onCellContextMenu", "columnApi", "valueChangedCellStyle", "previousData", "selectedPosition", "rowFreezLastIndex", "summaryRowHeight", "headerheight"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Row(_ref, ref) {
  var _row$id;
  let {
      className,
      indexR,
      styleR,
      rowIdx,
      gridTemplateColumns,
      rowArray,
      gridRowStart,
      height,
      selectedCellIdx,
      isRowSelected,
      copiedCellIdx,
      draggedOverCellIdx,
      lastFrozenColumnIndex,
      api,
      row,
      selectedCellRowStyle,
      rows,
      node,
      viewportColumns,
      selectedCellEditor,
      selectedCellDragHandle,
      onRowClick,
      onRowDoubleClick,
      rowClass,
      setDraggedOverRowIdx,
      onMouseEnter,
      onRowChange,
      selectCell,
      totalColumns,
      subColumn,
      handleReorderRow,
      onCellClick,
      onCellDoubleClick,
      onCellContextMenu,
      columnApi,
      valueChangedCellStyle,
      previousData,
      selectedPosition,
      rowFreezLastIndex,
      summaryRowHeight,
      headerheight
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const handleRowChange = (0, _hooks.useLatestFunc)((column, newRow) => {
    onRowChange(column, rowIdx, newRow);
  });
  function handleDragEnter(event) {
    setDraggedOverRowIdx === null || setDraggedOverRowIdx === void 0 || setDraggedOverRowIdx(rowIdx);
    onMouseEnter === null || onMouseEnter === void 0 || onMouseEnter(event);
  }
  className = (0, _clsx.clsx)(_style.rowClassname, "rdg-row-".concat(rowIdx % 2 === 0 ? "even" : "odd"), {
    [_style.rowSelectedClassname]: isRowSelected
  }, rowClass === null || rowClass === void 0 ? void 0 : rowClass(row), className);
  const cells = [];
  for (let index = 0; index < viewportColumns.length; index++) {
    const column = _objectSpread(_objectSpread({}, viewportColumns[index]), {}, {
      rowIndex: rowIdx
    });
    const {
      idx
    } = column;
    const colSpan = (0, _utils.getColSpan)(column, lastFrozenColumnIndex, {
      type: "ROW",
      row,
      rowIndex: rowIdx
    });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }
    const isCellSelected = selectedCellIdx === idx;
    cells.push( /*#__PURE__*/_react.default.createElement(_Cell.default, {
      key: "".concat(column.key),
      column: column,
      colSpan: colSpan,
      selectedCellIdx: selectedCellIdx,
      selectedCellEditor: selectedCellEditor,
      api: api,
      viewportColumns: viewportColumns,
      rowArray: rowArray,
      row: row,
      handleReorderRow: handleReorderRow,
      isRowSelected: isRowSelected,
      allrow: rows,
      rowIndex: rowIdx,
      totalColumns: totalColumns,
      node: node,
      isCopied: copiedCellIdx === idx,
      isDraggedOver: draggedOverCellIdx === idx,
      isCellSelected: isCellSelected,
      dragHandle: isCellSelected ? selectedCellDragHandle : undefined,
      onRowClick: onRowClick,
      onRowDoubleClick: onRowDoubleClick,
      onRowChange: handleRowChange,
      subColumn: subColumn,
      selectCell: selectCell,
      onCellClick: onCellClick,
      onCellDoubleClick: onCellDoubleClick,
      onCellContextMenu: onCellContextMenu,
      columnApi: columnApi,
      valueChangedCellStyle: valueChangedCellStyle,
      previousData: previousData,
      summaryRowHeight: summaryRowHeight,
      rowFreezLastIndex: rowFreezLastIndex,
      headerheight: headerheight
    }));
  }
  // }
  let style = (0, _utils.getRowStyle)(gridRowStart, height);
  if (rowIdx === selectedPosition.rowIdx) {
    style = _objectSpread(_objectSpread({}, style), selectedCellRowStyle);
  }
  return /*#__PURE__*/_react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend
  }, /*#__PURE__*/_react.default.createElement(_hooks.RowSelectionProvider, {
    value: isRowSelected
  }, /*#__PURE__*/_react.default.createElement("div", _extends({
    role: "row",
    ref: ref,
    id: (_row$id = row === null || row === void 0 ? void 0 : row.id) !== null && _row$id !== void 0 ? _row$id : rowIdx,
    className: className,
    onMouseEnter: handleDragEnter,
    style: style
  }, props), cells)));
}
const RowComponent = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Row));
var _default = exports.default = RowComponent;
function defaultRowRenderer(key, props) {
  return /*#__PURE__*/_react.default.createElement(RowComponent, _extends({
    key: key
  }, props));
}