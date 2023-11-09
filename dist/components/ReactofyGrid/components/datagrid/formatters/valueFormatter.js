"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueFormatter = valueFormatter;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.array.includes.js");
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function valueFormatter(props) {
  function selectCellWrapper(openEditor) {
    let sampleColumn = props.column;
    props.selectCell(props.row, sampleColumn, openEditor);
  }
  function handleClick(e) {
    var _props$column$editorO, _props$onRowClick, _props$onCellClick, _props$column$resizab, _props$column$sortabl, _props$row$props$colu;
    selectCellWrapper((_props$column$editorO = props.column.editorOptions) === null || _props$column$editorO === void 0 ? void 0 : _props$column$editorO.editOnClick);
    (_props$onRowClick = props.onRowClick) === null || _props$onRowClick === void 0 ? void 0 : _props$onRowClick.call(props, {
      api: props.api,
      data: props.row,
      columnApi: props.columnApi,
      node: props.node,
      rowIndex: props.rowIndex,
      type: "rowClicked",
      event: e
    });
    (_props$onCellClick = props.onCellClick) === null || _props$onCellClick === void 0 ? void 0 : _props$onCellClick.call(props, {
      api: props.api,
      colDef: {
        field: props.column.field,
        resizable: (_props$column$resizab = props.column.resizable) !== null && _props$column$resizab !== void 0 ? _props$column$resizab : undefined,
        sortable: (_props$column$sortabl = props.column.sortable) !== null && _props$column$sortabl !== void 0 ? _props$column$sortabl : undefined,
        width: props.column.width
      },
      data: props.row,
      node: props.node,
      columnApi: props.columnApi,
      rowIndex: props.rowIndex,
      value: (_props$row$props$colu = props.row[props.column.field]) !== null && _props$row$props$colu !== void 0 ? _props$row$props$colu : undefined,
      type: "cellClicked",
      event: e
    });
  }
  function handleDoubleClick(e) {
    var _props$onRowDoubleCli, _props$onCellDoubleCl, _props$column$resizab2, _props$column$sortabl2, _props$row$props$colu2;
    selectCellWrapper(true);
    (_props$onRowDoubleCli = props.onRowDoubleClick) === null || _props$onRowDoubleCli === void 0 ? void 0 : _props$onRowDoubleCli.call(props, {
      api: props.api,
      data: props.row,
      columnApi: props.columnApi,
      node: props.node,
      rowIndex: props.rowIndex,
      type: "rowDoubleClicked",
      event: e
    });
    (_props$onCellDoubleCl = props.onCellDoubleClick) === null || _props$onCellDoubleCl === void 0 ? void 0 : _props$onCellDoubleCl.call(props, {
      api: props.api,
      colDef: {
        field: props.column.field,
        resizable: (_props$column$resizab2 = props.column.resizable) !== null && _props$column$resizab2 !== void 0 ? _props$column$resizab2 : undefined,
        sortable: (_props$column$sortabl2 = props.column.sortable) !== null && _props$column$sortabl2 !== void 0 ? _props$column$sortabl2 : undefined,
        width: props.column.width
      },
      data: props.row,
      node: props.node,
      columnApi: props.columnApi,
      rowIndex: props.rowIndex,
      value: (_props$row$props$colu2 = props.row[props.column.field]) !== null && _props$row$props$colu2 !== void 0 ? _props$row$props$colu2 : undefined,
      type: "cellDoubleClicked",
      event: e
    });
  }
  function handleContextMenu() {
    selectCellWrapper();
  }
  if (props.column.haveChildren === true) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      key: props.column.idx,
      style: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      }
    }, childData(props.column.children, props)));
  } else {
    var isCellSelected;
    if (props.selectedCellIdx === props.column.idx) {
      isCellSelected = true;
    } else {
      isCellSelected = false;
    }
    return (
      /*#__PURE__*/
      // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      _react.default.createElement("div", {
        key: props.column.field
        // data-testid="gridcell"
        ,
        role: "gridcell",
        "aria-selected": isCellSelected,
        style: {
          width: "100%",
          textAlign: "center",
          textOverflow: "ellipsis",
          overflow: "hidden",
          height: "inherit",
          paddingInline: isCellSelected && props.selectedCellEditor ? "0px" : "6px"
        }
        // className={props.className}
        ,
        onClick: handleClick,
        onDoubleClick: handleDoubleClick,
        onContextMenu: handleContextMenu
      }, isCellSelected && props.selectedCellEditor ? props.selectedCellEditor : props.row[props.column.field])
    );
  }
}
const childData = (subData, props) => {
  function flatten(into, node) {
    if (node == null) return into;
    if (Array.isArray(node)) return node.reduce(flatten, into);
    into.push(node);
    return flatten(into, node.children);
  }
  var rowSubData = flatten([], subData);
  var value1 = false;
  rowSubData = rowSubData.filter(function (item) {
    return item !== value1;
  });
  for (var i = 0; i < rowSubData.length; i++) {
    if (rowSubData[i].haveChildren) {
      rowSubData.splice(i, 1);
      i--;
    }
  }
  const rowCol = props.rowArray;
  return rowSubData.map((info1, index) => {
    var _info1$cellRendererPa, _info1$cellRendererPa2, _info1$cellRendererPa3, _info1$cellRendererPa4;
    const func = (a, b) => {
      if (a.field === b) {
        return a.width;
      } else {
        return null;
      }
    };
    const [cellValue, setCellValue] = (0, _react.useState)((_info1$cellRendererPa = (_info1$cellRendererPa2 = info1.cellRendererParams) === null || _info1$cellRendererPa2 === void 0 ? void 0 : _info1$cellRendererPa2.value) !== null && _info1$cellRendererPa !== void 0 ? _info1$cellRendererPa : props.row[info1.key]);
    const gridCell = (0, _react.useRef)(null);
    function selectSubCellWrapper(openEditor) {
      var _props$subColumn;
      let sampleColumn = props.column;
      (_props$subColumn = props.subColumn) === null || _props$subColumn === void 0 ? void 0 : _props$subColumn.map(obj => {
        if (obj.field === info1.key) {
          sampleColumn = obj;
        }
      });
      props.selectCell(props.row, sampleColumn, openEditor);
    }
    function handleClick(e) {
      var _info1$editorOptions, _props$onRowClick2, _props$onCellClick2, _info1$resizable, _info1$sortable;
      selectSubCellWrapper((_info1$editorOptions = info1.editorOptions) === null || _info1$editorOptions === void 0 ? void 0 : _info1$editorOptions.editOnClick);
      (_props$onRowClick2 = props.onRowClick) === null || _props$onRowClick2 === void 0 ? void 0 : _props$onRowClick2.call(props, {
        api: props.api,
        data: props.row,
        columnApi: props.columnApi,
        node: props.node,
        rowIndex: props.rowIndex,
        type: "rowClicked",
        event: e
      });
      (_props$onCellClick2 = props.onCellClick) === null || _props$onCellClick2 === void 0 ? void 0 : _props$onCellClick2.call(props, {
        api: props.api,
        colDef: {
          field: info1.field,
          resizable: (_info1$resizable = info1.resizable) !== null && _info1$resizable !== void 0 ? _info1$resizable : undefined,
          sortable: (_info1$sortable = info1.sortable) !== null && _info1$sortable !== void 0 ? _info1$sortable : undefined,
          width: info1.width
        },
        data: props.row,
        node: props.node,
        columnApi: props.columnApi,
        rowIndex: props.rowIndex,
        value: cellValue !== null && cellValue !== void 0 ? cellValue : undefined,
        type: "cellClicked",
        event: e
      });
    }
    function handleContextMenu() {
      selectSubCellWrapper();
    }
    function handleDoubleClick(e) {
      var _props$onRowDoubleCli2, _props$onCellDoubleCl2, _info1$resizable2, _info1$sortable2;
      selectSubCellWrapper(true);
      (_props$onRowDoubleCli2 = props.onRowDoubleClick) === null || _props$onRowDoubleCli2 === void 0 ? void 0 : _props$onRowDoubleCli2.call(props, {
        api: props.api,
        data: props.row,
        columnApi: props.columnApi,
        node: props.node,
        rowIndex: props.rowIndex,
        type: "rowDoubleClicked",
        event: e
      });
      (_props$onCellDoubleCl2 = props.onCellDoubleClick) === null || _props$onCellDoubleCl2 === void 0 ? void 0 : _props$onCellDoubleCl2.call(props, {
        api: props.api,
        colDef: {
          field: info1.field,
          resizable: (_info1$resizable2 = info1.resizable) !== null && _info1$resizable2 !== void 0 ? _info1$resizable2 : undefined,
          sortable: (_info1$sortable2 = info1.sortable) !== null && _info1$sortable2 !== void 0 ? _info1$sortable2 : undefined,
          width: info1.width
        },
        data: props.row,
        node: props.node,
        columnApi: props.columnApi,
        rowIndex: props.rowIndex,
        value: cellValue !== null && cellValue !== void 0 ? cellValue : undefined,
        type: "cellDoubleClicked",
        event: e
      });
    }
    var isCellSelected;
    if (props.selectedCellIdx === info1.idx) {
      isCellSelected = true;
    } else {
      isCellSelected = false;
    }
    let childStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderInlineEnd: isCellSelected && props.selectedCellEditor ? "none" : "1px solid var(--rdg-border-color)",
      textAlign: "center",
      textOverflow: "ellipsis",
      overflow: "hidden",
      height: "inherit",
      outline: props.selectedCellIdx === info1.idx && isCellSelected ? "1px solid var(--rdg-selection-color)" : "none",
      outlineOffset: props.selectedCellIdx === info1.idx && isCellSelected ? "-1px" : "0px",
      // paddingInline: isCellSelected && props.selectedCellEditor ? "0px" : "6px",

      width: "".concat(rowCol.map(info2 => {
        return func(info2, info1.key);
      }), "px").replace(/,/g, "")
    };
    if (info1.validation) {
      const validationStyle = info1.validation.style ? info1.validation.style : {
        backgroundColor: "red"
      };
      if (info1.validation.method(props.row[info1.key])) {
        childStyle = _objectSpread(_objectSpread({}, childStyle), validationStyle);
      }
    }
    if (info1.alignment) {
      function alignmentUtils() {
        var _info1$alignment$type, _info1$alignment$type2, _info1$alignment$type3, _info1$alignment$type4, _info1$alignment$type5, _info1$alignment$type6, _info1$alignment$type7;
        let styles = childStyle;
        let symbol = ["£", "$", "₹", "€", "¥", "₣", "¢"];
        if (((_info1$alignment$type = info1.alignment.type) === null || _info1$alignment$type === void 0 ? void 0 : _info1$alignment$type.toLowerCase()) === "date" || (0, _moment.default)(props.row[info1.field], "YYYY-MM-DD", true).isValid() || (0, _moment.default)(props.row[info1.field], "YYYY/MM/DD", true).isValid() || (0, _moment.default)(props.row[info1.field], "YYYY-DD-MM", true).isValid() || (0, _moment.default)(props.row[info1.field], "YYYY/DD/MM", true).isValid() || (0, _moment.default)(props.row[info1.field], "MM-DD-YYYY", true).isValid() || (0, _moment.default)(props.row[info1.field], "MM/DD/YYYY", true).isValid() || (0, _moment.default)(props.row[info1.field], "MM-YYYY-DD", true).isValid() || (0, _moment.default)(props.row[info1.field], "MM/YYYY/DD", true).isValid() || (0, _moment.default)(props.row[info1.field], "DD-MM-YYYY", true).isValid() || (0, _moment.default)(props.row[info1.field], "DD/MM/YYYY", true).isValid() || (0, _moment.default)(props.row[info1.field], "DD-YYYY-MM", true).isValid() || (0, _moment.default)(props.row[info1.field], "DD/YYYY/MM", true).isValid() || (0, _moment.default)(props.row[info1.field], "DD-MMM-YYYY", true).isValid() || (0, _moment.default)(props.row[info1.field], "DD/MMM/YYYY", true).isValid() || (0, _moment.default)(props.row[info1.field], "DD-YYYY-MMM", true).isValid() || (0, _moment.default)(props.row[info1.field], "DD/YYYY/MMM", true).isValid() || (0, _moment.default)(props.row[info1.field], "MMM-DD-YYYY", true).isValid() || (0, _moment.default)(props.row[info1.field], "MMM/DD/YYYY", true).isValid() || (0, _moment.default)(props.row[info1.field], "MMM-YYYY-DD", true).isValid() || (0, _moment.default)(props.row[info1.field], "MMM/YYYY/DD", true).isValid() || (0, _moment.default)(props.row[info1.field], "YYYY-MMM-DD", true).isValid() || (0, _moment.default)(props.row[info1.field], "YYYY/MMM/DD", true).isValid() || (0, _moment.default)(props.row[info1.field], "YYYY-DD-MMM", true).isValid() || (0, _moment.default)(props.row[info1.field], "YYYY/DD/MMM", true).isValid() || JSON.stringify(props.row[info1.field]).split("/").length === 3 || JSON.stringify(props.row[info1.field]).split("-").length === 3) {
          const alignmentStyle = info1.alignment.align ? {
            textAlign: info1.alignment.align
          } : {
            textAlign: "end",
            paddingRight: "6px",
            paddingLeft: "6px"
          };
          styles = _objectSpread(_objectSpread({}, styles), alignmentStyle);
          return styles;
        } else if (((_info1$alignment$type2 = info1.alignment.type) === null || _info1$alignment$type2 === void 0 ? void 0 : _info1$alignment$type2.toLowerCase()) === "time" || (0, _moment.default)(props.row[info1.field], "hh:mm", true).isValid() || (0, _moment.default)(props.row[info1.field], "hh:mm:ss", true).isValid() || (0, _moment.default)(props.row[info1.field], "hh:mm:ss a", true).isValid() || (0, _moment.default)(props.row[info1.field], "hh:mm a", true).isValid() || JSON.stringify(props.row[info1.field]).split(":").length > 1) {
          const alignment = info1.alignment.align ? {
            textAlign: info1.alignment.align
          } : {
            textAlign: "end",
            paddingRight: "6px",
            paddingLeft: "6px"
          };
          styles = _objectSpread(_objectSpread({}, styles), alignment);
          return styles;
        } else if (((_info1$alignment$type3 = info1.alignment.type) === null || _info1$alignment$type3 === void 0 ? void 0 : _info1$alignment$type3.toLowerCase()) === "datetime" || JSON.stringify(props.row[info1.field]).split(":").length > 1 && (JSON.stringify(props.row[info1.field]).split("/").length === 3 || JSON.stringify(props.row[info1.field]).split("-").length === 3)) {
          const alignment = info1.alignment.align ? {
            textAlign: info1.alignment.align,
            paddingRight: "6px",
            paddingLeft: "6px"
          } : {
            textAlign: "end",
            paddingRight: "6px",
            paddingLeft: "6px"
          };
          styles = _objectSpread(_objectSpread({}, styles), alignment);
          return styles;
        } else if (((_info1$alignment$type4 = info1.alignment.type) === null || _info1$alignment$type4 === void 0 ? void 0 : _info1$alignment$type4.toLowerCase()) === "number" || typeof props.row[info1.field] === "number" && info1.alignment.type !== "currency") {
          const alignment = info1.alignment.align ? {
            textAlign: info1.alignment.align
          } : {
            textAlign: "end"
          };
          styles = _objectSpread(_objectSpread({}, styles), alignment);
          return styles;
        } else if (((_info1$alignment$type5 = info1.alignment.type) === null || _info1$alignment$type5 === void 0 ? void 0 : _info1$alignment$type5.toLowerCase()) === "currency" || symbol.includes(JSON.stringify(props.row[info1.field])[1]) || symbol.includes(JSON.stringify(props.row[info1.field])[props.row[info1.field].length])) {
          const alignment = info1.alignment.align ? {
            textAlign: info1.alignment.align
          } : {
            textAlign: "end"
          };
          styles = _objectSpread(_objectSpread({}, styles), alignment);
          return styles;
        } else if (((_info1$alignment$type6 = info1.alignment.type) === null || _info1$alignment$type6 === void 0 ? void 0 : _info1$alignment$type6.toLowerCase()) === "string" || ((_info1$alignment$type7 = info1.alignment.type) === null || _info1$alignment$type7 === void 0 ? void 0 : _info1$alignment$type7.toLowerCase()) === "text" || typeof row[info1.field] === "string") {
          const alignment = info1.alignment.align ? {
            textAlign: info1.alignment.align
          } : {
            textAlign: "start"
          };
          styles = _objectSpread(_objectSpread({}, styles), alignment);
          return styles;
        } else {
          const alignment = info1.alignment.align ? {
            textAlign: info1.alignment.align
          } : {
            textAlign: "center"
          };
          styles = _objectSpread(_objectSpread({}, styles), alignment);
          return styles;
        }
      }
      childStyle = info1.alignment.align ? _objectSpread(_objectSpread({}, childStyle), {}, {
        textAlign: info1.alignment.align
      }) : alignmentUtils();
    }
    return (
      /*#__PURE__*/
      // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      _react.default.createElement("div", {
        onClick: handleClick
        // aria-selected={isCellSelected}
        ,
        key: info1.idx,
        onDoubleClick: handleDoubleClick,
        onContextMenu: handleContextMenu,
        style: childStyle
        // data-testid="gridcell"
        // role="gridcell"
      }, isCellSelected && props.selectedCellEditor ? props.selectedCellEditor : !info1.rowDrag && info1.cellRenderer(_objectSpread({
        column: info1,
        api: props.api,
        columnApi: props.columnApi,
        row: props.row,
        onRowChange: props.handleRowChange,
        value: cellValue,
        rowIndex: props.rowIndex,
        node: props.node,
        colDef: info1,
        eGridCell: gridCell.current,
        selectCell: props.selectCell,
        selectedCellIdx: props.selectedCellIdx,
        getValue: () => cellValue,
        setValue: newValue => setCellValue(newValue),
        fullWidth: (_info1$cellRendererPa3 = info1.cellRendererParams) === null || _info1$cellRendererPa3 === void 0 ? void 0 : _info1$cellRendererPa3.fullWidth,
        valueFormatted: (_info1$cellRendererPa4 = info1.cellRendererParams) === null || _info1$cellRendererPa4 === void 0 ? void 0 : _info1$cellRendererPa4.valueFormatted
      }, info1 === null || info1 === void 0 ? void 0 : info1.cellRendererParams)))
    );
  });
};