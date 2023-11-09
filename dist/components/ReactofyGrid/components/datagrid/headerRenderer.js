"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = headerRenderer;
require("core-js/modules/es.array.includes.js");
var _react = _interopRequireWildcard(require("react"));
var _core = require("@linaria/core");
var _hooks = require("./hooks");
var _FilterRenderer = _interopRequireDefault(require("./FilterRenderer"));
var _SortableHeaderCell = _interopRequireDefault(require("./SortableHeaderCell"));
var _FilterRendererWithSvg = require("./FilterRendererWithSvg");
const _excluded = ["filters"],
  _excluded2 = ["filters"],
  _excluded3 = ["filters"],
  _excluded4 = ["filters"];
var _templateObject, _templateObject2, _templateObject3;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const filterClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  grid-gap: 10px;\n  grid-template-columns: auto auto;\n  padding: 2px;\n  font-size: 18px;\n  inline-size: 100%;\n  cursor: pointer;\n"])));
const headerWrapperWithChildData = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  height: inherit;\n  justify-content: center;\n  border-inline-end: 1px solid var(--rdg-border-color);\n"])));
const headerWrapperWithcellData = (0, _core.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  box-sizing: border-box;\n"])));
function headerRenderer(_ref) {
  let {
    column,
    rows,
    sortDirection,
    priority,
    selectCell,
    onSort,
    shouldFocusGrid,
    setFilters,
    setFilterType,
    cellHeight,
    selectedPosition,
    selectedCellHeaderStyle,
    headerRowHeight,
    selectedCellIdx,
    arrayDepth,
    ChildColumnSetup,
    gridWidth
  } = _ref;
  if (column.haveChildren === true) {
    var _column$headerName;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        borderBlockEnd: "1px solid var(--rdg-border-color)",
        height: "".concat(headerRowHeight, "px")
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: headerWrapperWithChildData
    }, (_column$headerName = column.headerName) !== null && _column$headerName !== void 0 ? _column$headerName : column.field)), /*#__PURE__*/_react.default.createElement("div", {
      className: headerWrapperWithcellData
    }, column.children !== undefined && column.children.map((info, index) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, RecursiveScan(column.children, info, cellHeight, index, headerRowHeight, selectedPosition, selectedCellHeaderStyle, column, selectCell, shouldFocusGrid, onSort, sortDirection, priority, setFilters, arrayDepth, ChildColumnSetup, selectedCellIdx, setFilterType, gridWidth));
    })));
  } else {
    var _column$width;
    var isCellSelected;
    if (selectedCellIdx === column.idx) {
      isCellSelected = true;
    } else {
      isCellSelected = false;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {
      onFocus
    } = (0, _hooks.useRovingCellRef)(isCellSelected);
    ChildColumnSetup(column);
    var style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "inherit",
      width: (_column$width = column.width) !== null && _column$width !== void 0 ? _column$width : "100%"
    };
    selectedCellHeaderStyle && selectedPosition.idx === column.idx ? style = _objectSpread(_objectSpread({}, style), selectedCellHeaderStyle) : style;
    function onClick() {
      selectCell(column.idx);
    }
    function onDoubleClick(event) {
      const {
        right,
        left
      } = event.currentTarget.getBoundingClientRect();
      const offset = isRtl ? event.clientX - left : right - event.clientX;
      if (offset > 11) {
        // +1px to account for the border size
        return;
      }
      onColumnResize(column, "max-content");
    }
    function handleFocus(event) {
      onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
      if (shouldFocusGrid) {
        // Select the first header cell if there is no selected cell
        selectCell(0);
      }
    }

    // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
    if (!column.sortable && !column.filter) {
      var _column$headerName2;
      return (
        /*#__PURE__*/
        // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        _react.default.createElement("div", {
          key: column.idx,
          role: "columnheader",
          "aria-selected": isCellSelected,
          style: {
            height: "".concat(cellHeight, "px"),
            display: "flex",
            justifyContent: "center",
            width: "100%"
          },
          onFocus: handleFocus,
          onClick: onClick,
          onDoubleClick: column.resizable ? onDoubleClick : undefined
          // onPointerDown={column.resizable ? onPointerDown : undefined}
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: _objectSpread({}, style)
        }, (_column$headerName2 = column.headerName) !== null && _column$headerName2 !== void 0 ? _column$headerName2 : column.field))
      );
    }
    if (column.sortable && !column.filter) {
      var _column$headerName3;
      return /*#__PURE__*/_react.default.createElement("div", {
        key: column.idx,
        role: "columnheader",
        "aria-selected": isCellSelected,
        style: {
          height: "".concat(cellHeight, "px"),
          display: "flex",
          justifyContent: "center",
          width: "100%"
        },
        onFocus: handleFocus,
        onClick: onClick,
        onDoubleClick: column.resizable ? onDoubleClick : undefined
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: _objectSpread({}, style)
      }, /*#__PURE__*/_react.default.createElement(_SortableHeaderCell.default, {
        onSort: onSort,
        sortDirection: sortDirection,
        priority: priority,
        isCellSelected: isCellSelected,
        column: column,
        borderBottom: "none"
      }, (_column$headerName3 = column.headerName) !== null && _column$headerName3 !== void 0 ? _column$headerName3 : column.field)));
    }
    if (column.filter && !column.sortable) {
      var style11 = {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      };
      selectedCellHeaderStyle && selectedPosition.idx === column.idx ? style11 = _objectSpread(_objectSpread({}, style11), selectedCellHeaderStyle) : style11;
      return /*#__PURE__*/_react.default.createElement("div", {
        role: "columnheader",
        "aria-selected": isCellSelected,
        style: _objectSpread({}, style11),
        key: column.idx,
        onClick: onClick
      }, /*#__PURE__*/_react.default.createElement(_FilterRenderer.default, {
        selectedCellHeaderStyle: selectedCellHeaderStyle,
        selectedPosition: selectedCellHeaderStyle,
        onFocus: handleFocus,
        onClick: onClick,
        column: column,
        onDoubleClick: column.resizable ? onDoubleClick : undefined,
        isCellSelected: isCellSelected
      }, _ref2 => {
        let {
            filters
          } = _ref2,
          rest = _objectWithoutProperties(_ref2, _excluded);
        return (0, _FilterRendererWithSvg.FilterRendererWithSvg)(column, filterClassname, filters, setFilters, setFilterType, gridWidth);
      }));
    }
    if (column.filter && column.sortable) {
      var _column$headerName4;
      var styleSF = {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      };
      selectedCellHeaderStyle && selectedPosition.idx === column.idx ? styleSF = _objectSpread(_objectSpread({}, styleSF), selectedCellHeaderStyle) : styleSF;
      return /*#__PURE__*/_react.default.createElement("div", {
        key: column.idx,
        role: "columnheader",
        "aria-selected": isCellSelected,
        onFocus: handleFocus,
        onClick: onClick,
        onDoubleClick: column.resizable ? onDoubleClick : undefined,
        style: _objectSpread({}, styleSF)
      }, /*#__PURE__*/_react.default.createElement(_SortableHeaderCell.default, {
        onSort: onSort,
        sortDirection: sortDirection,
        priority: priority,
        isCellSelected: isCellSelected
      }, (_column$headerName4 = column.headerName) !== null && _column$headerName4 !== void 0 ? _column$headerName4 : column.field), /*#__PURE__*/_react.default.createElement(_FilterRenderer.default, {
        column: column,
        isCellSelected: isCellSelected
      }, _ref3 => {
        let {
            filters
          } = _ref3,
          rest = _objectWithoutProperties(_ref3, _excluded2);
        return (0, _FilterRendererWithSvg.FilterRendererWithSvg)(column, filterClassname, filters, setFilters, setFilterType, gridWidth);
      }));
    }
  }
}
// useMemo(() => expensiveCalculation(count), [count]);

