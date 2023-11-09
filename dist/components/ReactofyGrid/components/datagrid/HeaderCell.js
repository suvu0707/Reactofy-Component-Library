"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HeaderCell;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _core = require("@linaria/core");
var _headerRenderer = _interopRequireDefault(require("./headerRenderer"));
var _utils = require("./utils");
var _useRovingCellRef = require("./hooks/useRovingCellRef");
var _style = require("./style");
var _reactDnd = require("react-dnd");
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const cellResizable = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.HeaderCell {\n    touch-action: none;\n\n    &::after {\n      content: \"\";\n      cursor: col-resize;\n      position: absolute;\n      inset-block-start: 0;\n      inset-inline-end: 0;\n      inset-block-end: 0;\n      inline-size: 10px;\n    }\n  }\n"])));
const cellResizableClassname = "rdg-cell-resizable ".concat(cellResizable);
function HeaderCell(_ref) {
  var _column$headerRendere;
  let {
    column,
    columns,
    rows,
    cellHeight,
    arrayDepth,
    headerRowHeight,
    colSpan,
    isCellSelected,
    selectedCellIdx,
    onColumnResize,
    allRowsSelected,
    onAllRowsSelectionChange,
    sortColumns,
    onSortColumnsChange,
    selectCell,
    shouldFocusGrid,
    selectedPosition,
    selectedCellHeaderStyle,
    direction,
    setFilters,
    setFilterType,
    handleReorderColumn,
    ChildColumnSetup,
    gridWidth
  } = _ref;
  const isRtl = direction === "rtl";
  const {
    tabIndex,
    onFocus
  } = (0, _useRovingCellRef.useRovingCellRef)(isCellSelected);
  const [sortableColumnKey, setSortableColumnKey] = (0, _react.useState)();
  const sortIndex = sortColumns === null || sortColumns === void 0 ? void 0 : sortColumns.findIndex(sort => sort.columnKey === sortableColumnKey);
  const sortColumn = sortIndex !== undefined && sortIndex > -1 ? sortColumns[sortIndex] : undefined;
  const sortDirection = sortColumn === null || sortColumn === void 0 ? void 0 : sortColumn.direction;
  const priority = sortColumn !== undefined && sortColumns.length > 1 ? sortIndex + 1 : undefined;
  const ariaSort = sortDirection && !priority ? sortDirection === "ASC" ? "ascending" : "descending" : undefined;
  const style = (0, _utils.getCellStyle)(column, colSpan);
  // selectedCellHeaderStyle && selectedPosition.idx === column.idx
  //   ? (style = { ...style, ...selectedCellHeaderStyle })
  //   : style;

  const className = (0, _utils.getCellClassname)(column, column.headerCellClass, column.filter && _style.filterColumnClassName, {
    [cellResizableClassname]: column.resizable
  }, "rdg-header-column-".concat(column.idx % 2 === 0 ? "even" : "odd"));
  const headerRenderer = (_column$headerRendere = column.headerRenderer) !== null && _column$headerRendere !== void 0 ? _column$headerRendere : _headerRenderer.default;
  function onPointerDown(event) {
    if (event.pointerType === "mouse" && event.buttons !== 1) {
      return;
    }
    const {
      currentTarget,
      pointerId
    } = event;
    const {
      right,
      left
    } = currentTarget.getBoundingClientRect();
    const offset = isRtl ? event.clientX - left : right - event.clientX;
    if (offset > 11) {
      // +1px to account for the border size
      return;
    }
    function onPointerMove(event) {
      // prevents text selection in Chrome, which fixes scrolling the grid while dragging, and fixes re-size on an autosized column
      event.preventDefault();
      const {
        right,
        left
      } = currentTarget.getBoundingClientRect();
      const width = isRtl ? right + offset - event.clientX : event.clientX + offset - left;
      if (width > 0) {
        onColumnResize(column, width);
      }
    }
    function onLostPointerCapture() {
      currentTarget.removeEventListener("pointermove", onPointerMove);
      currentTarget.removeEventListener("lostpointercapture", onLostPointerCapture);
    }
    currentTarget.setPointerCapture(pointerId);
    currentTarget.addEventListener("pointermove", onPointerMove);
    currentTarget.addEventListener("lostpointercapture", onLostPointerCapture);
  }
  function onSort(ctrlClick, name, idx) {
    let matches = [];
    const recursiveSort = cdata => {
      if (cdata.haveChildren === true) {
        cdata.children.map((e, index) => {
          return recursiveSort(e);
        });
      } else {
        matches.push(cdata.headerName === name && cdata);
      }
    };
    if (column.haveChildren === true) {
      column.children.map(e => {
        return recursiveSort(e);
      });
    } else {
      matches.push(column.headerName === name && column);
    }
    var value1 = false;
    matches = matches.filter(function (item) {
      return item !== value1;
    });
    setSortableColumnKey(matches[0].field);
    if (onSortColumnsChange == null) return;
    const {
      sortDescendingFirst
    } = matches[0];
    if (sortColumn === undefined) {
      // not currently sorted
      const nextSort = {
        columnKey: matches[0].field,
        direction: sortDescendingFirst ? "DESC" : "ASC"
      };
      onSortColumnsChange(sortColumns && ctrlClick ? [...sortColumns, nextSort] : [nextSort]);
    } else {
      let nextSortColumn;
      if (sortDescendingFirst === true && sortDirection === "DESC" || sortDescendingFirst !== true && sortDirection === "ASC") {
        nextSortColumn = {
          columnKey: matches[0].field,
          direction: sortDirection === "ASC" ? "DESC" : "ASC"
        };
      }
      if (ctrlClick) {
        const nextSortColumns = [...sortColumns];
        if (nextSortColumn) {
          // swap direction
          nextSortColumns[sortIndex] = nextSortColumn;
        } else {
          // remove sort
          nextSortColumns.splice(sortIndex, 1);
        }
        onSortColumnsChange(nextSortColumns);
      } else {
        onSortColumnsChange(nextSortColumn ? [nextSortColumn] : []);
      }
    }
  }
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
  function handleColumnsReorder(sourceKey, targetKey) {
    const sourceColumnIndex = columns.findIndex(c => c.field === sourceKey);
    const targetColumnIndex = columns.findIndex(c => c.field === targetKey);
    const reorderedColumns = [...columns];
    reorderedColumns.splice(targetColumnIndex, 0, reorderedColumns.splice(sourceColumnIndex, 1)[0]);
    handleReorderColumn([...reorderedColumns]);
  }
  const [{
    isDragging
  }, drag] = (0, _reactDnd.useDrag)({
    type: "COLUMN_DRAG",
    item: {
      key: column.key
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const [{
    isOver
  }, drop] = (0, _reactDnd.useDrop)({
    accept: "COLUMN_DRAG",
    drop(_ref2) {
      let {
        key
      } = _ref2;
      handleColumnsReorder(key, column.key);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  return (
    /*#__PURE__*/
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    _react.default.createElement("div", {
      role: "parentcolumn",
      "aria-colindex": column.idx + 1,
      "aria-sort": ariaSort,
      "aria-colspan": colSpan,
      ref: ele => {
        drag(ele);
        drop(ele);
      }
      // set the tabIndex to 0 when there is no selected cell so grid can receive focus
      ,
      tabIndex: shouldFocusGrid ? 0 : tabIndex,
      className: className,
      style: style
      // onFocus={handleFocus}
      // onClick={onClick}
      // onDoubleClick={column.resizable ? onDoubleClick : undefined}
      ,
      onPointerDown: column.resizable ? onPointerDown : undefined
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
      }
    }, headerRenderer({
      column,
      rows,
      arrayDepth,
      cellHeight,
      sortDirection,
      selectCell,
      priority,
      selectedCellIdx,
      onSort,
      allRowsSelected,
      onAllRowsSelectionChange,
      isCellSelected,
      setFilters,
      setFilterType,
      style,
      className,
      ChildColumnSetup,
      selectedPosition,
      headerRowHeight,
      selectedCellHeaderStyle,
      gridWidth,
      //need to be chnaged

      shouldFocusGrid,
      handleFocus,
      onClick,
      onDoubleClick,
      onPointerDown
    })))
  );
}