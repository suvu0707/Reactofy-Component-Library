"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.flat-map.js");
require("core-js/modules/es.array.unscopables.flat-map.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireWildcard(require("react"));
var _useUpdateEffect = _interopRequireDefault(require("./hooks/useUpdateEffect"));
var _TreeRow = _interopRequireDefault(require("./TreeRow"));
var _reactDom = require("react-dom");
var _clsx = require("clsx");
var _lodash = require("lodash");
var _reactContextmenu = require("react-contextmenu");
var _core = require("@linaria/core");
var _style = require("./style");
var _hooks = require("./hooks");
var _HeaderRow = _interopRequireDefault(require("./HeaderRow"));
var _Row = _interopRequireWildcard(require("./Row"));
var _GroupRow = _interopRequireDefault(require("./GroupRow"));
var _SummaryRow = _interopRequireDefault(require("./SummaryRow"));
var _EditCell = _interopRequireDefault(require("./EditCell"));
var _DragHandle = _interopRequireDefault(require("./DragHandle"));
var _sortStatus = _interopRequireDefault(require("./sortStatus"));
var _formatters = require("./formatters");
var _DataGridDefaultComponentsProvider = require("./DataGridDefaultComponentsProvider");
var _utils = require("./utils");
var _filterContext = _interopRequireDefault(require("./filterContext"));
var _Columns = require("./Columns");
var _exportUtils = require("./exportUtils");
var _ExportData = require("./ExportData");
var _rcPagination = _interopRequireDefault(require("rc-pagination"));
require("./pagination.css");
var _useCalculatedColumnswithIdx = require("./hooks/useCalculatedColumnswithIdx");
var _useCalculatedRowColumns = require("./hooks/useCalculatedRowColumns");
var _useCalculatedColumnsWithTopHeader = require("./hooks/useCalculatedColumnsWithTopHeader");
var _templateObject;
const _excluded = ["columnData", "rowData", "topSummaryRows", "bottomSummaryRows", "onRowsChange", "rowHeight", "headerRowHeight", "summaryRowHeight", "selectedRows", "onSelectedRowsChange", "defaultColumnOptions", "groupBy", "expandedGroupIds", "onExpandedGroupIdsChange", "onRowClicked", "onRowDoubleClicked", "selectedCellHeaderStyle", "onScroll", "onColumnResize", "onFill", "serialNumber", "rowSelection", "onCopy", "onPaste", "selectedCellRowStyle", "onCellClicked", "onCellDoubleClicked", "onCellContextMenu", "cellNavigationMode", "enableVirtualization", "renderers", "className", "showSelectedRows", "style", "rowClass", "direction", "getContextMenuItems", "aria-label", "aria-labelledby", "aria-describedby", "testId", "columnReordering", "pagination", "paginationPageSize", "suppressPaginationPanel", "paginationAutoPageSize", "defaultPage", "frameworkComponents", "onGridReady", "valueChangedCellStyle", "rowFreezLastIndex"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const initialPosition = {
  idx: -1,
  rowIdx: -2,
  mode: "SELECT"
};

/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rows={rows} />
 */
function DataGrid(props, ref) {
  var _raawColumns, _ref, _renderers$rowRendere, _ref2, _renderers$sortStatus, _ref3, _renderers$checkboxFo, _renderers$noRowsFall, _props$expandedTreeId, _flattedColumns, _topSummaryRows$lengt, _bottomSummaryRows$le, _document$getElementB, _props$restriction3, _props$restriction4;
  let {
      // Grid and data Props
      columnData: raawColumns,
      rowData: raawRows,
      topSummaryRows,
      bottomSummaryRows,
      onRowsChange,
      // Dimensions props
      rowHeight: rawRowHeight,
      headerRowHeight: rawHeaderRowHeight,
      summaryRowHeight: rawSummaryRowHeight,
      // Feature props
      selectedRows,
      onSelectedRowsChange,
      defaultColumnOptions,
      groupBy: raawGroupBy,
      expandedGroupIds,
      onExpandedGroupIdsChange,
      // Event props
      onRowClicked: onRowClick,
      onRowDoubleClicked: onRowDoubleClick,
      selectedCellHeaderStyle,
      onScroll,
      onColumnResize,
      onFill,
      serialNumber,
      rowSelection,
      onCopy,
      onPaste,
      selectedCellRowStyle,
      onCellClicked: onCellClick,
      onCellDoubleClicked: onCellDoubleClick,
      onCellContextMenu,
      // Toggles and modes
      cellNavigationMode: rawCellNavigationMode,
      enableVirtualization: rawEnableVirtualization,
      // Miscellaneous
      renderers,
      className,
      showSelectedRows,
      style,
      rowClass,
      direction: rawDirection,
      getContextMenuItems,
      // ARIA
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      testId,
      columnReordering,
      pagination: tablePagination,
      paginationPageSize,
      suppressPaginationPanel,
      paginationAutoPageSize,
      defaultPage,
      frameworkComponents,
      onGridReady,
      valueChangedCellStyle,
      rowFreezLastIndex
    } = props,
    rest = _objectWithoutProperties(props, _excluded);

  /**
   * defaults
   */

  const [selectedRows1, onSelectedRowsChange1] = (0, _react.useState)();
  selectedRows = selectedRows ? selectedRows : [];
  const selection = rest.selection && _Columns.SelectColumn;
  raawColumns = rest.selection ? [selection, ...raawColumns] : raawColumns;
  raawColumns = serialNumber ? [_Columns.SerialNumberColumn, ...raawColumns] : raawColumns;
  const rowKeyGetter = props.rowKeyGetter ? props.rowKeyGetter : row => row.id;
  const contextMenuItems = getContextMenuItems !== undefined ? getContextMenuItems() : [];
  const [contextData, setContextData] = (0, _react.useState)();
  function contextMenuRowRenderer(key, props) {
    return /*#__PURE__*/_react.default.createElement(_reactContextmenu.ContextMenuTrigger, {
      key: key,
      id: "grid-context-menu",
      collect: () => {
        setContextData(props);
      }
    }, /*#__PURE__*/_react.default.createElement(_Row.default, props));
  }
  const [headerHeightFromRef, setHeaderHeightFromRef] = (0, _react.useState)();
  const depth = d => o => {
    o.depth = d;
    if (o.children) {
      o.children.forEach(depth(d + 1));
    }
  };
  raawColumns.forEach(depth(0));
  const cloneRaawColumns1 = raawColumns.slice();
  const getArrayDepth = arr => {
    var _arr$children;
    if (Array.isArray(arr)) {
      // if arr is an array, recurse over it
      return 1 + Math.max(...arr.map(getArrayDepth));
    }
    if ((_arr$children = arr.children) !== null && _arr$children !== void 0 && _arr$children.length) {
      // if arr is an object with a children property, recurse over the children
      return 1 + Math.max(...arr.children.map(getArrayDepth));
    }
    return 0;
  };
  const arrayDepth = getArrayDepth(cloneRaawColumns1);
  let singleHeaderRowHeight = rawHeaderRowHeight ? rawHeaderRowHeight : 24;
  const headerheight = singleHeaderRowHeight * arrayDepth;
  // const headerheight = enableFilter? rawHeaderRowHeight * arrayDepth+46 : rawHeaderRowHeight * arrayDepth;

  const enableFilter = (_raawColumns = raawColumns) === null || _raawColumns === void 0 ? void 0 : _raawColumns.map(i => i.filter === true && i.depth === arrayDepth - 1).includes(true);
  const defaultComponents = (0, _DataGridDefaultComponentsProvider.useDefaultComponents)();
  const rowHeight = rawRowHeight !== null && rawRowHeight !== void 0 ? rawRowHeight : 24;
  const headerWithFilter = enableFilter ? 70 : undefined;
  const headerRowHeight = headerheight;
  const summaryRowHeight = rawSummaryRowHeight !== null && rawSummaryRowHeight !== void 0 ? rawSummaryRowHeight : typeof rowHeight === "number" ? rowHeight : 24;
  const rowRenderer = contextMenuItems.length > 0 ? contextMenuRowRenderer : (_ref = (_renderers$rowRendere = renderers === null || renderers === void 0 ? void 0 : renderers.rowRenderer) !== null && _renderers$rowRendere !== void 0 ? _renderers$rowRendere : defaultComponents === null || defaultComponents === void 0 ? void 0 : defaultComponents.rowRenderer) !== null && _ref !== void 0 ? _ref : _Row.defaultRowRenderer;
  const sortStatus = (_ref2 = (_renderers$sortStatus = renderers === null || renderers === void 0 ? void 0 : renderers.sortStatus) !== null && _renderers$sortStatus !== void 0 ? _renderers$sortStatus : defaultComponents === null || defaultComponents === void 0 ? void 0 : defaultComponents.sortStatus) !== null && _ref2 !== void 0 ? _ref2 : _sortStatus.default;
  const checkboxFormatter = (_ref3 = (_renderers$checkboxFo = renderers === null || renderers === void 0 ? void 0 : renderers.checkboxFormatter) !== null && _renderers$checkboxFo !== void 0 ? _renderers$checkboxFo : defaultComponents === null || defaultComponents === void 0 ? void 0 : defaultComponents.checkboxFormatter) !== null && _ref3 !== void 0 ? _ref3 : _formatters.checkboxFormatter;
  const noRowsFallback = (_renderers$noRowsFall = renderers === null || renderers === void 0 ? void 0 : renderers.noRowsFallback) !== null && _renderers$noRowsFall !== void 0 ? _renderers$noRowsFall : defaultComponents === null || defaultComponents === void 0 ? void 0 : defaultComponents.noRowsFallback;
  const cellNavigationMode = rawCellNavigationMode !== null && rawCellNavigationMode !== void 0 ? rawCellNavigationMode : "NONE";
  const enableVirtualization = rawEnableVirtualization !== null && rawEnableVirtualization !== void 0 ? rawEnableVirtualization : true;
  const direction = rawDirection !== null && rawDirection !== void 0 ? rawDirection : "ltr";

  /**
   * states
   */
  const [afterFilter, setAfterFilter] = (0, _react.useState)([]);
  const [defaultColumnDef, setDefaultColumnDef] = (0, _react.useState)(defaultColumnOptions);
  const [rawGroupBy, setRawGroupBy] = (0, _react.useState)(raawGroupBy);
  const [expandAll, setExpandAll] = (0, _react.useState)(null);
  (0, _useUpdateEffect.default)(() => {
    setExpandAll(null);
  }, [raawGroupBy, expandedGroupIds]);
  (0, _useUpdateEffect.default)(() => {
    setRawGroupBy(raawGroupBy);
  }, [raawGroupBy]);
  const {
    columns3
  } = (0, _useCalculatedColumnsWithTopHeader.useCalculatedColumnsWithTopHeader)({
    raawColumns //need to be added
  });

  const [scrollTop, setScrollTop] = (0, _react.useState)(0);
  const [scrollLeft, setScrollLeft] = (0, _react.useState)(0);
  const [columnWidths, setColumnWidths] = (0, _react.useState)(() => new Map());
  const [selectedPosition, setSelectedPosition] = (0, _react.useState)(initialPosition);
  const [copiedCell, setCopiedCell] = (0, _react.useState)(null);
  const [isDragging, setDragging] = (0, _react.useState)(false);
  const [draggedOverRowIdx, setOverRowIdx] = (0, _react.useState)(undefined);
  const [sortColumns, setSortColumns] = (0, _react.useState)([]);
  const [rawRows, setRawRows] = (0, _react.useState)(raawRows);
  const [rawColumns, setRawColumns] = (0, _react.useState)(
  // serialNumber ? [SerialNumberColumn, ...raawColumns] : columns3
  columns3);
  const [pagination, _setPagination] = (0, _react.useState)(tablePagination);
  const [suppressPagination, setSuppressPagination] = (0, _react.useState)(suppressPaginationPanel !== null && suppressPaginationPanel !== void 0 ? suppressPaginationPanel : false);
  const [size, setSize] = (0, _react.useState)(paginationPageSize !== null && paginationPageSize !== void 0 ? paginationPageSize : 20);
  const [current, setCurrent] = (0, _react.useState)(defaultPage !== null && defaultPage !== void 0 ? defaultPage : 1);
  const [expandedTreeIds, setExpandedTreeIds] = (0, _react.useState)((_props$expandedTreeId = props.expandedTreeIds) !== null && _props$expandedTreeId !== void 0 ? _props$expandedTreeId : []);
  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };
  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return /*#__PURE__*/_react.default.createElement("button", {
        title: "Previous"
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-angle-double-left"
      }));
    }
    if (type === "next") {
      return /*#__PURE__*/_react.default.createElement("button", {
        title: "Next"
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-angle-double-right"
      }));
    }
    return originalElement;
  };
  const PerPageChange = value => {
    setSize(value);
    const newPerPage = Math.ceil(rawRows.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };
  const onSortColumnsChange = sortColumns => {
    setSortColumns(sortColumns.slice(-1));
  };
  (0, _useUpdateEffect.default)(() => {
    setRawColumns(
    // serialNumber ? [SerialNumberColumn, ...raawColumns] : columns3
    columns3);
  }, [props.columnData]);
  let flattedColumns;
  const flat = rawColumns => o => o.children ? o.children.flatMap(flat(rawColumns || o.headerName)) : _objectSpread(_objectSpread({}, o), {}, {
    rawColumns
  });
  const response = rawColumns;
  flattedColumns = response.flatMap(flat());
  const defaultFilters = {};
  (_flattedColumns = flattedColumns) === null || _flattedColumns === void 0 || _flattedColumns.map(i => defaultFilters[i.field] = "");
  rawColumns === null || rawColumns === void 0 || rawColumns.map(i => defaultFilters[i.key] = "");
  const subColumn = [];
  const [filters, setFilters] = (0, _react.useState)(_objectSpread(_objectSpread({}, defaultFilters), {}, {
    enabled: true
  }));
  const [filterType, setFilterType] = (0, _react.useState)("Contain");
  const [suppressRowClickSelection, _setSuppressRowClickSelection] = (0, _react.useState)(false);
  const ChildColumnSetup = value => {
    subColumn.push(value);
  };
  const filterFunction = (0, _react.useCallback)(props => {
    if (filterType === "Contain") {
      return raawRows === null || raawRows === void 0 ? void 0 : raawRows.filter(function (val) {
        for (const element of props) {
          var _val$element$;
          let value = typeof val[element[0]] !== "string" ? (_val$element$ = val[element[0]]) === null || _val$element$ === void 0 ? void 0 : _val$element$.toString() : val[element[0]];
          if (value && !value.toLowerCase().includes(element[1].toLowerCase())) return false;
        }
        return true;
      });
    } else if (filterType === "Starts With...") {
      return raawRows === null || raawRows === void 0 ? void 0 : raawRows.filter(function (val) {
        for (const element of props) {
          var _val$element$2;
          let value = typeof val[element[0]] !== "string" ? (_val$element$2 = val[element[0]]) === null || _val$element$2 === void 0 ? void 0 : _val$element$2.toString() : val[element[0]];
          if (value && !value.toLowerCase().startsWith(element[1].toLowerCase())) return false;
        }
        return true;
      });
    } else if (filterType === "Ends With...") {
      return raawRows === null || raawRows === void 0 ? void 0 : raawRows.filter(function (val) {
        for (const element of props) {
          var _val$element$3;
          let value = typeof val[element[0]] !== "string" ? (_val$element$3 = val[element[0]]) === null || _val$element$3 === void 0 ? void 0 : _val$element$3.toString() : val[element[0]];
          if (value && !value.toLowerCase().endsWith(element[1].toLowerCase())) return false;
        }
        return true;
      });
    } else if (filterType === "Equals") {
      return raawRows === null || raawRows === void 0 ? void 0 : raawRows.filter(function (val) {
        for (const element of props) {
          var _val$element$4;
          let value = typeof val[element[0]] !== "string" ? (_val$element$4 = val[element[0]]) === null || _val$element$4 === void 0 ? void 0 : _val$element$4.toString() : val[element[0]];
          if (value && value.toLowerCase() !== element[1].toLowerCase()) {
            return false;
          }
        }
        return true;
      });
    } else if (filterType === "Not Equals") {
      return raawRows === null || raawRows === void 0 ? void 0 : raawRows.filter(function (val) {
        for (const element of props) {
          var _val$element$5;
          let value = typeof val[element[0]] !== "string" ? (_val$element$5 = val[element[0]]) === null || _val$element$5 === void 0 ? void 0 : _val$element$5.toString() : val[element[0]];
          if (value && value.toLowerCase() === element[1].toLowerCase()) {
            return false;
          }
        }
        return true;
      });
    }
  }, [filterType, raawRows]);
  const sortedRows = (0, _react.useMemo)(() => {
    var _sortedRows;
    const asArray = Object.entries(filters);
    const keys = asArray.filter(_ref4 => {
      let [key, value] = _ref4;
      return value.length > 0;
    });
    const filteredRows = filterFunction(keys);
    if (sortColumns.length === 0) return filteredRows;
    const {
      columnKey,
      direction
    } = sortColumns[0];
    let sortedRows = filteredRows;
    sortedRows = (_sortedRows = sortedRows) === null || _sortedRows === void 0 ? void 0 : _sortedRows.sort((a, b) => {
      var _a$columnKey;
      return typeof a[columnKey] === "number" ? a[columnKey] - b[columnKey] : (_a$columnKey = a[columnKey]) === null || _a$columnKey === void 0 ? void 0 : _a$columnKey.localeCompare(b[columnKey]);
    });
    return direction === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [raawRows, sortColumns, filters]);
  (0, _useUpdateEffect.default)(() => {
    return setRawRows(sortedRows);
  }, [sortedRows]);
  const handleReorderColumn = value => {
    if (columnReordering) {
      setRawColumns(value);
    }
  };
  const handleReorderRow = value => setRawRows(value);

  /**
   * refs
   */
  const prevSelectedPosition = (0, _react.useRef)(selectedPosition);
  const latestDraggedOverRowIdx = (0, _react.useRef)(draggedOverRowIdx);
  const lastSelectedRowIdx = (0, _react.useRef)(-1);
  const rowRef = (0, _react.useRef)(null);

  /**
   * computed values
   */
  const [gridRef, gridWidth, gridHeight, isWidthInitialized] = (0, _hooks.useGridDimensions)();
  const headerRowsCount = 1;
  const topSummaryRowsCount = (_topSummaryRows$lengt = topSummaryRows === null || topSummaryRows === void 0 ? void 0 : topSummaryRows.length) !== null && _topSummaryRows$lengt !== void 0 ? _topSummaryRows$lengt : 0;
  const bottomSummaryRowsCount = (_bottomSummaryRows$le = bottomSummaryRows === null || bottomSummaryRows === void 0 ? void 0 : bottomSummaryRows.length) !== null && _bottomSummaryRows$le !== void 0 ? _bottomSummaryRows$le : 0;
  const summaryRowsCount = topSummaryRowsCount + bottomSummaryRowsCount;
  const clientHeight = gridHeight - headerRowHeight - summaryRowsCount * summaryRowHeight;
  const isSelectable = selectedRows != null && onSelectedRowsChange != null;
  const isRtl = direction === "rtl";
  const leftKey = isRtl ? "ArrowRight" : "ArrowLeft";
  const rightKey = isRtl ? "ArrowLeft" : "ArrowRight";
  const defaultGridComponents = (0, _react.useMemo)(() => ({
    sortStatus,
    checkboxFormatter
  }), [sortStatus, checkboxFormatter]);
  const allRowsSelected = (0, _react.useMemo)(() => {
    // no rows to select = explicitely unchecked
    const {
      length
    } = rawRows;
    return length !== 0 && selectedRows1 != null && rowKeyGetter != null && selectedRows1.size >= length && rawRows.every(row => selectedRows1.has(rowKeyGetter(row)));
  }, [rawRows, selectedRows1, rowKeyGetter]);
  function flatten(into, node) {
    if (node == null) return into;
    if (Array.isArray(node)) return node.reduce(flatten, into);
    into.push(node);
    return flatten(into, node.children);
  }
  var rowArray = flatten([], rawColumns);
  var value = false;
  var rowColD = rowArray.slice();
  rowColD = rowColD.filter(function (item) {
    return item !== value;
  });
  var rowArray1 = rowColD.slice();
  for (var i = 0; i < rowArray1.length; i++) {
    if (rowArray1[i].haveChildren) {
      rowArray1.splice(i, 1);
      i--;
    }
  }
  let groupingViaCommonProperty = Object.values(rowArray1.reduce((acc, current) => {
    var _acc$current$topHeade;
    acc[current.topHeader] = (_acc$current$topHeade = acc[current.topHeader]) !== null && _acc$current$topHeade !== void 0 ? _acc$current$topHeade : [];
    acc[current.topHeader].push(current.width);
    return acc;
  }, {}));
  var arr2 = groupingViaCommonProperty.map(arr => arr.reduce((sum, item) => sum += item));
  const newData = rawColumns.slice().map((item1, index) => {
    var itemFromArr2 = arr2.find((item2, index2) => index === index2);
    if (itemFromArr2) {
      item1.width = itemFromArr2;
    }
    return item1;
  });
  const {
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
  } = (0, _hooks.useCalculatedColumns)({
    newData,
    columnWidths,
    scrollLeft,
    viewportWidth: gridWidth,
    defaultColumnDef,
    rawGroupBy: _lodash.groupBy ? rawGroupBy : undefined,
    enableVirtualization,
    frameworkComponents,
    treeData: rest.treeData
  });
  var rowData = flatten([], columns);
  var value1 = false;
  rowData = rowData.filter(function (item) {
    return item !== value1;
  });
  const rowData1 = rowData.slice();
  for (var i = 0; i < rowData1.length; i++) {
    if (rowData1[i].haveChildren) {
      rowData1.splice(i, 1);
      i--;
    }
  }
  const {
    columns4
  } = (0, _useCalculatedColumnswithIdx.useCalculatedColumnswithIdx)({
    rowData1,
    //need to be added
    columnWidths,
    scrollLeft,
    viewportWidth: gridWidth,
    defaultColumnOptions,
    rawGroupBy: _lodash.groupBy ? rawGroupBy : undefined,
    enableVirtualization,
    frameworkComponents
  });
  let merged = [];
  for (const element of rowData) {
    merged.push(_objectSpread(_objectSpread({}, element), columns4.find(itmInner => itmInner.field === element.field)));
  }
  for (let ii = 0, leng = merged.length; ii < leng; ii++) {
    merged[ii].children = undefined;
  }
  const regroupArray = array => {
    const map = {};
    array.forEach(item => {
      map[item.field] = item;
      item.children = [];
    });
    array.forEach(item => {
      if (item.parent !== null) {
        map[item.parent].children.push(item);
      }
    });
    return array.filter(item => item.parent === null);
  };
  for (var i = 0, len = regroupArray(merged).length; i < len; i++) {
    if (regroupArray(merged)[i].haveChildren === true) regroupArray(merged)[i].idx = regroupArray(merged)[i].index + columns4.length;
  }
  const {
    columns5
  } = (0, _useCalculatedRowColumns.useCalculatedRowColumns)({
    columns4,
    columnWidths,
    scrollLeft,
    viewportWidth: gridWidth,
    defaultColumnOptions,
    rawGroupBy: _lodash.groupBy ? rawGroupBy : undefined,
    enableVirtualization,
    frameworkComponents //need to be added
  });

  const {
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    rowsCount,
    totalRowHeight,
    gridTemplateRows,
    isGroupRow,
    getRowTop,
    getRowHeight,
    findRowIdx
  } = (0, _hooks.useViewportRows)({
    rawRows,
    groupBy,
    rowGrouper: _lodash.groupBy,
    expandAll,
    rowHeight,
    clientHeight,
    scrollTop,
    expandedGroupIds,
    enableVirtualization,
    paginationPageSize: size,
    current,
    pagination
  });
  const {
    viewportColumns,
    flexWidthViewportColumns
  } = (0, _hooks.useViewportColumns)({
    columns,
    colSpanColumns,
    colOverscanStartIdx,
    colOverscanEndIdx,
    lastFrozenColumnIndex,
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    topSummaryRows,
    bottomSummaryRows,
    columnWidths,
    isGroupRow
  });
  //column Api
  function getColumnWidths() {
    let keys = Array.from(columnMetrics.keys());
    let columnKeys = [];
    keys.map(key => columnKeys.push(key.key));
    let values = Array.from(columnMetrics.values());
    let columnWidthValues = [];
    values.map(value => columnWidthValues.push(value.width));
    let columnWidth = new Map(columnWidths);
    for (let i = 0; i < columnWidthValues.length; i++) {
      columnWidth.set(columnKeys[i], columnWidthValues[i]);
    }
    return columnWidth;
  }
  function getColumns() {
    let columnObjects = [];
    columns.forEach(column => {
      var _ref5, _column$field, _column$frozen, _column$rowGroup;
      const index = raawColumns.findIndex(c => c.field === column.field);
      const userColDef = raawColumns[index];
      const indexOfRowGroup = rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.findIndex(key => key === column.key);
      const indexOfSort = sortColumns.findIndex(sortCol => sortCol.columnKey === column.key);
      const sort = indexOfSort > -1 ? sortColumns[indexOfSort].direction : null;
      const columnState = {
        colId: (_ref5 = (_column$field = column.field) !== null && _column$field !== void 0 ? _column$field : column.key) !== null && _ref5 !== void 0 ? _ref5 : "col_".concat(column.idx),
        columnIndex: column.idx,
        width: templateColumns[column.idx],
        frozen: (_column$frozen = column.frozen) !== null && _column$frozen !== void 0 ? _column$frozen : undefined,
        rowGroup: (_column$rowGroup = column.rowGroup) !== null && _column$rowGroup !== void 0 ? _column$rowGroup : undefined,
        rowGroupIndex: indexOfRowGroup > -1 ? indexOfRowGroup : null,
        sort: sort,
        userProvidedColDef: userColDef
      };
      columnObjects.push(columnState);
      // column.children?.forEach((colChild) => {
      //   const columnState = {
      //     colId: colChild.field ?? colChild.key ?? `col_${column.idx}`,
      //     columnIndex: column.idx,
      //     width: colChild.widt
      //     frozen: colChild.frozen ?? undefined,
      //     rowGroup: colChild.rowGroup ?? undefined,
      //     userProvidedColDef: userColDef,
      //   };
      //   columnObjects.push(columnState);
      // });
    });

    return columnObjects;
  }
  function moveColumn(colKey, toIndex) {
    const key = typeof colKey === "string" ? colKey : colKey.colId;
    const sourceColumnIndex = columns.findIndex(c => c.field === key);
    const targetColumnIndex = toIndex < columns.length ? toIndex : sourceColumnIndex;
    const reorderedColumns = [...columns];
    reorderedColumns.splice(targetColumnIndex, 0, reorderedColumns.splice(sourceColumnIndex, 1)[0]);
    setRawColumns(reorderedColumns);
  }
  function moveColumns(columnsToMove, toIndex) {
    let sourceColumns = [];
    const reorderedColumns = [...columns];
    columns.map(c => columnsToMove.forEach(col => {
      const key = typeof col === "string" ? col : col.colId;
      if (key === c.field) sourceColumns.push(c);
    }));
    let valueAtPosition = columns[toIndex];
    sourceColumns.forEach(v => reorderedColumns.splice(reorderedColumns.indexOf(v), 1));
    reorderedColumns.splice(reorderedColumns.indexOf(valueAtPosition) + 1, 0, ...sourceColumns);
    setRawColumns(reorderedColumns);
  }
  function moveColumnByIndex(fromIndex, toIndex) {
    const sourceColumnIndex = fromIndex;
    const targetColumnIndex = toIndex < columns.length ? toIndex : sourceColumnIndex;
    const reorderedColumns = [...columns];
    reorderedColumns.splice(targetColumnIndex, 0, reorderedColumns.splice(sourceColumnIndex, 1)[0]);
    setRawColumns(reorderedColumns);
  }
  function getDisplayNameForColumn(column, location) {
    let displayNameForCol;
    columns.forEach(col => {
      if (column.colId === col.key && location === col.idx) displayNameForCol = col.headerName;
    });
    return displayNameForCol;
  }
  function getDisplayedColAfter(column) {
    let columnObjects = getColumns();
    let displayedColAfterKey;
    for (let index = 0; index < columns.length; index++) {
      let col = columns[index];
      let nextCol = columns[index + 1];
      if (column.colId === col.key) displayedColAfterKey = nextCol.parentColumn ? nextCol.parentColumn.key || nextCol.parentColumn.field : nextCol.key;
    }
    let displayedColAfter;
    columnObjects.forEach(colObj => {
      if (colObj.colId === displayedColAfterKey) displayedColAfter = colObj;
    });
    return displayedColAfter;
  }
  function getDisplayedColBefore(column) {
    let columnObjects = getColumns();
    let displayedColBeforeKey;
    for (let index = 0; index < columns.length; index++) {
      let col = columns[index];
      let prevCol = columns[index - 1];
      if (column.colId === col.key) displayedColBeforeKey = prevCol.parentColumn ? prevCol.parentColumn.key || prevCol.parentColumn.field : prevCol.key;
    }
    let displayedColBefore;
    columnObjects.forEach(colObj => {
      if (colObj.colId === displayedColBeforeKey) displayedColBefore = colObj;
    });
    return displayedColBefore;
  }
  function getRowGroupColumns() {
    let columnObjects = getColumns();
    let rowGroupColumns = [];
    columnObjects.forEach(colObject => {
      if (rawGroupBy !== null && rawGroupBy !== void 0 && rawGroupBy.includes(colObject.colId)) rowGroupColumns.push(colObject);
    });
    return rowGroupColumns;
  }
  function setRowGroupColumns(colKeys) {
    rawGroupBy.length = 0;
    colKeys.forEach(colKey => {
      typeof colKey === "string" ? rawGroupBy.push(colKey) : rawGroupBy.push(colKey.colId);
    });
    setRawColumns(raawColumns);
  }
  function addRowGroupColumn(colKey) {
    typeof colKey === "string" ? rawGroupBy.push(colKey) : rawGroupBy.push(colKey.colId);
    setRawColumns(raawColumns);
  }
  function addRowGroupColumns(colKeys) {
    colKeys.forEach(colKey => {
      typeof colKey === "string" ? rawGroupBy.push(colKey) : rawGroupBy.push(colKey.colId);
    });
    setRawColumns(raawColumns);
  }
  function removeRowGroupColumn(colKey) {
    const key = typeof colKey === "string" ? colKey : colKey.colId;
    const indexOfKey = rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.findIndex(c => c === key);
    if (indexOfKey > -1) rawGroupBy === null || rawGroupBy === void 0 || rawGroupBy.splice(indexOfKey, 1);
    setRawColumns(raawColumns);
  }
  function removeRowGroupColumns(colKeys) {
    colKeys.forEach(colKey => {
      const key = typeof colKey === "string" ? colKey : colKey.colId;
      const indexOfKey = rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.findIndex(c => c === key);
      if (indexOfKey > -1) rawGroupBy === null || rawGroupBy === void 0 || rawGroupBy.splice(indexOfKey, 1);
    });
    setRawColumns(raawColumns);
  }
  function moveRowGroupColumn(fromIndex, toIndex) {
    if (fromIndex > -1 && toIndex < (rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.length)) {
      var element = rawGroupBy[fromIndex];
      rawGroupBy.splice(fromIndex, 1);
      rawGroupBy.splice(toIndex, 0, element);
      setRawColumns(columns);
    }
  }
  function setColumnWidth(key, newWidth) {
    const colKey = typeof key === "string" ? key : key.colId;
    const newColumnWidths = new Map(columnWidths);
    newColumnWidths.set(colKey, newWidth);
    setColumnWidths(newColumnWidths);
  }
  function setColumnsWidth(newColumnWidths) {
    const newColWidths = new Map(columnWidths);
    newColumnWidths.forEach(col => {
      const colKey = typeof col.key === "string" ? col.key : col.key.colId;
      const colWidth = col.newWidth;
      newColWidths.set(colKey, colWidth);
    });
    setColumnWidths(newColWidths);
  }
  function autoSizeColumn(key) {
    const colKey = typeof key === "string" ? key : key.colId;
    const columnIndex = columns.findIndex(col => col.key === colKey);
    const column = columns[columnIndex];
    handleColumnResize(column, "max-content");
  }
  function autoSizeColumns(colKeys) {
    let columnObjects = getColumns();
    const {
      style
    } = gridRef.current;
    const newTemplateColumns = [...templateColumns];
    const newColumnWidths = new Map(columnWidths);
    colKeys.forEach(colKey => {
      const key = typeof colKey === "string" ? colKey : colKey.colId;
      const index = columnObjects.findIndex(c => c.colId === key);
      newTemplateColumns[index] = "max-content";
      style.gridTemplateColumns = newTemplateColumns.join(" ");
      const measuringCell = gridRef.current.querySelector("[data-measuring-cell-key=\"".concat(columns[index].key, "\"]"));
      const measuredWidth = measuringCell.getBoundingClientRect().width;
      const measuredWidthPx = "".concat(measuredWidth, "px");
      if (newTemplateColumns[columns[index].idx] !== measuredWidthPx) {
        newTemplateColumns[columns[index].idx] = measuredWidthPx;
        style.gridTemplateColumns = newTemplateColumns.join(" ");
      }
      if (columnWidths.get(columns[index].key) === measuredWidth) return;
      newColumnWidths.set(columns[index].key, measuredWidth);
    });
    setColumnWidths(newColumnWidths);
    templateColumns = [...newTemplateColumns];
  }
  function autoSizeAllColumns() {
    const {
      style
    } = gridRef.current;
    const newTemplateColumns = [...templateColumns];
    const newColumnWidths = new Map(columnWidths);
    for (let index = 0; index < newTemplateColumns.length; index++) {
      newTemplateColumns[index] = "max-content";
      style.gridTemplateColumns = newTemplateColumns.join(" ");
      const measuringCell = gridRef.current.querySelector("[data-measuring-cell-key=\"".concat(columns[index].key, "\"]"));
      const measuredWidth = measuringCell.getBoundingClientRect().width;
      const measuredWidthPx = "".concat(measuredWidth, "px");
      if (newTemplateColumns[columns[index].idx] !== measuredWidthPx) {
        newTemplateColumns[columns[index].idx] = measuredWidthPx;
        style.gridTemplateColumns = newTemplateColumns.join(" ");
      }
      if (columnWidths.get(columns[index].key) === measuredWidth) return;
      newColumnWidths.set(columns[index].key, measuredWidth);
    }
    setColumnWidths(newColumnWidths);
    templateColumns = [...newTemplateColumns];
  }
  function sizeColumnsToFit(gridWidth) {
    let columnWidths = getColumnWidths();
    let widthSum = 0;
    let colWidthValues = Array.from(columnWidths.values());
    colWidthValues.forEach(colWidth => {
      widthSum += colWidth;
    });
    var scale = gridWidth / widthSum;
    const newColWidths = new Map(columnWidths);
    let colWidths = Array.from(columnWidths.keys());
    let sum = 0;
    for (let index = 0; index < colWidthValues.length; index++) {
      if (index === colWidthValues.length - 1) {
        let width = gridWidth - sum;
        newColWidths.set(colWidths[index], width);
      } else {
        let width = Math.round(colWidthValues[index] * scale);
        newColWidths.set(colWidths[index], width);
        sum += width;
      }
    }
    setColumnWidths(newColWidths);
  }
  function getColumnState() {
    var columns = Array.from(columnMetrics.keys());
    var colStates = [];
    columns.forEach(col => {
      var _col$key, _col$frozen, _col$rowGroup;
      const index = sortColumns.findIndex(sortCol => sortCol.columnKey === col.key);
      const sort = index > -1 ? sortColumns[index].direction : null;
      const indexOfRowGroup = rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.findIndex(key => key === col.key);
      const colState = {
        colId: (_col$key = col.key) !== null && _col$key !== void 0 ? _col$key : "col_".concat(col.idx),
        columnIndex: col.idx,
        frozen: (_col$frozen = col.frozen) !== null && _col$frozen !== void 0 ? _col$frozen : undefined,
        width: templateColumns[col.idx],
        rowGroup: (_col$rowGroup = col.rowGroup) !== null && _col$rowGroup !== void 0 ? _col$rowGroup : undefined,
        rowGroupIndex: indexOfRowGroup > -1 ? indexOfRowGroup : null,
        sort: sort
      };
      colStates.push(colState);
    });
    return colStates;
  }
  function applyColumnState(columnState) {
    var _columnState$defaultS;
    const colState = columnState.state;
    const defaultState = (_columnState$defaultS = columnState.defaultState) !== null && _columnState$defaultS !== void 0 ? _columnState$defaultS : undefined;
    const newColWidths = new Map(columnWidths);
    colState.forEach(col => {
      const colKey = col.colId;
      if (col.frozen) {
        const index = columns.findIndex(c => c.key === colKey);
        columns[index].frozen = col.frozen;
      }
      if (col.width !== undefined) {
        let width = (0, _lodash.isString)(col.width) ? Number(col.width.match(/\d+/)[0]) : col.width;
        newColWidths.set(colKey, width);
      }
      if (col.rowGroup !== undefined) {
        if (col.rowGroup) {
          const index = columns.findIndex(c => c.key === colKey);
          columns[index].rowGroup = col.rowGroup;
          addRowGroupColumn(colKey);
        } else {
          const index = columns.findIndex(c => c.key === colKey);
          columns[index].rowGroup = col.rowGroup;
          removeRowGroupColumn(colKey);
        }
      }
      if (col.rowGroupIndex !== undefined) {
        if (col.rowGroupIndex !== null && col.rowGroup) {
          const fromIndex = rawGroupBy.findIndex(groupCol => groupCol === colKey);
          const toIndex = col.rowGroupIndex;
          if (fromIndex > -1 && toIndex < (rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.length)) moveRowGroupColumn(fromIndex, toIndex);
        }
      }
      if (col.sort !== undefined) {
        if (col.sort !== null) {
          const index = sortColumns.findIndex(sortCol => sortCol.columnKey === colKey);
          if (index === -1) sortColumns.push({
            columnKey: colKey,
            direction: col.sort
          });
          if (index > -1 && sortColumns[index].direction !== col.sort) sortColumns[index].direction = col.sort;
          onSortColumnsChange(sortColumns);
        } else {
          const index = sortColumns.findIndex(sortCol => sortCol.columnKey === colKey);
          if (index > -1) sortColumns.splice(index, 1);
          onSortColumnsChange(sortColumns);
        }
      }
      setColumnWidths(newColWidths);
    });
    if (defaultState) {
      let keysOfColumns = [];
      colState.map(col => keysOfColumns.push(col.colId));
      columns.forEach(column => {
        if (!keysOfColumns.includes(column.key)) {
          if (defaultState.frozen !== undefined) column.frozen = defaultState.frozen;
          if (defaultState.width !== undefined) {
            newColWidths.set(column.key, defaultState.width);
          }
          if (defaultState.rowGroup !== undefined) {
            if (defaultState.rowGroup) {
              const index = columns.findIndex(c => c.key === column.key);
              columns[index].rowGroup = defaultState.rowGroup;
              addRowGroupColumn(column.key);
            } else {
              const index = columns.findIndex(c => c.key === column.key);
              columns[index].rowGroup = defaultState.rowGroup;
              removeRowGroupColumn(column.key);
            }
          }
          if (defaultState.sort !== undefined) {
            if (defaultState.sort !== null) {
              const index = sortColumns.findIndex(sortCol => sortCol.columnKey === column.key);
              if (index === -1) sortColumns.push({
                columnKey: column.key,
                direction: defaultState.sort
              });
              if (index > -1 && sortColumns[index].direction !== defaultState.sort) sortColumns[index].direction = defaultState.sort;
              onSortColumnsChange(sortColumns);
            } else {
              const index = sortColumns.findIndex(sortCol => sortCol.columnKey === column.key);
              if (index > -1) sortColumns.splice(index, 1);
              onSortColumnsChange(sortColumns);
            }
          }
        }
      });
      setColumnWidths(newColWidths);
    }
    setRawColumns(columns);
  }
  function isPinning() {
    let isPinning = false;
    columns.forEach(col => {
      if (col.frozen === true) isPinning = true;
    });
    return isPinning;
  }
  function setColumnPinned(key) {
    const colKey = typeof key === "string" ? key : key.colId;
    const columnIndex = columns.findIndex(col => col.key === colKey);
    columns[columnIndex].frozen = true;
    setRawColumns(columns);
  }
  function setColumnsPinned(keys) {
    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        const key = typeof keys[j] === "string" ? keys[j] : keys[j].colId;
        const columnIndex = columns.findIndex(col => col.key === key);
        if (i === columnIndex) columns[i].frozen = true;
      }
    }
    setRawColumns(columns);
  }
  function getSortColumns() {
    let columnObjects = getColumns();
    let sortColumns = [];
    columnObjects.forEach(colObj => {
      if (colObj.sort !== null) sortColumns.push(colObj);
    });
    return sortColumns;
  }
  var columnApiObject = {
    columnModel: {
      columnDefs: raawColumns,
      rowGroupColumns: getRowGroupColumns(),
      sortColumns: getSortColumns()
    }
  };
  Object.setPrototypeOf(columnApiObject, {
    // get columns
    getColumns,
    getColumn: colKey => {
      let columnObjects = getColumns();
      let colObject;
      let key = typeof colKey === "string" ? colKey : colKey.colId;
      columnObjects.forEach(columnObj => {
        if (columnObj.colId === key) colObject = columnObj;
      });
      return colObject;
    },
    getAllGridColumns: () => getColumns(),
    //move columns
    moveColumn,
    moveColumns,
    moveColumnByIndex,
    //display names for column / column groups
    getDisplayNameForColumn,
    getDisplayedColAfter,
    getDisplayedColBefore,
    getAllDisplayedVirtualColumns: () => viewportColumns,
    getAllDisplayedColumns: () => viewportColumns,
    //row group columns
    getRowGroupColumns,
    setRowGroupColumns,
    addRowGroupColumn,
    addRowGroupColumns,
    removeRowGroupColumn,
    removeRowGroupColumns,
    moveRowGroupColumn,
    //column widths
    setColumnWidth,
    setColumnsWidth,
    autoSizeColumn,
    autoSizeColumns,
    autoSizeAllColumns,
    sizeColumnsToFit,
    //column states
    getColumnState,
    applyColumnState,
    resetColumnState: () => {
      // // groupBy = [...rawGroupBy];
      if ((rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.length) > 0) rawGroupBy.length = 0;
      if ((sortColumns === null || sortColumns === void 0 ? void 0 : sortColumns.length) > 0) {
        sortColumns.length = 0;
        onSortColumnsChange(sortColumns);
      }
      setRawColumns(raawColumns);
    },
    //pinning columns
    isPinning,
    setColumnPinned,
    setColumnsPinned
  });
  const hasGroups = groupBy.length > 0 && typeof _lodash.groupBy === "function";
  const minColIdx = hasGroups ? -1 : 0;
  const maxColIdx = rowArray1.length - 1;
  const minRowIdx = -1 - topSummaryRowsCount;
  const maxRowIdx = rows.length + bottomSummaryRowsCount - 1;
  const selectedCellIsWithinSelectionBounds = isCellWithinSelectionBounds(selectedPosition);
  const selectedCellIsWithinViewportBounds = isCellWithinViewportBounds(selectedPosition);
  function selectRow(_ref6) {
    let {
      row,
      checked,
      isShiftClick
    } = _ref6;
    if (!onSelectedRowsChange1) return;
    (0, _utils.assertIsValidKeyGetter)(rowKeyGetter);
    const newSelectedRows = new Set(selectedRows1);
    const newSelectedRows1 = selectedRows;
    if (isGroupRow(row)) {
      for (const childRow of row.childRows) {
        const rowKey = rowKeyGetter(childRow);
        if (checked) {
          newSelectedRows.add(rowKey);
          newSelectedRows1.push(childRow);
        } else {
          newSelectedRows.delete(rowKey);
          newSelectedRows1.splice(newSelectedRows1.indexOf(row), 1);
        }
      }
      onSelectedRowsChange1(newSelectedRows);
      if (onSelectedRowsChange) onSelectedRowsChange(newSelectedRows1);
      return;
    }
    const rowKey = rowKeyGetter(row);
    if (checked) {
      newSelectedRows.add(rowKey);
      newSelectedRows1.push(row);
      const previousRowIdx = lastSelectedRowIdx.current;
      const rowIdx = rows.indexOf(row);
      lastSelectedRowIdx.current = rowIdx;
      if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
        const step = (0, _utils.sign)(rowIdx - previousRowIdx);
        for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
          const row = rows[i];
          if (isGroupRow(row)) continue;
          newSelectedRows.add(rowKeyGetter(row));
          newSelectedRows1.push(row);
        }
      }
    } else {
      newSelectedRows.delete(rowKey);
      newSelectedRows1.splice(newSelectedRows1.indexOf(row), 1);
      lastSelectedRowIdx.current = -1;
    }
    onSelectedRowsChange1(newSelectedRows);
    if (onSelectedRowsChange) onSelectedRowsChange(newSelectedRows1);
  }

  /**
   * The identity of the wrapper function is stable so it won't break memoization
   */
  const handleColumnResizeLatest = (0, _hooks.useLatestFunc)(handleColumnResize);
  const onSortColumnsChangeLatest = (0, _hooks.useLatestFunc)(onSortColumnsChange);
  const onCellClickLatest = (0, _hooks.useLatestFunc)(params => {
    const row = params.data;
    const rowKey = rowKeyGetter(row);
    if (onCellClick) onCellClick(params);
    const newSelectedRows = selectedRows1 !== undefined ? Object.values(selectedRows1) : [];
    let newSelectedRows1 = [];
    if ((rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.toLowerCase()) === "single" && !suppressRowClickSelection && (!props.selection || props.selection && selectedPosition.idx !== 0)) {
      if (selectedRows1 === undefined || !selectedRows1.has(rowKey)) {
        if (!onSelectedRowsChange1) return;
        if (selectedRows1 !== undefined) newSelectedRows.splice(0, newSelectedRows.length);
        newSelectedRows.push(rowKey);
        newSelectedRows1 = [row];
      } else {
        newSelectedRows.pop(rowKey);
        newSelectedRows1 = [];
      }
      onSelectedRowsChange1(new Set(newSelectedRows));
      if (onSelectedRowsChange) onSelectedRowsChange(newSelectedRows1);
    } else if ((rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.toLowerCase()) === "multiple" && (!props.selection || props.selection && selectedPosition.idx !== 0)) {
      if (selectedRows1 === undefined || params.event.ctrlKey || props.rowMultiSelectWithClick) {
        selectRow({
          row,
          checked: selectedRows1 === undefined ? true : !selectedRows1.has(rowKeyGetter(row)),
          isShiftClick: false
        });
      } else {
        if (selectedRows1 === undefined || !selectedRows1.has(rowKey)) {
          if (!onSelectedRowsChange1) return;
          if (selectedRows1 !== undefined) newSelectedRows.splice(0, newSelectedRows.length);
          newSelectedRows.push(rowKey);
          newSelectedRows1 = [row];
        } else {
          newSelectedRows.pop(rowKey);
          newSelectedRows1 = [];
        }
        onSelectedRowsChange1(new Set(newSelectedRows));
        if (onSelectedRowsChange) onSelectedRowsChange(newSelectedRows1);
      }
    }
  });
  const onCellDoubleClickLatest = (0, _hooks.useLatestFunc)(onCellDoubleClick);
  const onCellContextMenuLatest = (0, _hooks.useLatestFunc)(onCellContextMenu);
  const selectRowLatest = (0, _hooks.useLatestFunc)(selectRow);
  const selectAllRowsLatest = (0, _hooks.useLatestFunc)(selectAllRows);
  const handleFormatterRowChangeLatest = (0, _hooks.useLatestFunc)(updateRow);
  const selectViewportCellLatest = (0, _hooks.useLatestFunc)((row, column, enableEditor) => {
    const rowIdx = rows.indexOf(row);
    selectCell({
      rowIdx,
      idx: column.idx
    }, enableEditor);
  });
  const selectGroupLatest = (0, _hooks.useLatestFunc)(rowIdx => {
    selectCell({
      rowIdx,
      idx: -1
    });
  });
  const selectHeaderCellLatest = (0, _hooks.useLatestFunc)(idx => {
    selectCell({
      rowIdx: minRowIdx,
      idx
    });
  });
  const selectTopSummaryCellLatest = (0, _hooks.useLatestFunc)((summaryRow, column) => {
    const rowIdx = topSummaryRows.indexOf(summaryRow);
    selectCell({
      rowIdx: rowIdx + minRowIdx + 1,
      idx: column.idx
    });
  });
  const selectBottomSummaryCellLatest = (0, _hooks.useLatestFunc)((summaryRow, column) => {
    const rowIdx = bottomSummaryRows.indexOf(summaryRow) + rows.length;
    selectCell({
      rowIdx,
      idx: column.idx
    });
  });
  const toggleGroupLatest = (0, _hooks.useLatestFunc)(toggleGroup);
  const toggleTreeLatest = (0, _hooks.useLatestFunc)(toggleTree);

  /**
   * effects
   */
  (0, _hooks.useLayoutEffect)(() => {
    if (!selectedCellIsWithinSelectionBounds || isSamePosition(selectedPosition, prevSelectedPosition.current)) {
      prevSelectedPosition.current = selectedPosition;
      return;
    }
    prevSelectedPosition.current = selectedPosition;
    if (selectedPosition.idx === -1) {
      rowRef.current.focus({
        preventScroll: true
      });
      (0, _utils.scrollIntoView)(rowRef.current);
    }
  });
  (0, _hooks.useLayoutEffect)(() => {
    if (!isWidthInitialized || flexWidthViewportColumns.length === 0) return;
    setColumnWidths(columnWidths => {
      const newColumnWidths = new Map(columnWidths);
      const grid = gridRef.current;
      for (const column of flexWidthViewportColumns) {
        const measuringCell = grid.querySelector("[data-measuring-cell-key=\"".concat(column.key, "\"]"));
        // Set the actual width of the column after it is rendered
        const {
          width
        } = measuringCell.getBoundingClientRect();
        newColumnWidths.set(column.key, width);
      }
      return newColumnWidths;
    });
  }, [isWidthInitialized, flexWidthViewportColumns, gridRef]);
  (0, _react.useImperativeHandle)(ref, () => ({
    element: gridRef.current,
    scrollToColumn,
    scrollToRow(rowIdx) {
      const {
        current
      } = gridRef;
      if (!current) return;
      current.scrollTo({
        top: getRowTop(rowIdx),
        behavior: "smooth"
      });
    },
    selectCell,
    api: apiObject,
    columnApi: columnApiObject,
    node
  }));

  /**
   * callbacks
   */
  const setDraggedOverRowIdx = (0, _react.useCallback)(rowIdx => {
    setOverRowIdx(rowIdx);
    latestDraggedOverRowIdx.current = rowIdx;
  }, []);

  /**
   * event handlers
   */
  function handleColumnResize(column, width) {
    const {
      style
    } = gridRef.current;
    const newTemplateColumns = [...templateColumns];
    newTemplateColumns[column.idx] = width === "max-content" ? width : "".concat(width, "px");
    style.gridTemplateColumns = newTemplateColumns.join(" ");
    const measuringCell = gridRef.current.querySelector("[data-measuring-cell-key=\"".concat(column.key, "\"]"));
    const measuredWidth = measuringCell.getBoundingClientRect().width;
    const measuredWidthPx = "".concat(measuredWidth, "px");

    // Immediately update `grid-template-columns` to prevent the column from jumping to its min/max allowed width.
    // Only measuring cells have the min/max width set for proper colSpan support,
    // which is why other cells may render at the previously set width, beyond the min/max.
    // An alternative for the above would be to use flushSync.
    // We also have to reset `max-content` so it doesn't remain stuck on `max-content`.
    if (newTemplateColumns[column.idx] !== measuredWidthPx) {
      newTemplateColumns[column.idx] = measuredWidthPx;
      style.gridTemplateColumns = newTemplateColumns.join(" ");
    }
    if (columnWidths.get(column.key) === measuredWidth) return;
    const newColumnWidths = new Map(columnWidths);
    newColumnWidths.set(column.key, measuredWidth);
    setColumnWidths(newColumnWidths);
    onColumnResize === null || onColumnResize === void 0 || onColumnResize(column.idx, measuredWidth);
  }
  function selectAllRows(checked) {
    if (!onSelectedRowsChange1) return;
    (0, _utils.assertIsValidKeyGetter)(rowKeyGetter);
    const newSelectedRows = new Set(selectedRows1);
    const newSelectedRows1 = selectedRows;
    for (const row of rawRows) {
      const rowKey = rowKeyGetter(row);
      if (checked) {
        newSelectedRows.add(rowKey);
        if (!newSelectedRows1.includes(row)) newSelectedRows1.push(row);
      } else {
        newSelectedRows.delete(rowKey);
        newSelectedRows1.splice(newSelectedRows1.indexOf(row), 1);
      }
    }
    if (onSelectedRowsChange) onSelectedRowsChange(newSelectedRows1);
    onSelectedRowsChange1(newSelectedRows);
  }
  function toggleGroup(expandedGroupId) {
    if (!onExpandedGroupIdsChange) return;
    const newExpandedGroupIds = new Set(expandedGroupIds);
    if (newExpandedGroupIds.has(expandedGroupId)) {
      newExpandedGroupIds.delete(expandedGroupId);
    } else {
      newExpandedGroupIds.add(expandedGroupId);
    }
    onExpandedGroupIdsChange(newExpandedGroupIds);
  }
  (0, _react.useEffect)(() => {
    if (expandedTreeIds.length > 0) {
      let sampleRawRows = raawRows;
      expandedTreeIds.map(id => {
        sampleRawRows.map((data, index) => {
          const rowKey = rowKeyGetter(data);
          if (id === rowKey) {
            var _data$children;
            let sampleRow = (_data$children = data.children) === null || _data$children === void 0 ? void 0 : _data$children.map(obj => obj);
            if (index !== 0) {
              sampleRawRows = [...sampleRawRows.slice(0, index + 1), ...sampleRow, ...sampleRawRows.slice(index + 1)];
            } else {
              sampleRawRows = [sampleRawRows[index], ...sampleRow, ...sampleRawRows.slice(index + 1)];
            }
          }
        });
      });
      setRawRows(sampleRawRows);
    } else {
      setRawRows(raawRows);
    }
  }, [expandedTreeIds]);
  function toggleTree(newExpandedTreeId) {
    if (!expandedTreeIds.includes(newExpandedTreeId)) {
      setExpandedTreeIds([...expandedTreeIds, newExpandedTreeId]);
    } else {
      setExpandedTreeIds(expandedTreeIds.filter(value => value !== newExpandedTreeId));
    }
  }
  function handleKeyDown(event) {
    if (!(event.target instanceof Element)) return;
    const isCellEvent = event.target.closest(".rdg-cell") !== null;
    const isRowEvent = hasGroups && event.target === rowRef.current;
    if (!(isCellEvent || isRowEvent)) return;
    const {
      key,
      keyCode
    } = event;
    const {
      rowIdx
    } = selectedPosition;
    if (selectedCellIsWithinViewportBounds && (onPaste != null || onCopy != null) && (0, _utils.isCtrlKeyHeldDown)(event) && !isGroupRow(rows[rowIdx]) && selectedPosition.mode === "SELECT") {
      // event.key may differ by keyboard input language, so we use event.keyCode instead
      // event.nativeEvent.code cannot be used either as it would break copy/paste for the DVORAK layout
      const cKey = 67;
      const vKey = 86;
      if (keyCode === cKey) {
        handleCopy();
        return;
      }
      if (keyCode === vKey) {
        handlePaste();
        return;
      }
    }
    if (isRowIdxWithinViewportBounds(rowIdx)) {
      const row = rows[rowIdx];
      if (isGroupRow(row) && selectedPosition.idx === -1 && (
      // Collapse the current group row if it is focused and is in expanded state
      key === leftKey && row.isExpanded ||
      // Expand the current group row if it is focused and is in collapsed state
      key === rightKey && !row.isExpanded)) {
        event.preventDefault(); // Prevents scrolling
        toggleGroup(row.id);
        return;
      }
    }
    switch (event.key) {
      case "Escape":
        setCopiedCell(null);
        return;
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
      case "Tab":
      case "Home":
      case "End":
      case "PageUp":
      case "PageDown":
        navigate(event);
        break;
      default:
        handleCellInput(event);
        break;
    }
  }
  function handleScroll(event) {
    const {
      scrollTop,
      scrollLeft
    } = event.currentTarget;
    (0, _reactDom.flushSync)(() => {
      setScrollTop(scrollTop);
      // scrollLeft is nagative when direction is rtl
      setScrollLeft((0, _utils.abs)(scrollLeft));
    });
    onScroll === null || onScroll === void 0 || onScroll(event);
  }
  function getRawRowIdx(rowIdx) {
    return hasGroups ? rawRows.indexOf(rows[rowIdx]) : rowIdx;
  }
  function findCahngedKey(newObj, oldObj) {
    var _Object$keys, _Object$keys2;
    if (((_Object$keys = Object.keys(oldObj)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) === 0 && ((_Object$keys2 = Object.keys(newObj)) === null || _Object$keys2 === void 0 ? void 0 : _Object$keys2.length) > 0) return newObj;
    let diff = {};
    for (const key in oldObj) {
      if (newObj[key] && oldObj[key] !== newObj[key]) {
        diff[key] = newObj[key];
      }
    }
    if (Object.keys(diff).length > 0) return Object.keys(diff);
    return [];
  }
  const [changedList, setChangedList] = (0, _react.useState)([]);
  const [sample, setSample] = (0, _react.useState)([]);
  (0, _useUpdateEffect.default)(() => {
    setSample([...raawRows]);
  }, [raawRows]);
  (0, _useUpdateEffect.default)(() => {
    setSample([...raawRows]);
  }, []);
  function updateRow(column, rowIdx, row) {
    let sampleData = raawRows;
    let sampleChanged = changedList;
    sampleChanged[rowIdx] = findCahngedKey(row, sampleData[rowIdx]);
    setChangedList(sampleChanged);
    sampleData[rowIdx] = row;
    setRawRows([...sampleData]);
    if (typeof onRowsChange !== "function") return;
    const rawRowIdx = getRawRowIdx(rowIdx);
    if (row === rawRows[rawRowIdx]) return;
    const updatedRows = [...rawRows];
    updatedRows[rawRowIdx] = row;
    onRowsChange(updatedRows, {
      indexes: [rawRowIdx],
      column
    });
  }
  function commitEditorChanges() {
    if (selectedPosition.mode !== "EDIT") return;
    updateRow(columns[selectedPosition.idx], selectedPosition.rowIdx, selectedPosition.row);
  }
  function handleCopy() {
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const sourceRow = rawRows[getRawRowIdx(rowIdx)];
    const sourceColumnKey = columns[idx].key;
    setCopiedCell({
      row: sourceRow,
      columnKey: sourceColumnKey
    });
    onCopy === null || onCopy === void 0 || onCopy({
      sourceRow,
      sourceColumnKey
    });
  }
  function handlePaste() {
    if (!(onPaste && onRowsChange) || copiedCell === null || !isCellEditable(selectedPosition)) {
      return;
    }
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const targetColumn = columns[idx];
    const targetRow = rawRows[getRawRowIdx(rowIdx)];
    const updatedTargetRow = onPaste({
      sourceRow: copiedCell.row,
      sourceColumnKey: copiedCell.columnKey,
      targetRow,
      targetColumnKey: targetColumn.key
    });
    updateRow(targetColumn, rowIdx, updatedTargetRow);
  }
  function handleCellInput(event) {
    var _column$editorOptions, _column$editorOptions2;
    if (!selectedCellIsWithinViewportBounds) return;
    const row = rows[selectedPosition.rowIdx];
    if (isGroupRow(row)) return;
    const {
      key,
      shiftKey
    } = event;

    // Select the row on Shift + Space
    if (isSelectable && shiftKey && key === " ") {
      (0, _utils.assertIsValidKeyGetter)(rowKeyGetter);
      const rowKey = rowKeyGetter(row);
      selectRow({
        row,
        checked: !selectedRows1.has(rowKey),
        isShiftClick: false
      });
      // do not scroll
      event.preventDefault();
      return;
    }
    const column = columns4[selectedPosition.idx];
    (_column$editorOptions = column.editorOptions) === null || _column$editorOptions === void 0 || (_column$editorOptions2 = _column$editorOptions.onCellKeyDown) === null || _column$editorOptions2 === void 0 || _column$editorOptions2.call(_column$editorOptions, event);
    if (event.isDefaultPrevented()) return;
    if (isCellEditable(selectedPosition) && (0, _utils.isDefaultCellInput)(event)) {
      setSelectedPosition(_ref7 => {
        let {
          idx,
          rowIdx
        } = _ref7;
        return {
          idx,
          rowIdx,
          mode: "EDIT",
          row,
          originalRow: row
        };
      });
    }
  }

  /**
   * utils
   */
  function isColIdxWithinSelectionBounds(idx) {
    return idx >= minColIdx && idx <= maxColIdx;
  }
  function isRowIdxWithinViewportBounds(rowIdx) {
    return rowIdx >= 0 && rowIdx < rows.length;
  }
  function isCellWithinSelectionBounds(_ref8) {
    let {
      idx,
      rowIdx
    } = _ref8;
    return rowIdx >= minRowIdx && rowIdx <= maxRowIdx && isColIdxWithinSelectionBounds(idx);
  }
  function isCellWithinViewportBounds(_ref9) {
    let {
      idx,
      rowIdx
    } = _ref9;
    return isRowIdxWithinViewportBounds(rowIdx) && isColIdxWithinSelectionBounds(idx);
  }
  function isCellEditable(position) {
    return isCellWithinViewportBounds(position) && (0, _utils.isSelectedCellEditable)({
      columns4,
      rows,
      selectedPosition: position,
      isGroupRow
    });
  }
  function selectCell(position, enableEditor) {
    if (!isCellWithinSelectionBounds(position)) return;
    commitEditorChanges();
    if (enableEditor && isCellEditable(position)) {
      const row = rows[position.rowIdx];
      setSelectedPosition(_objectSpread(_objectSpread({}, position), {}, {
        mode: "EDIT",
        row,
        originalRow: row
      }));
    } else if (isSamePosition(selectedPosition, position)) {
      var _gridRef$current;
      // Avoid re-renders if the selected cell state is the same
      (0, _utils.scrollIntoView)((_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : _gridRef$current.querySelector('[tabindex="0"]'));
    } else {
      setSelectedPosition(_objectSpread(_objectSpread({}, position), {}, {
        mode: "SELECT"
      }));
    }
  }
  function scrollToColumn(idx) {
    const {
      current
    } = gridRef;
    if (!current) return;
    if (idx > lastFrozenColumnIndex) {
      const {
        rowIdx
      } = selectedPosition;
      if (!isCellWithinSelectionBounds({
        rowIdx,
        idx
      })) return;
      const {
        clientWidth
      } = current;
      const column = columns[idx];
      const {
        left,
        width
      } = columnMetrics.get(column);
      let right = left + width;
      const colSpan = (0, _utils.getSelectedCellColSpan)({
        rows,
        topSummaryRows,
        bottomSummaryRows,
        rowIdx,
        lastFrozenColumnIndex,
        column,
        isGroupRow
      });
      if (colSpan !== undefined) {
        const {
          left,
          width
        } = columnMetrics.get(columns[column.idx + colSpan - 1]);
        right = left + width;
      }
      const isCellAtLeftBoundary = left < scrollLeft + totalFrozenColumnWidth;
      const isCellAtRightBoundary = right > clientWidth + scrollLeft;
      const sign = isRtl ? -1 : 1;
      if (isCellAtLeftBoundary) {
        current.scrollLeft = (left - totalFrozenColumnWidth) * sign;
      } else if (isCellAtRightBoundary) {
        current.scrollLeft = (right - clientWidth) * sign;
      }
    }
  }
  function getNextPosition(key, ctrlKey, shiftKey) {
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const row = rows[rowIdx];
    const isRowSelected = selectedCellIsWithinSelectionBounds && idx === -1;

    // If a group row is focused, and it is collapsed, move to the parent group row (if there is one).
    if (key === leftKey && isRowSelected && isGroupRow(row) && !row.isExpanded && row.level !== 0) {
      let parentRowIdx = -1;
      for (let i = selectedPosition.rowIdx - 1; i >= 0; i--) {
        const parentRow = rows[i];
        if (isGroupRow(parentRow) && parentRow.id === row.parentId) {
          parentRowIdx = i;
          break;
        }
      }
      if (parentRowIdx !== -1) {
        return {
          idx,
          rowIdx: parentRowIdx
        };
      }
    }
    switch (key) {
      case "ArrowUp":
        return {
          idx,
          rowIdx: rowIdx - 1
        };
      case "ArrowDown":
        return {
          idx,
          rowIdx: rowIdx + 1
        };
      case leftKey:
        return {
          idx: idx - 1,
          rowIdx
        };
      case rightKey:
        return {
          idx: idx + 1,
          rowIdx
        };
      case "Tab":
        return {
          idx: idx + (shiftKey ? -1 : 1),
          rowIdx
        };
      case "Home":
        // If row is selected then move focus to the first row
        if (isRowSelected) return {
          idx,
          rowIdx: 0
        };
        return {
          idx: 0,
          rowIdx: ctrlKey ? minRowIdx : rowIdx
        };
      case "End":
        // If row is selected then move focus to the last row.
        if (isRowSelected) return {
          idx,
          rowIdx: rows.length - 1
        };
        return {
          idx: maxColIdx,
          rowIdx: ctrlKey ? maxRowIdx : rowIdx
        };
      case "PageUp":
        {
          if (selectedPosition.rowIdx === minRowIdx) return selectedPosition;
          const nextRowY = getRowTop(rowIdx) + getRowHeight(rowIdx) - clientHeight;
          return {
            idx,
            rowIdx: nextRowY > 0 ? findRowIdx(nextRowY) : 0
          };
        }
      case "PageDown":
        {
          if (selectedPosition.rowIdx >= rows.length) return selectedPosition;
          const nextRowY = getRowTop(rowIdx) + clientHeight;
          return {
            idx,
            rowIdx: nextRowY < totalRowHeight ? findRowIdx(nextRowY) : rows.length - 1
          };
        }
      default:
        return selectedPosition;
    }
  }
  function navigate(event) {
    const {
      key,
      shiftKey
    } = event;
    let mode = cellNavigationMode;
    if (key === "Tab") {
      if ((0, _utils.canExitGrid)({
        shiftKey,
        cellNavigationMode,
        maxColIdx,
        minRowIdx,
        maxRowIdx,
        selectedPosition
      })) {
        commitEditorChanges();
        // Allow focus to leave the grid so the next control in the tab order can be focused
        return;
      }
      mode = cellNavigationMode === "NONE" ? "CHANGE_ROW" : cellNavigationMode;
    }

    // Do not allow focus to leave
    event.preventDefault();
    const ctrlKey = (0, _utils.isCtrlKeyHeldDown)(event);
    const nextPosition = getNextPosition(key, ctrlKey, shiftKey);
    if (isSamePosition(selectedPosition, nextPosition)) return;
    const nextSelectedCellPosition = (0, _utils.getNextSelectedCellPosition)({
      columns,
      colSpanColumns,
      rows,
      topSummaryRows,
      bottomSummaryRows,
      minRowIdx,
      maxRowIdx,
      lastFrozenColumnIndex,
      cellNavigationMode: mode,
      currentPosition: selectedPosition,
      nextPosition,
      isCellWithinBounds: isCellWithinSelectionBounds,
      isGroupRow
    });
    selectCell(nextSelectedCellPosition);
  }
  function getDraggedOverCellIdx(currentRowIdx) {
    if (draggedOverRowIdx === undefined) return;
    const {
      rowIdx
    } = selectedPosition;
    const isDraggedOver = rowIdx < draggedOverRowIdx ? rowIdx < currentRowIdx && currentRowIdx <= draggedOverRowIdx : rowIdx > currentRowIdx && currentRowIdx >= draggedOverRowIdx;
    return isDraggedOver ? selectedPosition.idx : undefined;
  }
  function getLayoutCssVars() {
    if (flexWidthViewportColumns.length === 0) return layoutCssVars;
    const newTemplateColumns = [...templateColumns];
    for (const column of flexWidthViewportColumns) {
      newTemplateColumns[column.idx] = column.width;
    }
    return _objectSpread(_objectSpread({}, layoutCssVars), {}, {
      gridTemplateColumns: newTemplateColumns.join(" ")
    });
  }
  function handleFill(_ref10) {
    let {
      columnKey,
      sourceRow,
      targetRow
    } = _ref10;
    return _objectSpread(_objectSpread({}, targetRow), {}, {
      [columnKey]: sourceRow[columnKey]
    });
  }
  function getDragHandle(rowIdx) {
    if (selectedPosition.rowIdx !== rowIdx || selectedPosition.mode === "EDIT" || hasGroups ||
    // drag fill is not supported when grouping is enabled
    onFill == null) {
      return;
    }
    return /*#__PURE__*/_react.default.createElement(_DragHandle.default, {
      rows: rawRows,
      columns: columns,
      selectedPosition: selectedPosition,
      isCellEditable: isCellEditable,
      latestDraggedOverRowIdx: latestDraggedOverRowIdx,
      onRowsChange: onRowsChange,
      onFill: onFill ? handleFill : null,
      setDragging: setDragging,
      setDraggedOverRowIdx: setDraggedOverRowIdx
    });
  }
  function getCellEditor(rowIdx) {
    if (selectedPosition.rowIdx !== rowIdx || selectedPosition.mode === "SELECT") return;
    const {
      idx,
      row
    } = selectedPosition;
    const column = columns4[idx];
    const colSpan = (0, _utils.getColSpan)(column, lastFrozenColumnIndex, {
      type: "ROW",
      row
    });
    const closeEditor = () => {
      setSelectedPosition(_ref11 => {
        let {
          idx,
          rowIdx
        } = _ref11;
        return {
          idx,
          rowIdx,
          mode: "SELECT"
        };
      });
    };
    const onRowChange = (row, commitChanges) => {
      if (commitChanges) {
        updateRow(column, selectedPosition.rowIdx, row);
        closeEditor();
      } else {
        setSelectedPosition(position => _objectSpread(_objectSpread({}, position), {}, {
          row
        }));
      }
    };
    if (rows[selectedPosition.rowIdx] !== selectedPosition.originalRow) {
      // Discard changes if rows are updated from outside
      closeEditor();
    }
    return /*#__PURE__*/_react.default.createElement(_EditCell.default, {
      key: "".concat(column.key),
      column: column,
      colSpan: colSpan,
      row: row,
      handleReorderRow: handleReorderRow,
      allrow: raawRows,
      rowIndex: rowIdx,
      api: apiObject,
      node: node,
      onRowChange: onRowChange,
      closeEditor: closeEditor
    });
  }
  function getRowViewportColumns(rowIdx) {
    const selectedColumn = columns[selectedPosition.idx];
    if (
    // idx can be -1 if grouping is enabled
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    selectedColumn !== undefined && selectedPosition.rowIdx === rowIdx && !viewportColumns.includes(selectedColumn)) {
      // Add the selected column to viewport columns if the cell is not within the viewport
      return selectedPosition.idx > colOverscanEndIdx ? [...viewportColumns, selectedColumn] : [...viewportColumns.slice(0, lastFrozenColumnIndex + 1), selectedColumn, ...viewportColumns.slice(lastFrozenColumnIndex + 1)];
    }
    return viewportColumns;
  }
  var node;
  var endRowIdxForRender;
  const [RowNodes, setRowNodes] = (0, _react.useState)();
  function forEachNode(newFunction) {
    RowNodes.forEach(data => {
      newFunction(data);
    });
  }
  function getRowBounds(index) {
    return {
      rowTop: RowNodes[index].rowTop,
      rowHeight: RowNodes[index].rowHeight
    };
  }
  function isRowPresent(object1) {
    let result = false;
    RowNodes.forEach(obj => {
      if (_lodash._.isEqual(object1, obj)) {
        result = true;
      }
    });
    return result;
  }
  function getNodesInRangeForSelection(obj1, obj2) {
    let firstIndex;
    let secondIndex;
    let startIndex;
    let endIndex;
    RowNodes.map((obj, idx) => {
      if (_lodash._.isEqual(obj1, obj)) {
        firstIndex = idx;
      }
      return true;
    });
    RowNodes.map((obj, idx) => {
      if (_lodash._.isEqual(obj2, obj)) {
        secondIndex = idx;
      }
      return true;
    });
    if (firstIndex && secondIndex) {
      if (firstIndex < secondIndex) {
        startIndex = firstIndex;
        endIndex = secondIndex;
      } else {
        endIndex = firstIndex;
        startIndex = secondIndex;
      }
    } else if (firstIndex) {
      startIndex = 0;
      endIndex = firstIndex;
    } else if (secondIndex) {
      startIndex = 0;
      endIndex = secondIndex;
    }
    return RowNodes.slice(startIndex, endIndex + 1);
  }
  let getModelObject = {
    getRow: index => RowNodes[index],
    getRowNode: idValue => RowNodes.filter(data => data.id === idValue),
    getRowCount: () => rows.length,
    getTopLevelRowCount: () => rows.length,
    getTopLevelRowDisplayedIndex: index => rows[index] ? index : null,
    getRowIndexAtPixel: pixel => Math.floor(pixel / rowHeight),
    isRowPresent,
    getRowBounds,
    isEmpty: () => raawRows.length === 0,
    isRowsToRender: () => endRowIdxForRender !== 0,
    getNodesInRangeForSelection,
    forEachNode,
    getType: () => "clientSide",
    isLastRowIndexKnown: () => true
    // ensureRowHeightsValid
    // start
  };

  function applyTransaction(transactionObject) {
    var _transactionObject$re;
    let newRows = rows;
    let updatedRowNodes = {
      added: [],
      updated: [],
      removed: []
    };
    let isUpdated = 0;
    //Add Rows
    let rowIndex1 = transactionObject.addIndex + 1;
    for (let i = 0; i < ((_transactionObject$ad = transactionObject.add) === null || _transactionObject$ad === void 0 ? void 0 : _transactionObject$ad.length); i++) {
      var _transactionObject$ad;
      let rowIndex;
      if (rowKeyGetter) {
        rowIndex = findRowIndex(rowKeyGetter(transactionObject.add[i]));
      } else {
        rowIndex = findRowIndex(transactionObject.add[i].id);
      }
      if (rowIndex === -1) {
        if (transactionObject.addIndex) {
          if (transactionObject.addIndex > raawRows.length) return;
          const newRowNode = createNewRowNode(rowIndex1, transactionObject.add[i]);
          newRows.splice(rowIndex1, 0, newRowNode.data);
          LeafNodes.splice(rowIndex1, 0, newRowNode);
          updatedRowNodes.added.push(LeafNodes[rowIndex1]);
          rowIndex1++;
          isUpdated++;
        } else {
          rowIndex = transactionObject.add[i].id - 1;
          const newRowNode = createNewRowNode(rowIndex, transactionObject.add[i]);
          newRows.splice(rowIndex, 0, newRowNode.data);
          LeafNodes.splice(rowIndex, 0, newRowNode);
          updatedRowNodes.added.push(newRowNode);
          isUpdated++;
        }
      }
    }

    //Update Row Data
    for (let i = 0; i < ((_transactionObject$up = transactionObject.update) === null || _transactionObject$up === void 0 ? void 0 : _transactionObject$up.length); i++) {
      var _transactionObject$up;
      const values = Object.entries(transactionObject.update[i]);
      let rowIndex;
      if (rowKeyGetter) {
        rowIndex = findRowIndex(rowKeyGetter(transactionObject.update[i]));
      } else {
        rowIndex = findRowIndex(transactionObject.update[i].id);
      }
      for (let j = 0; j < values.length; j++) {
        const field = values[j][0];
        const value = values[j][1];
        LeafNodes[rowIndex].data[field] = value;
      }
      updatedRowNodes.updated.push(LeafNodes[rowIndex]);
      isUpdated++;
    }
    //Remove Rows
    (_transactionObject$re = transactionObject.remove) === null || _transactionObject$re === void 0 || _transactionObject$re.sort((a, b) => a.id < b.id ? 1 : -1);
    for (let i = 0; i < ((_transactionObject$re2 = transactionObject.remove) === null || _transactionObject$re2 === void 0 ? void 0 : _transactionObject$re2.length); i++) {
      var _transactionObject$re2;
      let rowIndex;
      if (rowKeyGetter) {
        rowIndex = findRowIndex(rowKeyGetter(transactionObject.remove[i]));
      } else {
        rowIndex = findRowIndex(transactionObject.remove[i].id);
      }
      if (rowIndex > -1) {
        newRows.splice(rowIndex, 1);
        updatedRowNodes.removed.push(LeafNodes[rowIndex]);
        LeafNodes.splice(rowIndex, 1);
        isUpdated++;
      }
    }
    if (isUpdated > 0) RowNodes[0].setDataValue("", "");
    return updatedRowNodes;
  }
  function setRowData(rowData) {
    if (rowData) {
      setRawRows(rowData);
    }
  }
  var LeafNodes = getAllLeafNodes();
  function getAllLeafNodes() {
    let leafNodes = [];
    for (let i = 0; i < raawRows.length; i++) {
      var _raawRows$i$id;
      var node = {
        rowIndex: i,
        childIndex: i + 1,
        data: raawRows[i],
        rowHeight: getRowHeight(i),
        lastChild: raawRows.length === i + 1,
        firstChild: i === 0,
        id: (_raawRows$i$id = raawRows[i].id) !== null && _raawRows$i$id !== void 0 ? _raawRows$i$id : String(i)
        // selected: selectedRows.includes(i),
      };

      leafNodes.push(node);
    }
    return leafNodes;
  }
  function forEachLeafNode(callback, rowNodes) {
    let updatedLeafNodes = [];
    for (let i = 0; (_ref12 = i < (rowNodes === null || rowNodes === void 0 ? void 0 : rowNodes.length)) !== null && _ref12 !== void 0 ? _ref12 : LeafNodes.length; i++) {
      var _ref12, _rowNodes$i, _rowNodes$i$data;
      callback((_rowNodes$i = rowNodes[i]) !== null && _rowNodes$i !== void 0 ? _rowNodes$i : LeafNodes[i]);
      updatedLeafNodes.push((_rowNodes$i$data = rowNodes[i].data) !== null && _rowNodes$i$data !== void 0 ? _rowNodes$i$data : LeafNodes[i].data);
    }
    setRawRows(updatedLeafNodes);
  }
  function forEachLeafNodeAfterFilter(callback) {
    forEachLeafNode(callback, RowNodes);
  }
  function forEachLeafNodeAfterFilterAndSort(callback) {
    forEachLeafNode(callback, RowNodes);
  }
  function findRowIndex(id) {
    let index = -1;
    for (let i = 0; i < LeafNodes.length; i++) {
      var _LeafNodes$i$data;
      if (id === ((_LeafNodes$i$data = LeafNodes[i].data) === null || _LeafNodes$i$data === void 0 ? void 0 : _LeafNodes$i$data.id)) index = LeafNodes[i].rowIndex;
    }
    return index;
  }
  function createNewRowNode(index, data) {
    var _data$id;
    const newRowNode = {
      rowIndex: index,
      childIndex: index + 1,
      data: data,
      rowHeight: getRowHeight(index),
      lastChild: LeafNodes.length === index - 1,
      firstChild: index === 0,
      id: (_data$id = data.id) !== null && _data$id !== void 0 ? _data$id : String(index + 1)
    };
    return newRowNode;
  }
  function selectAll(filteredRows) {
    if (!onSelectedRowsChange) return;
    (0, _utils.assertIsValidKeyGetter)(rowKeyGetter);
    const newSelectedRows = new Set(selectedRows1);
    const newSelectedRows1 = selectedRows;
    for (const row of (_filteredRows$data = filteredRows === null || filteredRows === void 0 ? void 0 : filteredRows.data) !== null && _filteredRows$data !== void 0 ? _filteredRows$data : rawRows) {
      var _filteredRows$data;
      const rowKey = rowKeyGetter(row);
      newSelectedRows.add(rowKey);
      if (!newSelectedRows1.includes(row)) newSelectedRows1.push(row);
    }
    onSelectedRowsChange1(newSelectedRows);
  }
  function deselectAll(filteredRows) {
    if (!onSelectedRowsChange) return;
    (0, _utils.assertIsValidKeyGetter)(rowKeyGetter);
    let newSelectedRows = new Set(selectedRows1);
    let newSelectedRows1 = selectedRows;
    for (const row of (_filteredRows$data2 = filteredRows === null || filteredRows === void 0 ? void 0 : filteredRows.data) !== null && _filteredRows$data2 !== void 0 ? _filteredRows$data2 : rawRows) {
      var _filteredRows$data2;
      const rowKey = rowKeyGetter(row);
      newSelectedRows.delete(rowKey);
      newSelectedRows1.splice(newSelectedRows1.indexOf(row), 1);
    }
    onSelectedRowsChange1(newSelectedRows);
  }
  function getSelectedNodes() {
    let selectedNodes = [];
    const selectedRowsSet = Array.from(selectedRows1);
    RowNodes === null || RowNodes === void 0 || RowNodes.forEach(rowNode => {
      const rowKey = rowKeyGetter === null || rowKeyGetter === void 0 ? void 0 : rowKeyGetter(rowNode.data);
      if (selectedRowsSet.includes(rowKey)) selectedNodes.push(rowNode);
    });
    return selectedNodes;
  }
  function getSelectedRows() {
    let selectedRows = [];
    const selectedRowsSet = Array.from(selectedRows1);
    raawRows.forEach(row => {
      const rowKey = rowKeyGetter === null || rowKeyGetter === void 0 ? void 0 : rowKeyGetter(row);
      if (selectedRowsSet.includes(rowKey)) selectedRows.push(row);
    });
    return selectedRows;
  }
  function selectAllFiltered() {
    selectAll(RowNodes);
  }
  function deselectAllFiltered() {
    deselectAll(RowNodes);
  }
  var totalPages = Math.floor(raawRows.length / size) + (raawRows.length % size < 0 ? 1 : 0);
  function paginationGoToPage(pageNumberNew) {
    if (pagination) {
      if (0 < pageNumberNew && pageNumberNew <= totalPages) {
        setCurrent(pageNumberNew);
      } else if (pageNumberNew < 0) {
        setCurrent(1);
      } else if (pageNumberNew > totalPages) {
        setCurrent(totalPages);
      }
    }
  }
  function paginationGoToNextPage() {
    if (pagination && current + 1 <= totalPages) {
      setCurrent(current + 1);
    }
  }
  function paginationGoToPreviousPage() {
    if (pagination && current - 1 > 0) {
      setCurrent(current - 1);
    }
  }
  function getFocusedCell() {
    return selectedPosition.rowIdx >= 0 ? {
      rowIndex: selectedPosition.rowIdx,
      column: columns[selectedPosition.idx]
    } : undefined;
  }
  function setFocusedCell(idx, key) {
    let index;
    columns.map((obj, position) => {
      if (obj.key === key) {
        index = position;
      }
      return true;
    });
    setSelectedPosition({
      idx: index,
      rowIdx: idx,
      mode: "SELECT"
    });
  }
  function tabToNextCell() {
    let columnLength = columns.length;
    let rowsLength = rows.length;
    let idx;
    let rowIdx;
    if (selectedPosition.idx + 1 < columnLength) {
      idx = selectedPosition.idx + 1;
      rowIdx = selectedPosition.rowIdx;
    } else {
      idx = 0;
      rowIdx = selectedPosition.rowIdx + 1 < rowsLength ? selectedPosition.rowIdx + 1 : 0;
    }
    setSelectedPosition({
      idx: idx,
      rowIdx: rowIdx,
      mode: "SELECT"
    });
  }
  function tabToPreviousCell() {
    let columnLength = columns.length;
    let rowsLength = rows.length;
    let idx;
    let rowIdx;
    if (selectedPosition.idx - 1 >= 0) {
      idx = selectedPosition.idx - 1;
      rowIdx = selectedPosition.rowIdx;
    } else {
      idx = columnLength - 1;
      rowIdx = selectedPosition.rowIdx - 1 >= 0 ? selectedPosition.rowIdx - 1 : rowsLength - 1;
    }
    setSelectedPosition({
      idx: idx,
      rowIdx: rowIdx,
      mode: "SELECT"
    });
  }
  function exportDataAsCsv(fileName) {
    let name = fileName !== null && fileName !== void 0 ? fileName : "ExportToCSV";
    (0, _exportUtils.exportToCsv)(rawRows, rawColumns, name);
  }
  function exportDataAsExcel(fileName) {
    let name = fileName !== null && fileName !== void 0 ? fileName : "ExportToXlsx";
    (0, _exportUtils.exportToXlsx)(rawRows, rawColumns, name);
  }
  function exportDataAsPdf(fileName) {
    let name = fileName !== null && fileName !== void 0 ? fileName : "ExportToPdf";
    (0, _exportUtils.exportToPdf)(rawRows, rawColumns, name);
  }
  function isAnyFilterPresent() {
    let filterPresent = false;
    viewportColumns.forEach(obj => {
      if (obj !== null && obj !== void 0 && obj.filter) filterPresent = true;
    });
    return filterPresent;
  }
  let getViewportRowsSample = (0, _hooks.useLatestFunc)(rowArray => {
    let rowElementsSample = [];
    let listOfRows = rowArray;
    let node;
    // let startRowIndex = 0;

    const {
      rowIdx: selectedRowIdx
    } = selectedPosition;
    const startRowIdx = 0;
    const endRowIdx = listOfRows.length - 1;
    for (let viewportRowIdx = startRowIdx; viewportRowIdx <= endRowIdx; viewportRowIdx++) {
      var _row$id, _rows$rowIdx;
      const isRowOutsideViewport = viewportRowIdx === rowOverscanStartIdx - 1 || viewportRowIdx === rowOverscanEndIdx + 1;
      const rowIdx = isRowOutsideViewport ? selectedRowIdx : viewportRowIdx;

      //   let rowColumns = viewportColumns;
      // const selectedColumn = columns[selectedIdx];
      // selectedIdx can be -1 if grouping is enabled
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition

      const row = listOfRows[rowIdx];
      // const gridRowStart = headerRowsCount + topSummaryRowsCount + rowIdx + 1;

      // startRowIndex++;
      // let key;
      // let isRowSelected = false;

      // key = hasGroups ? startRowIndex : rowIdx;

      function setDataValue(key, newValue) {
        let data = row;
        data[key] = newValue;
        let list = [...rawRows];
        list[rowIdx] = data;
        setRawRows(list);
      }
      function setData(newValue) {
        let list = [...rawRows];
        list[rowIdx] = newValue;
        setRawRows(list);
      }
      node = {
        rowIndex: rowIdx,
        rowTop: rowIdx * rowHeight,
        childIndex: rowIdx + 1,
        data: row,
        rowHeight: rowHeight,
        lastChild: raawRows.length === rowIdx + 1,
        firstChild: rowIdx === 0,
        id: (_row$id = row === null || row === void 0 ? void 0 : row.id) !== null && _row$id !== void 0 ? _row$id : String(rowIdx),
        selected: selectedRowIdx === rowIdx,
        setDataValue,
        setData,
        parent: {
          allLeafChildren: RowNodes,
          childrenAfterFilter: afterFilter,
          childrenAfterSort: afterFilter
        },
        expanded: (_rows$rowIdx = rows[rowIdx]) === null || _rows$rowIdx === void 0 ? void 0 : _rows$rowIdx.isExpanded,
        isSelected: () => selectedRowIdx === rowIdx,
        setSelected: () => {
          selectRow({
            row,
            checked: !selectedRows.includes(rowKeyGetter(row)),
            isShiftClick: false
          });
        },
        isExpandable: () => {
          var _rows$rowIdx2;
          return (_rows$rowIdx2 = rows[rowIdx]) === null || _rows$rowIdx2 === void 0 ? void 0 : _rows$rowIdx2.isExpanded;
        },
        setExpanded: value => {
          var expandIds = new Set(expandedGroupIds);
          let rowKey = rowKeyGetter(rows[rowIdx]);
          if (value) {
            expandIds.add(rowKey);
          } else {
            expandIds.delete(rowKey);
          }
          onExpandedGroupIdsChange(expandIds);
        },
        updateData: setData
        // isSelected: () => isRowSelected,
      };

      rowElementsSample.push(node);
    }
    return rowElementsSample;
  });
  function setSuppressRowDrag(value) {
    if (value) {
      let sampleColumn = raawColumns.map(obj => {
        if (obj !== null && obj !== void 0 && obj.rowDrag) {
          return _objectSpread(_objectSpread({}, obj), {}, {
            rowDrag: false
          });
        } else {
          return obj;
        }
      });
      setRawColumns(sampleColumn);
    }
  }
  function getVerticalPixelRange() {
    return {
      top: scrollTop,
      bottom: scrollTop + document.getElementById("DataGrid").offsetHeight
    };
  }
  function getHorizontalPixelRange() {
    return {
      left: scrollLeft,
      right: scrollLeft + document.getElementById("DataGrid").offsetWidth
    };
  }
  function isColumnFilterPresent() {
    var sampleKeys = Object.keys(filters);
    var result = false;
    sampleKeys.forEach(value => {
      if (value === "undefined" || value === "enabled") {} else {
        if (filters[value] !== "") {
          result = true;
        }
      }
    });
    return result;
  }
  const [selectedData, setSelectedData] = (0, _react.useState)(null);
  (0, _useUpdateEffect.default)(() => {
    if (selectedPosition.mode === "EDIT") {
      var _columns$selectedPosi;
      if ((_columns$selectedPosi = columns[selectedPosition.idx]) !== null && _columns$selectedPosi !== void 0 && _columns$selectedPosi.cellEditor) {
        setSelectedData(selectedPosition);
      }
    }
  }, [selectedPosition]);
  function getEditingCells() {
    return {
      rowIndex: selectedData.rowIdx,
      column: columns[selectedData.idx]
    };
  }
  function setRowNodeExpanded(rowNode, expanded, expandParents) {
    let rData = rowNode.data;
    let item = raawGroupBy === null || raawGroupBy === void 0 ? void 0 : raawGroupBy.map(value => {
      return rData[value];
    });
    let sample = [];
    for (let i = 1; i <= item.length; i++) {
      sample.push(item.slice(0, i).join("__"));
    }
    if (expanded && expandParents) onExpandedGroupIdsChange(new Set(sample));
  }
  const [showHorizontalScroll, setShowHorizontalScroll] = (0, _react.useState)(false);
  const [showVerticalScroll, setShowVerticalScroll] = (0, _react.useState)(false);
  if (showHorizontalScroll || showVerticalScroll) {
    let gridDiv = document.getElementById("DataGrid");
    if (showHorizontalScroll && showVerticalScroll) {
      gridDiv.style.overflowX = "scroll";
      gridDiv.style.overflowY = "scroll";
    } else if (showHorizontalScroll) {
      gridDiv.style.overflowX = "scroll";
      gridDiv.style.overflowY = "auto";
    } else if (showVerticalScroll) {
      gridDiv.style.overflowY = "scroll";
      gridDiv.style.overflowX = "auto";
    }
  }
  function setAlwaysShowHorizontalScroll(show) {
    setShowHorizontalScroll(show);
  }
  function setAlwaysShowVerticalScroll(show) {
    setShowVerticalScroll(show);
  }
  function Scroll(index, rowCount, position, current) {
    if (position === "top") {
      current.scrollTo({
        top: getRowTop(index),
        behavior: "smooth"
      });
    } else if (position === undefined || position === null || position === "bottom") {
      current.scrollTo({
        top: getRowTop(index - rowCount + 2),
        behavior: "smooth"
      });
    } else if (position === "middle") {
      let visibile = rowCount + 2 % 1 !== 0 ? Math.floor((rowCount + 2) / 2) - 2 : Math.floor((rowCount + 2) / 2);
      current.scrollTo({
        top: getRowTop(index - visibile),
        behavior: "smooth"
      });
    }
  }
  const div_height = (_document$getElementB = document.getElementById("DataGrid")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.clientHeight;
  const rowCount = Math.floor(div_height / rowHeight);
  function ensureIndexVisible(index, position) {
    const {
      current
    } = gridRef;
    if (!current) return;
    Scroll(index, rowCount, position, current);
  }
  function ensureNodeVisible(rowNode, position) {
    const {
      current
    } = gridRef;
    let index;
    if (rowNode.rowIndex) {
      index = rowNode.rowIndex;
    } else {
      rows === null || rows === void 0 || rows.map((obj, idx) => {
        if (JSON.stringify(rowNode) === JSON.stringify(obj)) {
          index = idx;
        }
        return true;
      });
    }
    if (!current) return;
    Scroll(index, rowCount, position, current);
  }
  function ensureColumnVisible(key) {
    let columnsValue = raawColumns.map(data => {
      return Object.values(data);
    });
    let index;
    if (typeof key === "string") {
      columnsValue.map((data, idx) => {
        if (data.includes(key)) {
          index = idx;
        }
      });
    }
    scrollToColumn(index);
  }
  var apiObject = {
    getColumnDefs: () => rawColumns,
    setColumnDefs: columns => setRawColumns(columns),
    setRowData: setRowData,
    getRowNode: value => RowNodes[value],
    setHeaderHeight: height => setHeaderHeightFromRef(height),
    getDisplayedRowCount: () => rawRows.length,
    getDisplayedRowAtIndex: index => rawRows[index],
    getFirstDisplayedRow: () => rawRows[0],
    getLastDisplayedRow: () => raawRows[raawRows.length - 1],
    getModel: () => getModelObject,
    forEachNode,
    forEachLeafNode,
    forEachLeafNodeAfterFilter,
    forEachLeafNodeAfterFilterAndSort,
    getSelectedNodes,
    applyTransaction,
    getSelectedRows,
    getValue: (colKey, rowNode) => {
      return LeafNodes[rowNode.rowIndex].data[colKey];
    },
    selectAll: selectAll,
    deselectAll: deselectAll,
    selectAllFiltered,
    deselectAllFiltered,
    getRenderedNodes: () => renderedRowNodes,
    setPagination: value => _setPagination(value),
    paginationIsLastPageFound: () => true,
    paginationGetPageSize: () => pagination ? size : raawRows.length,
    paginationSetPageSize: newPageSize => pagination ? setSize(newPageSize) : null,
    paginationGetCurrentPage: () => current - 1,
    paginationGetTotalPages: () => Math.floor(raawRows.length / size) + (raawRows.length % size < 0 ? 1 : 0),
    paginationGetRowCount: () => pagination ? raawRows.length : 0,
    paginationGoToPage: paginationGoToPage,
    paginationGoToNextPage: paginationGoToNextPage,
    paginationGoToPreviousPage: paginationGoToPreviousPage,
    paginationGoToFirstPage: () => pagination ? setCurrent(1) : null,
    paginationGoToLastPage: () => pagination ? setCurrent(totalPages) : null,
    rowModel: {
      rowsToDisplay: RowNodes,
      rootNode: {
        allLeafChildren: getViewportRowsSample(raawRows),
        childrenAfterFilter: getViewportRowsSample(rows),
        childrenAfterSort: getViewportRowsSample(rows)
      },
      columnModel: {
        columnDefs: rawColumns,
        displayedColumns: columns
      },
      nodeManager: {
        allNodesMap: getViewportRowsSample(raawRows)
      },
      csvCreator: {
        exportDataAsCsv: exportDataAsCsv
      }
    },
    getFocusedCell: getFocusedCell,
    setFocusedCell: setFocusedCell,
    clearFocusedCell: () => setSelectedPosition(initialPosition),
    tabToNextCell: tabToNextCell,
    tabToPreviousCell: tabToPreviousCell,
    exportDataAsCsv: exportDataAsCsv,
    exportDataAsExcel: exportDataAsExcel,
    exportDataAsPdf: exportDataAsPdf,
    setDefaultColDef: value => setDefaultColumnDef(_objectSpread(_objectSpread({}, defaultColumnDef), value)),
    isAnyFilterPresent: isAnyFilterPresent,
    expandAll: () => setExpandAll(true),
    collapseAll: () => setExpandAll(false),
    getFilterModel: () => filters,
    setFilterModel: value => setFilters(_objectSpread(_objectSpread({}, filters), value)),
    destroyFilter: key => {
      const sample = filters;
      // delete sample[key];
      setFilters(_objectSpread({}, sample));
    },
    setSuppressRowDrag,
    getVerticalPixelRange,
    getHorizontalPixelRange,
    isColumnFilterPresent,
    setSuppressRowClickSelection: value => _setSuppressRowClickSelection(value),
    getEditingCells,
    setRowNodeExpanded,
    setAlwaysShowHorizontalScroll,
    setAlwaysShowVerticalScroll,
    ensureIndexVisible,
    ensureNodeVisible,
    ensureColumnVisible,
    getRows: () => rawRows,
    getRenderedrows: () => rows
  };

  ///////////  start
  if (onGridReady) {
    onGridReady({
      api: apiObject,
      columnApi: columnApiObject,
      type: "gridReady"
    });
  }
  (0, _useUpdateEffect.default)(() => {
    setAfterFilter(getViewportRowsSample(rows));
  }, [rows, getViewportRowsSample]);
  (0, _useUpdateEffect.default)(() => {
    setRowNodes(getViewportRowsSample(raawRows));
  }, [expandedGroupIds, expandAll, raawRows, getViewportRowsSample]);

  /////
  var renderedRowNodes = [];
  function getViewportRows() {
    let node;
    const rowElements = [];
    let startRowIndex = 0;
    const {
      idx: selectedIdx,
      rowIdx: selectedRowIdx
    } = selectedPosition;
    const startRowIdx = selectedCellIsWithinViewportBounds && selectedRowIdx < rowOverscanStartIdx ? rowOverscanStartIdx - 1 : rowOverscanStartIdx;
    const endRowIdx = selectedCellIsWithinViewportBounds && selectedRowIdx > rowOverscanEndIdx ? rowOverscanEndIdx + 1 : rowOverscanEndIdx;
    endRowIdxForRender = endRowIdx;
    for (let viewportRowIdx = startRowIdx; viewportRowIdx <= endRowIdx; viewportRowIdx++) {
      var _row$id2, _rows$rowIdx3;
      const isRowOutsideViewport = viewportRowIdx === rowOverscanStartIdx - 1 || viewportRowIdx === rowOverscanEndIdx + 1;
      const rowIdx = isRowOutsideViewport ? selectedRowIdx : viewportRowIdx;
      let rowColumns = viewportColumns;
      const selectedColumn = columns4[selectedIdx];
      // selectedIdx can be -1 if grouping is enabled
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (selectedColumn !== undefined) {
        if (isRowOutsideViewport) {
          // if the row is outside the viewport then only render the selected cell
          rowColumns = [selectedColumn];
        } else {
          // if the row is within the viewport and cell is not, add the selected column to viewport columns
          rowColumns = regroupArray(merged);
        }
      }
      const row = rows[rowIdx];
      const gridRowStart = headerRowsCount + topSummaryRowsCount + rowIdx + 1;
      if (isGroupRow(row)) {
        ({
          startRowIndex
        } = row);
        const isGroupRowSelected = isSelectable && row.childRows.every(cr => selectedRows1 === null || selectedRows1 === void 0 ? void 0 : selectedRows1.has(rowKeyGetter(cr)));
        rowElements.push( /*#__PURE__*/_react.default.createElement(_GroupRow.default
        // aria-level is 1-based
        , {
          "aria-level": row.level + 1,
          "aria-setsize": row.setSize
          // aria-posinset is 1-based
          ,
          "aria-posinset": row.posInSet + 1
          // aria-rowindex is 1 based
          ,
          "aria-rowindex": headerRowsCount + topSummaryRowsCount + startRowIndex + 1,
          "aria-selected": isSelectable ? isGroupRowSelected : undefined,
          key: "".concat(row.id),
          id: row.id,
          groupKey: row.groupKey,
          viewportColumns: regroupArray(merged),
          childRows: row.childRows,
          rowIdx: rowIdx,
          row: row,
          rowArray: columns5,
          gridRowStart: gridRowStart,
          height: getRowHeight(rowIdx),
          level: row.level,
          isExpanded: row.isExpanded,
          selectedCellIdx: selectedRowIdx === rowIdx ? selectedIdx : undefined,
          isRowSelected: isGroupRowSelected,
          selectGroup: selectGroupLatest,
          toggleGroup: toggleGroupLatest
        }));
        continue;
      }
      if (row.children && rest.treeData) {
        ({
          startRowIndex
        } = row);
        const isGroupRowSelected = isSelectable && row.childRows.every(cr => selectedRows1 === null || selectedRows1 === void 0 ? void 0 : selectedRows1.has(rowKeyGetter(cr)));
        rowElements.push( /*#__PURE__*/_react.default.createElement(_TreeRow.default
        // aria-level is 1-based
        , {
          "aria-level": row.level + 1,
          "aria-setsize": row.setSize
          // aria-posinset is 1-based
          ,
          "aria-posinset": row.posInSet + 1
          // aria-rowindex is 1 based
          ,
          "aria-rowindex": headerRowsCount + topSummaryRowsCount + startRowIndex + 1,
          "aria-selected": isSelectable ? isGroupRowSelected : undefined,
          key: "".concat(row.id).concat(rowIdx),
          id: row.id,
          groupKey: row.groupKey,
          viewportColumns: regroupArray(merged)
          // childRows={row.childRows}
          ,
          rowIdx: rowIdx,
          row: row,
          rowArray: columns5,
          gridRowStart: gridRowStart,
          height: getRowHeight(rowIdx),
          level: row.level,
          isExpanded: expandedTreeIds.includes(rowKeyGetter(row)),
          selectedCellIdx: selectedRowIdx === rowIdx ? selectedIdx : undefined,
          sourceData: raawRows,
          isRowSelected: isGroupRowSelected,
          selectGroup: selectGroupLatest,
          toggleTree: toggleTreeLatest
        }));
        continue;
      }
      startRowIndex++;
      let key;
      let isRowSelected = false;
      if (typeof rowKeyGetter === "function") {
        var _selectedRows1$has;
        key = rowKeyGetter(row);
        isRowSelected = (_selectedRows1$has = selectedRows1 === null || selectedRows1 === void 0 ? void 0 : selectedRows1.has(key)) !== null && _selectedRows1$has !== void 0 ? _selectedRows1$has : false;
      } else {
        key = hasGroups ? startRowIndex : rowIdx;
      }
      function setDataValue(key, newValue) {
        let data = row;
        data[key] = newValue;
        let list = [...rawRows];
        list[rowIdx] = data;
        setRawRows(list);
      }
      function setData(newValue) {
        let list = [...rawRows];
        list[rowIdx] = newValue;
        setRawRows(list);
      }
      node = {
        rowIndex: rowIdx,
        rowTop: rowHeight * rowIdx,
        childIndex: rowIdx + 1,
        data: row,
        rowHeight: rowHeight,
        lastChild: raawRows.length === rowIdx + 1,
        firstChild: rowIdx === 0,
        id: (_row$id2 = row === null || row === void 0 ? void 0 : row.id) !== null && _row$id2 !== void 0 ? _row$id2 : String(rowIdx),
        selected: selectedRowIdx === rowIdx,
        setDataValue,
        setData,
        parent: {
          allLeafChildren: RowNodes,
          childrenAfterFilter: afterFilter,
          childrenAfterSort: afterFilter
        },
        updateData: setData,
        expanded: (_rows$rowIdx3 = rows[rowIdx]) === null || _rows$rowIdx3 === void 0 ? void 0 : _rows$rowIdx3.isExpanded,
        isSelected: () => selectedRowIdx === rowIdx,
        setSelected: () => {
          selectRow({
            row,
            checked: !selectedRows.includes(rowKeyGetter(row)),
            isShiftClick: false
          });
        },
        isExpandable: () => {
          var _rows$rowIdx4;
          return (_rows$rowIdx4 = rows[rowIdx]) === null || _rows$rowIdx4 === void 0 ? void 0 : _rows$rowIdx4.isExpanded;
        },
        setExpanded: value => {
          var expandIds = new Set(expandedGroupIds);
          let rowKey = rowKeyGetter(rows[rowIdx]);
          if (value) {
            expandIds.add(rowKey);
          } else {
            expandIds.delete(rowKey);
          }
          onExpandedGroupIdsChange(expandIds);
        }
      };
      renderedRowNodes.push(node);
      rowElements.push(rowRenderer(key, {
        // aria-rowindex is 1 based
        "aria-rowindex": headerRowsCount + topSummaryRowsCount + (hasGroups ? startRowIndex : rowIdx) + 1,
        "aria-selected": isSelectable ? isRowSelected : undefined,
        valueChangedCellStyle,
        previousData: changedList,
        totalColumns: columns.length,
        rowIdx,
        rows,
        row,
        headerheight: headerheight,
        //need to be added
        selectedCellRowStyle,
        api: apiObject,
        columnApi: columnApiObject,
        node,
        viewportColumns: regroupArray(merged),
        isRowSelected,
        onRowClick: onRowClick,
        onCellClick: onCellClickLatest,
        onCellDoubleClick: onCellDoubleClickLatest,
        onCellContextMenu: onCellContextMenuLatest,
        onRowDoubleClick: onRowDoubleClick,
        rowClass,
        gridRowStart,
        rowArray: columns4,
        height: getRowHeight(rowIdx),
        copiedCellIdx: copiedCell !== null && copiedCell.row === row ? columns.findIndex(c => c.key === copiedCell.columnKey) : undefined,
        selectedCellIdx: selectedRowIdx === rowIdx ? selectedIdx : undefined,
        draggedOverCellIdx: getDraggedOverCellIdx(rowIdx),
        setDraggedOverRowIdx: isDragging ? setDraggedOverRowIdx : undefined,
        lastFrozenColumnIndex,
        onRowChange: handleFormatterRowChangeLatest,
        selectCell: selectViewportCellLatest,
        selectedCellDragHandle: getDragHandle(rowIdx),
        selectedCellEditor: getCellEditor(rowIdx),
        handleReorderRow: handleReorderRow,
        selectedPosition,
        subColumn,
        summaryRowHeight: topSummaryRows !== undefined ? summaryRowHeight : 0,
        rowFreezLastIndex
      }));
    }
    return rowElements;
  }

  // Reset the positions if the current values are no longer valid. This can happen if a column or row is removed
  if (selectedPosition.idx > maxColIdx || selectedPosition.rowIdx > maxRowIdx) {
    setSelectedPosition(initialPosition);
    setDraggedOverRowIdx(undefined);
  }
  let templateRows = "".concat(headerRowHeight, "px");
  if (topSummaryRowsCount > 0) {
    templateRows += " repeat(".concat(topSummaryRowsCount, ", ").concat(summaryRowHeight, "px)");
  }
  if (rows.length > 0) {
    templateRows += gridTemplateRows;
  }
  if (bottomSummaryRowsCount > 0) {
    templateRows += " repeat(".concat(bottomSummaryRowsCount, ", ").concat(summaryRowHeight, "px)");
  }
  const isGroupRowFocused = selectedPosition.idx === -1 && selectedPosition.rowIdx !== -2;
  (0, _useUpdateEffect.default)(() => {
    if (paginationAutoPageSize) {
      if (raawRows.length <= 500) {
        setSize(20);
      } else if (1000 >= raawRows.length && raawRows.length > 500) {
        setSize(30);
      } else {
        setSize(40);
      }
    }
  }, [raawRows, paginationAutoPageSize]);
  (0, _useUpdateEffect.default)(() => {
    if (paginationAutoPageSize) {
      if (raawRows.length <= 500) {
        setSize(20);
      } else if (1000 >= raawRows.length && raawRows.length > 500) {
        setSize(30);
      } else {
        setSize(40);
      }
    }
  }, [raawRows, paginationAutoPageSize]);
  (0, _useUpdateEffect.default)(() => {
    var _props$restriction, _props$restriction2;
    const target = document.getElementById("DataGrid");
    if ((_props$restriction = props.restriction) !== null && _props$restriction !== void 0 && _props$restriction.copy) {
      target.addEventListener("copy", event => {
        event.preventDefault();
      });
    }
    if ((_props$restriction2 = props.restriction) !== null && _props$restriction2 !== void 0 && _props$restriction2.paste) {
      target.addEventListener("paste", event => {
        event.preventDefault();
      });
    }
    return target !== null && target !== void 0 && target.removeEventListener("copy", () => {}), target === null || target === void 0 ? void 0 : target.removeEventListener("paste", () => {});
  }, [(_props$restriction3 = props.restriction) === null || _props$restriction3 === void 0 ? void 0 : _props$restriction3.paste, (_props$restriction4 = props.restriction) === null || _props$restriction4 === void 0 ? void 0 : _props$restriction4.copy]);
  const toolbarClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-end;\n    gap: 8px;\n    margin-block-end: 8px;\n  "])));
  const jumpnext = document.getElementsByClassName("rc-pagination-jump-next");
  if (jumpnext) {
    var _jumpnext$;
    (_jumpnext$ = jumpnext[0]) === null || _jumpnext$ === void 0 || _jumpnext$.setAttribute("title", "");
  }
  const jumpprev = document.getElementsByClassName("rc-pagination-jump-prev");
  if (jumpprev) {
    var _jumpprev$;
    (_jumpprev$ = jumpprev[0]) === null || _jumpprev$ === void 0 || _jumpprev$.setAttribute("title", "");
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.export && /*#__PURE__*/_react.default.createElement("div", {
    className: toolbarClassname
  }, props.export.csvFileName && /*#__PURE__*/_react.default.createElement(_ExportData.ExportButton, {
    onExport: () => exportDataAsCsv(props.export.csvFileName)
  }, "Export to CSV"), props.export.excelFileName && /*#__PURE__*/_react.default.createElement(_ExportData.ExportButton, {
    onExport: () => exportDataAsExcel(props.export.excelFileName)
  }, "Export to XSLX"), props.export.pdfFileName && /*#__PURE__*/_react.default.createElement(_ExportData.ExportButton, {
    onExport: () => exportDataAsPdf(props.export.pdfFileName)
  }, "Export to PDF")), /*#__PURE__*/_react.default.createElement("div", {
    id: "DataGrid"
    // data-testid="datagrid"
    ,
    role: hasGroups ? "treegrid" : "grid",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-multiselectable": isSelectable ? true : undefined,
    "aria-colcount": columns.length,
    "aria-rowcount": headerRowsCount + rowsCount + summaryRowsCount,
    className: (0, _clsx.clsx)(_style.rootClassname, {
      [_style.viewportDraggingClassname]: isDragging
    }, className, enableFilter && _style.filterContainerClassname),
    style: _objectSpread(_objectSpread({}, style), {}, {
      // set scrollPadding to correctly position non-sticky cells after scrolling
      scrollPaddingInlineStart: selectedPosition.idx > lastFrozenColumnIndex ? "".concat(totalFrozenColumnWidth, "px") : undefined,
      scrollPaddingBlock: selectedPosition.rowIdx >= 0 && selectedPosition.rowIdx < rows.length ? "".concat(headerRowHeight + topSummaryRowsCount * summaryRowHeight, "px ").concat(bottomSummaryRowsCount * summaryRowHeight, "px") : undefined,
      gridTemplateRows: templateRows,
      "--rdg-header-row-height": "".concat(rowHeight, "px"),
      "--rdg-summary-row-height": "".concat(summaryRowHeight, "px"),
      "--rdg-sign": isRtl ? -1 : 1
    }, getLayoutCssVars()),
    dir: direction,
    ref: gridRef,
    onScroll: handleScroll,
    onKeyDown: handleKeyDown,
    "data-testid": testId
  }, hasGroups && /*#__PURE__*/_react.default.createElement("div", {
    ref: rowRef,
    tabIndex: isGroupRowFocused ? 0 : -1,
    className: (0, _clsx.clsx)(_style.focusSinkClassname, {
      [_style.rowSelected]: isGroupRowFocused,
      [_style.rowSelectedWithFrozenCell]: isGroupRowFocused && lastFrozenColumnIndex !== -1
    }),
    style: {
      gridRowStart: selectedPosition.rowIdx + 2
    },
    onKeyDown: handleKeyDown
  }), /*#__PURE__*/_react.default.createElement(_filterContext.default.Provider, {
    value: filters
  }, /*#__PURE__*/_react.default.createElement(_DataGridDefaultComponentsProvider.DataGridDefaultComponentsProvider, {
    value: defaultGridComponents
  }, /*#__PURE__*/_react.default.createElement(_HeaderRow.default, {
    rows: rawRows,
    columns: regroupArray(merged),
    headerData: columns,
    sortCol: columns4,
    selectedPosition: selectedPosition,
    handleReorderColumn: handleReorderColumn,
    selectedCellHeaderStyle: selectedCellHeaderStyle,
    onColumnResize: handleColumnResizeLatest,
    allRowsSelected: allRowsSelected,
    arrayDepth: arrayDepth,
    onAllRowsSelectionChange: selectAllRowsLatest,
    sortColumns: sortColumns,
    onSortColumnsChange: onSortColumnsChangeLatest,
    lastFrozenColumnIndex: lastFrozenColumnIndex,
    selectedCellIdx: selectedPosition.rowIdx === minRowIdx ? selectedPosition.idx : undefined,
    selectCell: selectHeaderCellLatest,
    shouldFocusGrid: !selectedCellIsWithinSelectionBounds,
    direction: direction,
    headerheight: headerheight,
    headerRowHeight: singleHeaderRowHeight,
    rowArray: rowArray,
    cellHeight: headerRowHeight,
    setFilters: setFilters,
    setFilterType: setFilterType,
    ChildColumnSetup: ChildColumnSetup,
    gridWidth: gridWidth
  }), rows.length === 0 && noRowsFallback ? noRowsFallback : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, topSummaryRows === null || topSummaryRows === void 0 ? void 0 : topSummaryRows.map((row, rowIdx) => {
    const gridRowStart = headerRowsCount + rowIdx + 1;
    const summaryRowIdx = rowIdx + minRowIdx + 1;
    const isSummaryRowSelected = selectedPosition.rowIdx === summaryRowIdx;
    const top = headerRowHeight + summaryRowHeight * rowIdx;
    return /*#__PURE__*/_react.default.createElement(_SummaryRow.default, {
      "aria-rowindex": gridRowStart,
      key: "".concat(rowIdx).concat(summaryRowIdx),
      rowIdx: rowIdx,
      gridRowStart: gridRowStart,
      row: row,
      top: top,
      bottom: undefined,
      lastTopRowIdx: topSummaryRowsCount - 1,
      viewportColumns: getRowViewportColumns(summaryRowIdx),
      lastFrozenColumnIndex: lastFrozenColumnIndex,
      selectedCellIdx: isSummaryRowSelected ? selectedPosition.idx : undefined,
      selectCell: selectTopSummaryCellLatest
    });
  }), /*#__PURE__*/_react.default.createElement(_hooks.RowSelectionChangeProvider, {
    value: selectRowLatest
  }, getViewportRows(rowArray)), bottomSummaryRows === null || bottomSummaryRows === void 0 ? void 0 : bottomSummaryRows.map((row, rowIdx) => {
    const gridRowStart = headerRowsCount + topSummaryRowsCount + rows.length + rowIdx + 1;
    const summaryRowIdx = rows.length + rowIdx;
    const isSummaryRowSelected = selectedPosition.rowIdx === summaryRowIdx;
    const top = clientHeight > totalRowHeight ? gridHeight - summaryRowHeight * (bottomSummaryRows.length - rowIdx) : undefined;
    const bottom = top === undefined ? summaryRowHeight * (bottomSummaryRows.length - 1 - rowIdx) : undefined;
    return /*#__PURE__*/_react.default.createElement(_SummaryRow.default, {
      "aria-rowindex": headerRowsCount + topSummaryRowsCount + rowsCount + rowIdx + 1,
      rowIdx: rowIdx,
      key: "".concat(rowIdx).concat(summaryRowIdx),
      gridRowStart: gridRowStart,
      row: row,
      top: top,
      bottom: bottom,
      lastTopRowIdx: undefined,
      viewportColumns: getRowViewportColumns(summaryRowIdx),
      lastFrozenColumnIndex: lastFrozenColumnIndex,
      selectedCellIdx: isSummaryRowSelected ? selectedPosition.idx : undefined,
      selectCell: selectBottomSummaryCellLatest,
      selectedRows: selectedRows
    });
  })), (0, _utils.renderMeasuringCells)(viewportColumns))), /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement("div", {
    dir: direction
  }, /*#__PURE__*/_react.default.createElement(_reactContextmenu.ContextMenu, {
    id: "grid-context-menu",
    rtl: direction === "rtl"
  }, contextMenuItems.map(item => {
    var _item$subMenu, _item$cssClasses;
    return ((_item$subMenu = item.subMenu) === null || _item$subMenu === void 0 ? void 0 : _item$subMenu.length) > 0 ? /*#__PURE__*/_react.default.createElement(_reactContextmenu.SubMenu, {
      title: item.name,
      key: item.name
    }, item.subMenu.map(subItem => {
      var _subItem$cssClasses;
      return /*#__PURE__*/_react.default.createElement(_reactContextmenu.MenuItem, {
        onClick: e => subItem.action({
          e,
          contextData,
          rowIndex: selectedPosition.rowIdx,
          columnIndex: selectedPosition.idx
        }),
        key: subItem.name,
        disabled: subItem.disabled,
        divider: subItem.divider,
        className: "context-menu-Item ".concat((_subItem$cssClasses = subItem.cssClasses) === null || _subItem$cssClasses === void 0 ? void 0 : _subItem$cssClasses.join(" "))
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "context-menu-icon",
        title: subItem.tooltip
      }, subItem.icon && /*#__PURE__*/_react.default.createElement(subItem.icon, {
        style: {
          marginRight: "5px",
          height: "10px"
        }
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: "context-menu-name",
        title: subItem.tooltip
      }, subItem.name));
    })) : /*#__PURE__*/_react.default.createElement(_reactContextmenu.MenuItem, {
      onClick: e => item.action({
        e,
        contextData,
        rowIndex: selectedPosition.rowIdx,
        columnIndex: selectedPosition.idx
      }),
      disabled: item.disabled,
      key: item.name,
      divider: item.divider,
      className: "context-menu-Item ".concat((_item$cssClasses = item.cssClasses) === null || _item$cssClasses === void 0 ? void 0 : _item$cssClasses.join(" "))
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "context-menu-icon",
      title: item.tooltip
    }, item.icon && /*#__PURE__*/_react.default.createElement(item.icon, {
      style: {
        marginRight: "5px"
      }
    })), /*#__PURE__*/_react.default.createElement("span", {
      className: "context-menu-name",
      title: item.tooltip
    }, item.name));
  }))), document.body)), (pagination || showSelectedRows) && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, showSelectedRows ? /*#__PURE__*/_react.default.createElement("div", {
    className: "footer-bottom",
    style: {
      width: "25%",
      height: 25,
      backgroundColor: "#f8f8f8",
      color: "black",
      fontSize: 12,
      paddingRight: 15,
      fontWeight: "bold",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"
    }
  }, "".concat((selectedRows1 === null || selectedRows1 === void 0 ? void 0 : selectedRows1.size) === undefined ? 0 : selectedRows1 === null || selectedRows1 === void 0 ? void 0 : selectedRows1.size, " out of ").concat(raawRows.length, " selected")) : undefined, pagination && !suppressPagination && /*#__PURE__*/_react.default.createElement(_rcPagination.default, {
    className: "pagination-data",
    showTotal: (total, range) => "Showing ".concat(range[0], "-").concat(range[1], " of ").concat(total),
    onChange: PaginationChange,
    total: rawRows.length,
    current: current,
    pageSize: size,
    showSizeChanger: false,
    itemRender: PrevNextArrow,
    onShowSizeChange: PerPageChange
  })));
}
function isSamePosition(p1, p2) {
  return p1.idx === p2.idx && p1.rowIdx === p2.rowIdx;
}
var _default = exports.default = /*#__PURE__*/(0, _react.forwardRef)(DataGrid);