var columnsList = [];
const RecursiveScan = (masterData, subData, cellHeight, index, headerRowHeight, selectedPosition, selectedCellHeaderStyle, column, selectCell, shouldFocusGrid, onSort, sortDirection, priority, setFilters, arrayDepth, ChildColumnSetup, selectedCellIdx, setFilterType, gridWidth, direction) => {
  var cellHeight = cellHeight - headerRowHeight;
  ChildColumnSetup(subData);
  if (subData.haveChildren === true) {
    var _subData$headerName;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        borderBlockEnd: "1px solid var(--rdg-border-color)",
        height: "".concat(headerRowHeight, "px")
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: headerWrapperWithChildData
    }, (_subData$headerName = subData.headerName) !== null && _subData$headerName !== void 0 ? _subData$headerName : subData.field)), /*#__PURE__*/_react.default.createElement("div", {
      className: headerWrapperWithcellData
    }, subData.children.map((subInfo, index) => {
      var style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box"
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: _objectSpread({}, style)
      }, RecursiveScan(subData.children, subInfo, cellHeight, index, headerRowHeight, selectedPosition, selectedCellHeaderStyle, column, selectCell, shouldFocusGrid, onSort, sortDirection, priority, setFilters, arrayDepth, ChildColumnSetup, selectedCellIdx, setFilterType, gridWidth));
    })));
  } else {
    var _subData$headerName2, _subData$headerName3;
    var isCellSelected;
    if (selectedCellIdx === subData.idx) {
      isCellSelected = true;
    } else {
      isCellSelected = false;
    }
    const {
      onFocus
    } = (0, _hooks.useRovingCellRef)(isCellSelected);
    columnsList.includes(subData.name) ? null : columnsList.push(subData.name);
    var style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderInlineEnd: "1px solid var(--rdg-border-color)",
      width: subData.width,
      boxSizing: "border-box",
      height: "".concat(cellHeight, "px"),
      outline: selectedCellIdx === subData.idx ? "1px solid var(--rdg-selection-color)" : "none",
      outlineOffset: selectedCellIdx === subData.idx ? "-1px" : "0px"
    };
    selectedCellHeaderStyle && selectedPosition.idx === subData.idx ? style = _objectSpread(_objectSpread({}, style), selectedCellHeaderStyle) : style;
    function onClick() {
      selectCell(subData.idx);
    }
    const isRtl = direction === "rtl";
    function onDoubleClick(event) {
      const {
        right,
        left
      } = event.currentTarget.getBoundingClientRect();
      const offset = isRtl ? event.clientX - left : right - event.clientX;
      if (offset > 11) {
        // +1px to account for the border size
        return;
      }
      onColumnResize(subData, "max-content");
    }
    function handleFocus(event) {
      onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
      if (shouldFocusGrid) {
        // Select the first header cell if there is no selected cell
        selectCell(0);
      }
    }
    if (!subData.sortable && !subData.filter) return (
      /*#__PURE__*/
      // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        key: subData.idx,
        role: "columnheader",
        "aria-selected": isCellSelected,
        "aria-colindex": "".concat(column.index + 1, ".").concat(columnsList.indexOf(subData.name) + 1),
        "aria-selected": selectedCellIdx === subData.idx,
        style: _objectSpread({}, style)
        // onFocus={handleFocus}
        ,
        onClick: onClick,
        onDoubleClick: column.resizable ? onDoubleClick : undefined
        // onPointerDown={column.resizable ? onPointerDown : undefined}
      }, (_subData$headerName2 = subData.headerName) !== null && _subData$headerName2 !== void 0 ? _subData$headerName2 : subData.field))
    );
    if (subData.sortable && !subData.filter) return (
      /*#__PURE__*/
      // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      _react.default.createElement("div", {
        key: subData.idx,
        role: "columnheader",
        "aria-selected": isCellSelected,
        style: _objectSpread({}, style)
        // onFocus={handleFocus}
        ,
        onClick: onClick,
        onDoubleClick: subData.resizable ? onDoubleClick : undefined
        // onPointerDown={column.resizable ? onPointerDown : undefined}
      }, /*#__PURE__*/_react.default.createElement(_SortableHeaderCell.default, {
        onSort: onSort,
        selectedPositionIdx: selectedPosition.idx,
        subCellIdx: subData.idx,
        sortDirection: sortDirection,
        priority: priority,
        isCellSelected: isCellSelected
      }, (_subData$headerName3 = subData.headerName) !== null && _subData$headerName3 !== void 0 ? _subData$headerName3 : subData.field))
    );
    if (subData.filter && !subData.sortable) {
      var style1 = {
        display: "flex",
        justifyContent: "center",
        borderRight: "1px solid var(--rdg-border-color)",
        width: subData.width,
        alignItems: "center",
        height: "".concat(cellHeight, "px"),
        boxSizing: "border-box",
        outline: selectedCellIdx === subData.idx ? "1px solid var(--rdg-selection-color)" : "none",
        outlineOffset: selectedCellIdx === subData.idx ? "-1px" : "0px"
      };
      selectedCellHeaderStyle && selectedPosition.idx === subData.idx ? style1 = _objectSpread(_objectSpread({}, style1), selectedCellHeaderStyle) : style1;
      function onClickFilter() {
        selectCell(subData.idx);
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        key: subData.idx,
        role: "columnheader",
        "aria-selected": isCellSelected,
        onClick: onClickFilter,
        onDoubleClick: subData.resizable ? onDoubleClick : undefined,
        style: _objectSpread({}, style1)
      }, /*#__PURE__*/_react.default.createElement(_FilterRenderer.default, {
        column: subData,
        isCellSelected: isCellSelected
      }, _ref4 => {
        let {
            filters
          } = _ref4,
          rest = _objectWithoutProperties(_ref4, _excluded3);
        return (0, _FilterRendererWithSvg.FilterRendererWithSvg)(subData, filterClassname, filters, setFilters, setFilterType, gridWidth);
      }));
    }
    if (subData.filter && subData.sortable) {
      var _subData$headerName4;
      var style1 = {
        display: "flex",
        justifyContent: "center",
        borderRight: "1px solid var(--rdg-border-color)",
        width: subData.width,
        alignItems: "center",
        height: "".concat(cellHeight, "px"),
        boxSizing: "border-box",
        outline: selectedCellIdx === subData.idx ? "1px solid var(--rdg-selection-color)" : "none",
        outlineOffset: selectedCellIdx === subData.idx ? "-1px" : "0px"
      };
      selectedCellHeaderStyle && selectedPosition.idx === subData.idx ? style1 = _objectSpread(_objectSpread({}, style1), selectedCellHeaderStyle) : style1;
      function onClickFilter() {
        selectCell(subData.idx);
      }
      return (
        /*#__PURE__*/
        // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        _react.default.createElement("div", {
          key: subData.idx,
          role: "columnheader",
          "aria-selected": isCellSelected,
          style: _objectSpread({}, style1)
          // onFocus={handleFocus}
          ,
          onClick: onClickFilter,
          onDoubleClick: column.resizable ? onDoubleClick : undefined
          // onPointerDown={column.resizable ? onPointerDown : undefined}
        }, /*#__PURE__*/_react.default.createElement(_SortableHeaderCell.default, {
          onSort: onSort,
          selectedPositionIdx: selectedPosition.idx,
          subCellIdx: subData.idx,
          sortDirection: sortDirection,
          priority: priority,
          isCellSelected: isCellSelected
        }, (_subData$headerName4 = subData.headerName) !== null && _subData$headerName4 !== void 0 ? _subData$headerName4 : subData.field), /*#__PURE__*/_react.default.createElement(_FilterRenderer.default, {
          column: subData,
          isCellSelected: isCellSelected
        }, _ref5 => {
          let {
              filters
            } = _ref5,
            rest = _objectWithoutProperties(_ref5, _excluded4);
          return (0, _FilterRendererWithSvg.FilterRendererWithSvg)(subData, filterClassname, filters, setFilters, setFilterType, gridWidth);
        }))
      );
    }
  }
};
function inputStopPropagation(event) {
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.stopPropagation();
  }
}