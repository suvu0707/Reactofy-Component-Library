"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalculatedColumns = useCalculatedColumns;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _formatters = require("../formatters");
var _Columns = require("../Columns");
var _utils = require("../utils");
var _textEditor = require("../editors/textEditor");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const DEFAULT_COLUMN_WIDTH = "auto";
const DEFAULT_COLUMN_MIN_WIDTH = 40;
function useCalculatedColumns(_ref) {
  var _defaultColumnOptions, _defaultColumnOptions2, _defaultColumnOptions3, _defaultColumnOptions4, _defaultColumnOptions5, _defaultColumnOptions6, _defaultColumnOptions7;
  let {
    newData,
    columnWidths,
    viewportWidth,
    scrollLeft,
    defaultColumnOptions,
    rawGroupBy,
    enableVirtualization,
    frameworkComponents,
    treeData
  } = _ref;
  const defaultWidth = (_defaultColumnOptions = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.width) !== null && _defaultColumnOptions !== void 0 ? _defaultColumnOptions : DEFAULT_COLUMN_WIDTH;
  const defaultMinWidth = (_defaultColumnOptions2 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.minWidth) !== null && _defaultColumnOptions2 !== void 0 ? _defaultColumnOptions2 : DEFAULT_COLUMN_MIN_WIDTH;
  const defaultMaxWidth = (_defaultColumnOptions3 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.maxWidth) !== null && _defaultColumnOptions3 !== void 0 ? _defaultColumnOptions3 : undefined;
  const defaultFormatter = (_defaultColumnOptions4 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.formatter) !== null && _defaultColumnOptions4 !== void 0 ? _defaultColumnOptions4 : _formatters.valueFormatter;
  const defaultSortable = (_defaultColumnOptions5 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.sortable) !== null && _defaultColumnOptions5 !== void 0 ? _defaultColumnOptions5 : false;
  const defaultResizable = (_defaultColumnOptions6 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.resizable) !== null && _defaultColumnOptions6 !== void 0 ? _defaultColumnOptions6 : false;
  const defaultFilter = (_defaultColumnOptions7 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.dilter) !== null && _defaultColumnOptions7 !== void 0 ? _defaultColumnOptions7 : false;
  const {
    columns,
    colSpanColumns,
    lastFrozenColumnIndex,
    groupBy
  } = (0, _react.useMemo)(() => {
    // Filter rawGroupBy and ignore keys that do not match the columns prop
    const groupBy = [];
    let lastFrozenColumnIndex = -1;
    const columns = newData === null || newData === void 0 ? void 0 : newData.map((rawColumn, pos) => {
      var _rawGroupBy$includes, _rawColumn$field, _rawColumn$width, _rawColumn$minWidth, _rawColumn$maxWidth, _rawColumn$sortable, _rawColumn$resizable, _rawColumn$valueForma, _rawColumn$filter, _ref4, _ref5, _frameworkComponents$2;
      const rowGroup = (_rawGroupBy$includes = rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.includes(rawColumn.field)) !== null && _rawGroupBy$includes !== void 0 ? _rawGroupBy$includes : false;
      const frozen = rowGroup || rawColumn.frozen;
      const cellRendererValue = rawColumn.cellRenderer;
      const components = frameworkComponents ? Object.keys(frameworkComponents) : null;
      const indexOfComponent = components === null || components === void 0 ? void 0 : components.indexOf(cellRendererValue);
      const customComponentName = indexOfComponent > -1 ? components[indexOfComponent] : null;
      let recursiveChild = (subChild, rawColumn) => {
        return (subChild === null || subChild === void 0 ? void 0 : subChild.haveChildren) === true && Array.isArray(subChild === null || subChild === void 0 ? void 0 : subChild.children) && (subChild === null || subChild === void 0 ? void 0 : subChild.children.map((subChild2, index1) => {
          var _subChild2$valueForma, _subChild2$filter, _ref2, _ref3, _frameworkComponents$;
          const rawChild2 = _objectSpread(_objectSpread({}, subChild2), {}, {
            parent: subChild.field,
            formatter: subChild2.cellRenderer ? subChild2.cellRenderer : (_subChild2$valueForma = subChild2.valueFormatter) !== null && _subChild2$valueForma !== void 0 ? _subChild2$valueForma : defaultFormatter,
            filter: (_subChild2$filter = subChild2.filter) !== null && _subChild2$filter !== void 0 ? _subChild2$filter : defaultFilter,
            cellRenderer: (_ref2 = (_ref3 = (_frameworkComponents$ = frameworkComponents === null || frameworkComponents === void 0 ? void 0 : frameworkComponents[customComponentName]) !== null && _frameworkComponents$ !== void 0 ? _frameworkComponents$ : subChild2.cellRenderer) !== null && _ref3 !== void 0 ? _ref3 : subChild2.valueFormatter) !== null && _ref2 !== void 0 ? _ref2 : defaultFormatter,
            children: recursiveChild(subChild2, rawColumn),
            // idx: index1,
            key: subChild2.field
          });
          return rawChild2;
        }));
      };
      const column = _objectSpread(_objectSpread({}, rawColumn), {}, {
        colId: rawColumn.field,
        key: (_rawColumn$field = rawColumn.field) !== null && _rawColumn$field !== void 0 ? _rawColumn$field : rawColumn.key,
        userProvidedColDef: rawColumn,
        parent: null,
        idx: 0,
        index: pos,
        frozen,
        isLastFrozenColumn: false,
        rowGroup,
        width: (_rawColumn$width = rawColumn.width) !== null && _rawColumn$width !== void 0 ? _rawColumn$width : defaultWidth,
        minWidth: (_rawColumn$minWidth = rawColumn.minWidth) !== null && _rawColumn$minWidth !== void 0 ? _rawColumn$minWidth : defaultMinWidth,
        maxWidth: (_rawColumn$maxWidth = rawColumn.maxWidth) !== null && _rawColumn$maxWidth !== void 0 ? _rawColumn$maxWidth : defaultMaxWidth,
        sortable: (_rawColumn$sortable = rawColumn.sortable) !== null && _rawColumn$sortable !== void 0 ? _rawColumn$sortable : defaultSortable,
        resizable: (_rawColumn$resizable = rawColumn.resizable) !== null && _rawColumn$resizable !== void 0 ? _rawColumn$resizable : defaultResizable,
        formatter: rawColumn.cellRenderer ? rawColumn.cellRenderer : (_rawColumn$valueForma = rawColumn.valueFormatter) !== null && _rawColumn$valueForma !== void 0 ? _rawColumn$valueForma : defaultFormatter,
        filter: (_rawColumn$filter = rawColumn.filter) !== null && _rawColumn$filter !== void 0 ? _rawColumn$filter : defaultFilter,
        cellRenderer: (_ref4 = (_ref5 = (_frameworkComponents$2 = frameworkComponents === null || frameworkComponents === void 0 ? void 0 : frameworkComponents[customComponentName]) !== null && _frameworkComponents$2 !== void 0 ? _frameworkComponents$2 : rawColumn.cellRenderer) !== null && _ref5 !== void 0 ? _ref5 : rawColumn.valueFormatter) !== null && _ref4 !== void 0 ? _ref4 : defaultFormatter,
        // topHeader: rawColumn.field,
        children: (rawColumn === null || rawColumn === void 0 ? void 0 : rawColumn.haveChildren) === true && Array.isArray(rawColumn === null || rawColumn === void 0 ? void 0 : rawColumn.children) && (rawColumn === null || rawColumn === void 0 ? void 0 : rawColumn.children.map((child, index1) => {
          var _child$valueFormatter, _child$filter, _ref6, _ref7, _frameworkComponents$3;
          const cellRendererValue = child.cellRenderer;
          const components = frameworkComponents ? Object.keys(frameworkComponents) : null;
          const indexOfComponent = components === null || components === void 0 ? void 0 : components.indexOf(cellRendererValue);
          const customComponentName = indexOfComponent > -1 ? components[indexOfComponent] : null;
          const rawChild = _objectSpread(_objectSpread({}, child), {}, {
            parent: rawColumn.field,
            key: child.field,
            formatter: child.cellRenderer ? child.cellRenderer : (_child$valueFormatter = child.valueFormatter) !== null && _child$valueFormatter !== void 0 ? _child$valueFormatter : defaultFormatter,
            filter: (_child$filter = child.filter) !== null && _child$filter !== void 0 ? _child$filter : defaultFilter,
            cellRenderer: (_ref6 = (_ref7 = (_frameworkComponents$3 = frameworkComponents === null || frameworkComponents === void 0 ? void 0 : frameworkComponents[customComponentName]) !== null && _frameworkComponents$3 !== void 0 ? _frameworkComponents$3 : child.cellRenderer) !== null && _ref7 !== void 0 ? _ref7 : child.valueFormatter) !== null && _ref6 !== void 0 ? _ref6 : defaultFormatter,
            children: (child === null || child === void 0 ? void 0 : child.haveChildren) === true && Array.isArray(child === null || child === void 0 ? void 0 : child.children) && (child === null || child === void 0 ? void 0 : child.children.map((subChild, index2) => {
              var _subChild$valueFormat, _subChild$filter, _ref8, _ref9, _frameworkComponents$4;
              const rawChild1 = _objectSpread(_objectSpread({}, subChild), {}, {
                // topHeader: rawColumn.field,
                parent: child.field,
                formatter: subChild.cellRenderer ? subChild.cellRenderer : (_subChild$valueFormat = subChild.valueFormatter) !== null && _subChild$valueFormat !== void 0 ? _subChild$valueFormat : defaultFormatter,
                filter: (_subChild$filter = subChild.filter) !== null && _subChild$filter !== void 0 ? _subChild$filter : defaultFilter,
                cellRenderer: (_ref8 = (_ref9 = (_frameworkComponents$4 = frameworkComponents === null || frameworkComponents === void 0 ? void 0 : frameworkComponents[customComponentName]) !== null && _frameworkComponents$4 !== void 0 ? _frameworkComponents$4 : subChild.cellRenderer) !== null && _ref9 !== void 0 ? _ref9 : subChild.valueFormatter) !== null && _ref8 !== void 0 ? _ref8 : defaultFormatter,
                children: recursiveChild(subChild, rawColumn),
                key: subChild.field
              });
              return rawChild1;
            }))
            // idx: index1,
          });

          return rawChild;
        }))
      });
      if (rowGroup) {
        var _column$groupFormatte;
        (_column$groupFormatte = column.groupFormatter) !== null && _column$groupFormatte !== void 0 ? _column$groupFormatte : column.groupFormatter = _formatters.toggleGroupFormatter;
      }
      function TreeFormatter(_ref10) {
        let {
          row,
          column
        } = _ref10;
        return row[column.key];
      }
      if (treeData) {
        var _column$treeFormatter;
        (_column$treeFormatter = column.treeFormatter) !== null && _column$treeFormatter !== void 0 ? _column$treeFormatter : column.treeFormatter = TreeFormatter;
      }
      if (frozen) {
        lastFrozenColumnIndex++;
      }
      if (column.alignment) {
        var _column$alignment$typ, _column$alignment$typ2, _column$alignment$typ3;
        if (((_column$alignment$typ = column.alignment.type) === null || _column$alignment$typ === void 0 ? void 0 : _column$alignment$typ.toLowerCase()) === "date" || ((_column$alignment$typ2 = column.alignment.type) === null || _column$alignment$typ2 === void 0 ? void 0 : _column$alignment$typ2.toLowerCase()) === "datetime" || ((_column$alignment$typ3 = column.alignment.type) === null || _column$alignment$typ3 === void 0 ? void 0 : _column$alignment$typ3.toLowerCase()) === "time") {
          var _rawColumn$width2;
          column.width = (_rawColumn$width2 = rawColumn.width) !== null && _rawColumn$width2 !== void 0 ? _rawColumn$width2 : "max-content";
        }
      }
      return column;
    });
    columns === null || columns === void 0 ? void 0 : columns.sort((_ref11, _ref12) => {
      let {
        key: aKey,
        frozen: frozenA
      } = _ref11;
      let {
        key: bKey,
        frozen: frozenB
      } = _ref12;
      // Sort select column first:
      if (aKey === _Columns.SELECT_COLUMN_KEY) return -1;
      if (bKey === _Columns.SELECT_COLUMN_KEY) return 1;

      // Sort grouped columns second, following the groupBy order:
      if (rawGroupBy !== null && rawGroupBy !== void 0 && rawGroupBy.includes(aKey)) {
        if (rawGroupBy.includes(bKey)) {
          return rawGroupBy.indexOf(aKey) - rawGroupBy.indexOf(bKey);
        }
        return -1;
      }
      if (rawGroupBy !== null && rawGroupBy !== void 0 && rawGroupBy.includes(bKey)) return 1;

      // Sort frozen columns third:
      if (frozenA) {
        if (frozenB) return 0;
        return -1;
      }
      if (frozenB) return 1;

      // Sort other columns last:
      return 0;
    });
    const colSpanColumns = [];
    columns === null || columns === void 0 ? void 0 : columns.forEach((column, idx) => {
      column.idx = idx;
      if (column.rowGroup) {
        groupBy.push(column.key);
      }
      if (column.colSpan != null) {
        colSpanColumns.push(column);
      }
    });
    if (lastFrozenColumnIndex !== -1) {
      columns[lastFrozenColumnIndex].isLastFrozenColumn = true;
    }
    return {
      columns,
      colSpanColumns,
      lastFrozenColumnIndex,
      groupBy
    };
  }, [newData, defaultWidth, defaultMinWidth, defaultMaxWidth, defaultFormatter, defaultResizable, defaultSortable, rawGroupBy]);
  const {
    templateColumns,
    layoutCssVars,
    totalFrozenColumnWidth,
    columnMetrics
  } = (0, _react.useMemo)(() => {
    const templateColumns = [];
    let left = 0;
    let totalFrozenColumnWidth = 0;
    const columnMetrics = new Map();
    for (const column of columns) {
      var _columnWidths$get;
      let width = (_columnWidths$get = columnWidths.get(column.key)) !== null && _columnWidths$get !== void 0 ? _columnWidths$get : column.width;
      if (typeof width === "number") {
        width = (0, _utils.clampColumnWidth)(width, column);
      } else {
        // This is a placeholder width so we can continue to use virtualization.
        // The actual value is set after the column is rendered
        width = column.minWidth;
      }
      templateColumns.push("".concat(width, "px"));
      columnMetrics.set(column, {
        width,
        left
      });
      left += width;
    }
    if (lastFrozenColumnIndex !== -1) {
      const columnMetric = columnMetrics.get(columns[lastFrozenColumnIndex]);
      totalFrozenColumnWidth = columnMetric.left + columnMetric.width;
    }
    const layoutCssVars = {
      gridTemplateColumns: templateColumns.join(" ")
    };
    for (let i = 0; i <= lastFrozenColumnIndex; i++) {
      const column = columns[i];
      layoutCssVars["--rdg-frozen-left-".concat(column.idx)] = "".concat(columnMetrics.get(column).left, "px");
    }
    return {
      templateColumns,
      layoutCssVars,
      totalFrozenColumnWidth,
      columnMetrics
    };
  }, [columnWidths, columns, lastFrozenColumnIndex]);
  const [colOverscanStartIdx, colOverscanEndIdx] = (0, _react.useMemo)(() => {
    if (!enableVirtualization) {
      return [0, columns.length - 1];
    }
    // get the viewport's left side and right side positions for non-frozen columns
    const viewportLeft = scrollLeft + totalFrozenColumnWidth;
    const viewportRight = scrollLeft + viewportWidth;
    // get first and last non-frozen column indexes
    const lastColIdx = columns.length - 1;
    const firstUnfrozenColumnIdx = (0, _utils.min)(lastFrozenColumnIndex + 1, lastColIdx);

    // skip rendering non-frozen columns if the frozen columns cover the entire viewport
    if (viewportLeft >= viewportRight) {
      return [firstUnfrozenColumnIdx, firstUnfrozenColumnIdx];
    }

    // get the first visible non-frozen column index
    let colVisibleStartIdx = firstUnfrozenColumnIdx;
    while (colVisibleStartIdx < lastColIdx) {
      const {
        left,
        width
      } = columnMetrics.get(columns[colVisibleStartIdx]);
      // if the right side of the columnn is beyond the left side of the available viewport,
      // then it is the first column that's at least partially visible
      if (left + width > viewportLeft) {
        break;
      }
      colVisibleStartIdx++;
    }

    // get the last visible non-frozen column index
    let colVisibleEndIdx = colVisibleStartIdx;
    while (colVisibleEndIdx < lastColIdx) {
      const {
        left,
        width
      } = columnMetrics.get(columns[colVisibleEndIdx]);
      // if the right side of the column is beyond or equal to the right side of the available viewport,
      // then it the last column that's at least partially visible, as the previous column's right side is not beyond the viewport.
      if (left + width >= viewportRight) {
        break;
      }
      colVisibleEndIdx++;
    }
    const colOverscanStartIdx = (0, _utils.max)(firstUnfrozenColumnIdx, colVisibleStartIdx - 1);
    const colOverscanEndIdx = (0, _utils.min)(lastColIdx, colVisibleEndIdx + 1);
    return [colOverscanStartIdx, colOverscanEndIdx];
  }, [columnMetrics, columns, lastFrozenColumnIndex, scrollLeft, totalFrozenColumnWidth, viewportWidth, enableVirtualization]);
  return {
    columns,
    colSpanColumns,
    colOverscanStartIdx,
    colOverscanEndIdx,
    templateColumns,
    layoutCssVars,
    columnMetrics,
    lastFrozenColumnIndex,
    totalFrozenColumnWidth,
    groupBy
  };
}