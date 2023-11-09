"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _react = _interopRequireWildcard(require("react"));
var _core = require("@linaria/core");
var _utils = require("./utils");
var _useRovingCellRef = require("./hooks/useRovingCellRef");
var _reactDnd = require("react-dnd");
var _moment = _interopRequireDefault(require("moment"));
var _style = require("./style");
const _excluded = ["column", "rowArray", "colData", "viewportColumns", "colSpan", "isCellSelected", "selectedCellIdx", "selectedCellEditor", "isCopied", "api", "isDraggedOver", "isRowSelected", "row", "rowIndex", "allrow", "dragHandle", "onRowClick", "onRowDoubleClick", "onRowChange", "selectCell", "node", "handleReorderRow", "subColumn", "totalColumns", "onCellClick", "onCellDoubleClick", "onCellContextMenu", "columnApi", "valueChangedCellStyle", "previousData", "rowFreezLastIndex", "headerheight", "summaryRowHeight"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const cellCopied = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    background-color: #ccccff;\n  }\n"])));
const cellCopiedClassname = "rdg-cell-copied ".concat(cellCopied);
const cellDraggedOver = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.Cell {\n    background-color: #ccccff;\n\n    &.", " {\n      background-color: #9999ff;\n    }\n  }\n"])), cellCopied);
const cellDraggedOverClassname = "rdg-cell-dragged-over ".concat(cellDraggedOver);
const rowCellFreezeClassname = (0, _core.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  @layer rdg.rowCell {\n    position: sticky;\n    z-index: 2;\n    background: dark blue;\n    inset-block-start: var(--rdg-summary-row-top);\n    inset-block-end: var(--rdg-summary-row-bottom);\n  }\n"])));
const freezeCol = (0, _core.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  @layer rdg.rowFridge {\n    z-index: 3;\n  }\n"])));
const freezedLastRowClassName = (0, _core.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  @layer rdg.freezedLastRowShadow {\n    box-shadow: 0 calc(2px * var(--rdg-sign)) 5px -2px rgba(136, 136, 136, 0.5);\n  }\n"])));
function Cell(_ref) {
  var _cellRendererParams$v, _column$rowSpan, _column$rowSpan2;
  let {
      column,
      rowArray,
      colData,
      viewportColumns,
      colSpan,
      isCellSelected,
      selectedCellIdx,
      selectedCellEditor,
      isCopied,
      api,
      isDraggedOver,
      isRowSelected,
      row,
      rowIndex,
      allrow,
      dragHandle,
      onRowClick,
      onRowDoubleClick,
      onRowChange,
      selectCell,
      node,
      handleReorderRow,
      subColumn,
      totalColumns,
      onCellClick,
      onCellDoubleClick,
      onCellContextMenu,
      columnApi,
      valueChangedCellStyle,
      previousData,
      rowFreezLastIndex,
      headerheight,
      summaryRowHeight
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const gridCell = (0, _react.useRef)(null);
  const cellRendererParams = typeof (column === null || column === void 0 ? void 0 : column.cellRendererParams) === "function" ? column === null || column === void 0 ? void 0 : column.cellRendererParams() : column === null || column === void 0 ? void 0 : column.cellRendererParams;
  const [value, _setValue] = (0, _react.useState)((_cellRendererParams$v = cellRendererParams === null || cellRendererParams === void 0 ? void 0 : cellRendererParams.value) !== null && _cellRendererParams$v !== void 0 ? _cellRendererParams$v : row[column.key]);
  const {
    tabIndex,
    onFocus
  } = (0, _useRovingCellRef.useRovingCellRef)(isCellSelected);
  const {
    cellClass
  } = column;
  const topRow = rowIndex === 0 && isRowSelected ? true : false;
  const bottomRow = rowIndex === allrow.length - 1 && isRowSelected ? true : false;
  const middleRow = !(topRow || bottomRow) && isRowSelected ? true : false;
  const className = (0, _utils.getCellClassname)(column, "rdg-cell-column-".concat(column.idx % 2 === 0 ? "even" : "odd"), {
    [cellCopiedClassname]: isCopied,
    [cellDraggedOverClassname]: isDraggedOver,
    [_style.rowIsSelectedClassName]: middleRow,
    [_style.topRowIsSelectedClassName]: topRow,
    [_style.bottomRowIsSelectedClassName]: bottomRow,
    [rowCellFreezeClassname]: rowIndex <= rowFreezLastIndex,
    [freezeCol]: column.frozen === true && rowIndex <= rowFreezLastIndex,
    [freezedLastRowClassName]: rowIndex === rowFreezLastIndex
  }, typeof cellClass === "function" ? cellClass(row) : cellClass);
  function handleClick(e) {
    var _column$resizable, _column$sortable, _row$column$field;
    // selectCellWrapper(column.editorOptions?.editOnClick);
    onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick({
      api: api,
      data: row,
      columnApi: columnApi,
      node: node,
      rowIndex: rowIndex,
      type: "rowClicked",
      event: e
    });
    onCellClick === null || onCellClick === void 0 ? void 0 : onCellClick({
      api: api,
      colDef: {
        field: column.field,
        resizable: (_column$resizable = column.resizable) !== null && _column$resizable !== void 0 ? _column$resizable : undefined,
        sortable: (_column$sortable = column.sortable) !== null && _column$sortable !== void 0 ? _column$sortable : undefined,
        width: column.width
      },
      data: row,
      node: node,
      columnApi: columnApi,
      rowIndex: rowIndex,
      value: (_row$column$field = row[column.field]) !== null && _row$column$field !== void 0 ? _row$column$field : undefined,
      type: "cellClicked",
      event: e
    });
  }
  function handleContextMenu(e) {
    var _column$resizable2, _column$sortable2, _row$column$field2;
    selectCellWrapper();
    onCellContextMenu === null || onCellContextMenu === void 0 ? void 0 : onCellContextMenu({
      api: api,
      colDef: {
        field: column.field,
        resizable: (_column$resizable2 = column.resizable) !== null && _column$resizable2 !== void 0 ? _column$resizable2 : undefined,
        sortable: (_column$sortable2 = column.sortable) !== null && _column$sortable2 !== void 0 ? _column$sortable2 : undefined,
        width: column.width
      },
      data: row,
      node: node,
      columnApi: columnApi,
      rowIndex: rowIndex,
      value: (_row$column$field2 = row[column.field]) !== null && _row$column$field2 !== void 0 ? _row$column$field2 : undefined,
      type: "cellContextMenu",
      event: e
    });
  }
  function handleDoubleClick(e) {
    var _column$resizable3, _column$sortable3, _row$column$field3;
    // selectCellWrapper(true);
    onRowDoubleClick === null || onRowDoubleClick === void 0 ? void 0 : onRowDoubleClick({
      api: api,
      data: row,
      columnApi: columnApi,
      node: node,
      rowIndex: rowIndex,
      type: "rowDoubleClicked",
      event: e
    });
    onCellDoubleClick === null || onCellDoubleClick === void 0 ? void 0 : onCellDoubleClick({
      api: api,
      colDef: {
        field: column.field,
        resizable: (_column$resizable3 = column.resizable) !== null && _column$resizable3 !== void 0 ? _column$resizable3 : undefined,
        sortable: (_column$sortable3 = column.sortable) !== null && _column$sortable3 !== void 0 ? _column$sortable3 : undefined,
        width: column.width
      },
      data: row,
      node: node,
      columnApi: columnApi,
      rowIndex: rowIndex,
      value: (_row$column$field3 = row[column.field]) !== null && _row$column$field3 !== void 0 ? _row$column$field3 : undefined,
      type: "cellDoubleClicked",
      event: e
    });
  }
  function handleRowChange(newRow) {
    onRowChange(column, newRow);
  }

  // -----------

  let style = _objectSpread(_objectSpread({}, (0, _utils.getCellStyle)(column, colSpan, row)), {}, {
    "--rdg-summary-row-top": "".concat(headerheight + summaryRowHeight + rowIndex * 24, "px")
  });
  style = column.haveChildren === true ? _objectSpread(_objectSpread({}, style), {
    borderInlineEnd: "none"
  }) : _objectSpread({}, style);
  style = column.idx === 0 && isRowSelected ? _objectSpread(_objectSpread({}, style), {
    borderInlineStart: "1px solid #9bbb59"
  }) : _objectSpread({}, style);
  style = column.idx === totalColumns - 1 && isRowSelected ? _objectSpread(_objectSpread({}, style), {
    borderInlineEnd: "1px solid #9bbb59"
  }) : _objectSpread({}, style);
  const rowSpan = (_column$rowSpan = (_column$rowSpan2 = column.rowSpan) === null || _column$rowSpan2 === void 0 ? void 0 : _column$rowSpan2.call(column, {
    type: "ROW",
    row
  })) !== null && _column$rowSpan !== void 0 ? _column$rowSpan : undefined;
  if (column.validation) {
    const validationStyle = column.validation.style ? column.validation.style : {
      backgroundColor: "red"
    };
    if (column.validation.method(row[column.key])) {
      style = _objectSpread(_objectSpread({}, style), validationStyle);
    }
  }
  if (column.alignment) {
    function alignmentUtils() {
      var _column$alignment$typ, _column$alignment$typ2, _column$alignment$typ3, _column$alignment$typ4, _column$alignment$typ5, _column$alignment$typ6, _column$alignment$typ7;
      let styles = style;
      let symbol = ["£", "$", "₹", "€", "¥", "₣", "¢"];
      if (((_column$alignment$typ = column.alignment.type) === null || _column$alignment$typ === void 0 ? void 0 : _column$alignment$typ.toLowerCase()) === "date" || (0, _moment.default)(row[column.key], "YYYY-MM-DD", true).isValid() || (0, _moment.default)(row[column.key], "YYYY/MM/DD", true).isValid() || (0, _moment.default)(row[column.key], "YYYY-DD-MM", true).isValid() || (0, _moment.default)(row[column.key], "YYYY/DD/MM", true).isValid() || (0, _moment.default)(row[column.key], "MM-DD-YYYY", true).isValid() || (0, _moment.default)(row[column.key], "MM/DD/YYYY", true).isValid() || (0, _moment.default)(row[column.key], "MM-YYYY-DD", true).isValid() || (0, _moment.default)(row[column.key], "MM/YYYY/DD", true).isValid() || (0, _moment.default)(row[column.key], "DD-MM-YYYY", true).isValid() || (0, _moment.default)(row[column.key], "DD/MM/YYYY", true).isValid() || (0, _moment.default)(row[column.key], "DD-YYYY-MM", true).isValid() || (0, _moment.default)(row[column.key], "DD/YYYY/MM", true).isValid() || (0, _moment.default)(row[column.key], "DD-MMM-YYYY", true).isValid() || (0, _moment.default)(row[column.key], "DD/MMM/YYYY", true).isValid() || (0, _moment.default)(row[column.key], "DD-YYYY-MMM", true).isValid() || (0, _moment.default)(row[column.key], "DD/YYYY/MMM", true).isValid() || (0, _moment.default)(row[column.key], "MMM-DD-YYYY", true).isValid() || (0, _moment.default)(row[column.key], "MMM/DD/YYYY", true).isValid() || (0, _moment.default)(row[column.key], "MMM-YYYY-DD", true).isValid() || (0, _moment.default)(row[column.key], "MMM/YYYY/DD", true).isValid() || (0, _moment.default)(row[column.key], "YYYY-MMM-DD", true).isValid() || (0, _moment.default)(row[column.key], "YYYY/MMM/DD", true).isValid() || (0, _moment.default)(row[column.key], "YYYY-DD-MMM", true).isValid() || (0, _moment.default)(row[column.key], "YYYY/DD/MMM", true).isValid() || JSON.stringify(row[column.key]).split("/").length === 3 || JSON.stringify(row[column.key]).split("-").length === 3) {
        const alignmentStyle = column.alignment.align ? {
          textAlign: column.alignment.align
        } : {
          textAlign: "end",
          paddingRight: "6px",
          paddingLeft: "6px"
        };
        styles = _objectSpread(_objectSpread({}, styles), alignmentStyle);
        return styles;
      } else if (((_column$alignment$typ2 = column.alignment.type) === null || _column$alignment$typ2 === void 0 ? void 0 : _column$alignment$typ2.toLowerCase()) === "time" || (0, _moment.default)(row[column.key], "hh:mm", true).isValid() || (0, _moment.default)(row[column.key], "hh:mm:ss", true).isValid() || (0, _moment.default)(row[column.key], "hh:mm:ss a", true).isValid() || (0, _moment.default)(row[column.key], "hh:mm a", true).isValid() || JSON.stringify(row[column.key]).split(":").length > 1) {
        const alignment = column.alignment.align ? {
          textAlign: column.alignment.align
        } : {
          textAlign: "end",
          paddingRight: "6px",
          paddingLeft: "6px"
        };
        styles = _objectSpread(_objectSpread({}, styles), alignment);
        return styles;
      } else if (((_column$alignment$typ3 = column.alignment.type) === null || _column$alignment$typ3 === void 0 ? void 0 : _column$alignment$typ3.toLowerCase()) === "datetime" || JSON.stringify(row[column.key]).split(":").length > 1 && (JSON.stringify(row[column.key]).split("/").length === 3 || JSON.stringify(row[column.key]).split("-").length === 3)) {
        const alignment = column.alignment.align ? {
          textAlign: column.alignment.align,
          paddingRight: "6px",
          paddingLeft: "6px"
        } : {
          textAlign: "end",
          paddingRight: "6px",
          paddingLeft: "6px"
        };
        styles = _objectSpread(_objectSpread({}, styles), alignment);
        return styles;
      } else if (((_column$alignment$typ4 = column.alignment.type) === null || _column$alignment$typ4 === void 0 ? void 0 : _column$alignment$typ4.toLowerCase()) === "number" || typeof row[column.key] === "number" && column.alignment.type !== "currency") {
        const alignment = column.alignment.align ? {
          textAlign: column.alignment.align
        } : {
          textAlign: "end"
        };
        styles = _objectSpread(_objectSpread({}, styles), alignment);
        return styles;
      } else if (((_column$alignment$typ5 = column.alignment.type) === null || _column$alignment$typ5 === void 0 ? void 0 : _column$alignment$typ5.toLowerCase()) === "currency" || symbol.includes(JSON.stringify(row[column.key])[1]) || symbol.includes(JSON.stringify(row[column.key])[row[column.key].length])) {
        const alignment = column.alignment.align ? {
          textAlign: column.alignment.align
        } : {
          textAlign: "end"
        };
        styles = _objectSpread(_objectSpread({}, styles), alignment);
        return styles;
      } else if (((_column$alignment$typ6 = column.alignment.type) === null || _column$alignment$typ6 === void 0 ? void 0 : _column$alignment$typ6.toLowerCase()) === "string" || ((_column$alignment$typ7 = column.alignment.type) === null || _column$alignment$typ7 === void 0 ? void 0 : _column$alignment$typ7.toLowerCase()) === "text" || typeof row[column.ley] === "string") {
        const alignment = column.alignment.align ? {
          textAlign: column.alignment.align
        } : {
          textAlign: "start"
        };
        styles = _objectSpread(_objectSpread({}, styles), alignment);
        return styles;
      } else {
        const alignment = column.alignment.align ? {
          textAlign: column.alignment.align
        } : {
          textAlign: "center"
        };
        styles = _objectSpread(_objectSpread({}, styles), alignment);
        return styles;
      }
    }
    style = column.alignment.align ? _objectSpread(_objectSpread({}, style), {}, {
      textAlign: column.alignment.align
    }) : alignmentUtils({
      column,
      row,
      style
    });
  }
  /// -----------------------
  if (valueChangedCellStyle) {
    var _previousData$rowInde;
    if ((_previousData$rowInde = previousData[rowIndex]) !== null && _previousData$rowInde !== void 0 && _previousData$rowInde.includes(column.key)) {
      var _valueChangedCellStyl, _valueChangedCellStyl2;
      style = _objectSpread(_objectSpread({}, style), {}, {
        backgroundColor: (_valueChangedCellStyl = valueChangedCellStyle.backgroundColor) !== null && _valueChangedCellStyl !== void 0 ? _valueChangedCellStyl : style.backgroundColor,
        color: (_valueChangedCellStyl2 = valueChangedCellStyle.color) !== null && _valueChangedCellStyl2 !== void 0 ? _valueChangedCellStyl2 : style.color
      });
    }
  }
  const [{
    isDragging
  }, drag] = (0, _reactDnd.useDrag)({
    type: "ROW_DRAG",
    item: {
      index: rowIndex
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  function onRowReorder(fromIndex, toIndex) {
    const newRows = [...allrow];
    newRows.splice(toIndex, 0, newRows.splice(fromIndex, 1)[0]);
    handleReorderRow(newRows);
  }
  const [{
    isOver
  }, drop] = (0, _reactDnd.useDrop)({
    accept: "ROW_DRAG",
    drop(_ref2) {
      let {
        index
      } = _ref2;
      onRowReorder(index, rowIndex);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    // role="gridcell"
    "aria-colindex": column.idx + 1,
    "data-testid": "rowCell",
    "aria-colspan": colSpan,
    "aria-rowspan": rowSpan,
    "aria-readonly": !(0, _utils.isCellEditable)(column, row) || undefined,
    ref: gridCell,
    tabIndex: tabIndex,
    className: className,
    style: style
    // onClick={handleClick}
    // onDoubleClick={handleDoubleClick}
    ,
    onFocus: onFocus
  }, props), !column.rowGroup && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, column.rowDrag && /*#__PURE__*/_react.default.createElement("div", {
    ref: ele => {
      drag(ele);
      drop(ele);
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginRight: "10px",
      cursor: "grab"
    }
  }, "\u25CA"), column.cellRenderer(_objectSpread({
    column,
    colDef: column,
    selectedCellIdx,
    selectedCellEditor,
    row,
    rowArray,
    colData,
    data: row,
    allrow,
    className,
    api,
    node,
    viewportColumns,
    rowIndex,
    isCellSelected,
    onRowChange: handleRowChange,
    onRowClick: onRowClick,
    columnApi,
    onCellClick,
    onCellDoubleClick,
    selectCell,
    onRowDoubleClick,
    subColumn,
    value: value,
    valueFormatted: cellRendererParams === null || cellRendererParams === void 0 ? void 0 : cellRendererParams.valueFormatted,
    fullWidth: cellRendererParams === null || cellRendererParams === void 0 ? void 0 : cellRendererParams.fullWidth,
    eGridCell: gridCell.current,
    refreshCell: () => {
      const content = document.getElementById("".concat(rowIndex).concat(row[column.key])).innerHTML;
      document.getElementById("".concat(rowIndex).concat(row[column.key])).innerHTML = content;
    },
    getValue: () => value,
    setValue: newValue => {
      _setValue(newValue);
    }
  }, cellRendererParams))), !column.rowDrag && column.cellRenderer(_objectSpread({
    column,
    colDef: column,
    row,
    colData,
    viewportColumns,
    data: row,
    rowArray,
    allrow,
    selectedCellIdx,
    selectedCellEditor,
    api,
    node,
    rowIndex,
    isCellSelected,
    selectCell,
    onRowChange: handleRowChange,
    onRowClick: onRowClick,
    columnApi,
    onCellClick,
    onCellDoubleClick,
    onRowDoubleClick,
    subColumn,
    value: value,
    valueFormatted: cellRendererParams === null || cellRendererParams === void 0 ? void 0 : cellRendererParams.valueFormatted,
    fullWidth: cellRendererParams === null || cellRendererParams === void 0 ? void 0 : cellRendererParams.fullWidth,
    eGridCell: gridCell.current,
    refreshCell: () => {
      const content = document.getElementById("".concat(rowIndex).concat(row[column.key])).innerHTML;
      document.getElementById("".concat(rowIndex).concat(row[column.key])).innerHTML = content;
    },
    getValue: () => value,
    setValue: newValue => {
      _setValue(newValue);
    }
  }, cellRendererParams)), dragHandle));
}
var _default = /*#__PURE__*/(0, _react.memo)(Cell);
exports.default = _default;