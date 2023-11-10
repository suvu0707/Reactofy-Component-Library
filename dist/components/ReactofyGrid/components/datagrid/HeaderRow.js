"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _clsx = require("clsx");
var _core = require("@linaria/core");
var _HeaderCell = _interopRequireDefault(require("./HeaderCell"));
var _utils = require("./utils");
var _style = require("./style");
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
const _excluded = ["columns", "rows", "arrayDepth", "headerheight", "cellHeight", "headerData", "allRowsSelected", "headerRowHeight", "onAllRowsSelectionChange", "onColumnResize", "sortColumns", "onSortColumnsChange", "lastFrozenColumnIndex", "selectedCellIdx", "selectCell", "selectedCellHeaderStyle", "selectedPosition", "shouldFocusGrid", "direction", "setFilters", "setFilterType", "handleReorderColumn", "gridWidth"];
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const headerRow = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.HeaderRow {\n    display: contents;\n    line-height: var(--rdg-header-row-height);\n    background-color: var(--rdg-header-background-color);\n    font-weight: bold;\n    color: var(--rdg-header-row-color);\n    font-size: 11px;\n    text-align: center;\n\n    & > .", " {\n      /* Should have a higher value than 0 to show up above regular cells */\n      z-index: 1;\n      position: sticky;\n      inset-block-start: 0;\n    }\n\n    & > .", " {\n      z-index: 2;\n    }\n  }\n"])), _style.cell, _style.cellFrozen);
const headerRowClassname = "rdg-header-row ".concat(headerRow);
function HeaderRow(_ref) {
  let {
      columns,
      rows,
      arrayDepth,
      headerheight,
      cellHeight,
      headerData,
      allRowsSelected,
      headerRowHeight,
      onAllRowsSelectionChange,
      onColumnResize,
      sortColumns,
      onSortColumnsChange,
      lastFrozenColumnIndex,
      selectedCellIdx,
      selectCell,
      selectedCellHeaderStyle,
      selectedPosition,
      shouldFocusGrid,
      direction,
      setFilters,
      setFilterType,
      handleReorderColumn,
      gridWidth
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const cells = [];
  function ChildColumnSetup(data) {
    props.ChildColumnSetup(data);
  }
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index];
    const colSpan = (0, _utils.getColSpan)(column, lastFrozenColumnIndex, {
      type: "HEADER"
    });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }
    cells.push( /*#__PURE__*/_react.default.createElement(_HeaderCell.default, {
      key: "".concat(column.key),
      column: column,
      rows: rows,
      handleReorderColumn: handleReorderColumn,
      columns: columns,
      cellHeight: cellHeight,
      arrayDepth: arrayDepth,
      headerRowHeight: headerRowHeight,
      cellData: headerData,
      colSpan: colSpan,
      selectedPosition: selectedPosition,
      selectedCellHeaderStyle: selectedCellHeaderStyle,
      isCellSelected: selectedCellIdx === column.idx,
      selectedCellIdx: selectedCellIdx,
      onColumnResize: onColumnResize,
      allRowsSelected: allRowsSelected,
      onAllRowsSelectionChange: onAllRowsSelectionChange,
      onSortColumnsChange: onSortColumnsChange,
      sortColumns: sortColumns,
      selectCell: selectCell,
      shouldFocusGrid: shouldFocusGrid && index === 0,
      direction: direction,
      setFilters: setFilters,
      setFilterType: setFilterType,
      ChildColumnSetup: ChildColumnSetup,
      gridWidth: gridWidth
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend
  }, /*#__PURE__*/_react.default.createElement("div", {
    role: "row"
    // aria-rowindex is 1 based
    ,
    "aria-rowindex": 1,
    className: (0, _clsx.clsx)(headerRowClassname, {
      // [rowSelectedClassname]: selectedCellIdx === -1,
    }),
    style: (0, _utils.getRowStyle)(1)
  }, cells));
}
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(HeaderRow);