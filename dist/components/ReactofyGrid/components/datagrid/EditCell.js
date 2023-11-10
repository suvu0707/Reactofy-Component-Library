"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EditCell;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _core = require("@linaria/core");
var _reactDnd = require("react-dnd");
var _useLatestFunc = require("./hooks/useLatestFunc");
var _utils = require("./utils");
var _templateObject;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
/*
 * To check for outside `mousedown` events, we listen to all `mousedown` events at their birth,
 * i.e. on the window during the capture phase, and at their death, i.e. on the window during the bubble phase.
 *
 * We schedule a check at the birth of the event, cancel the check when the event reaches the "inside" container,
 * and trigger the "outside" callback when the event bubbles back up to the window.
 *
 * The event can be `stopPropagation()`ed halfway through, so they may not always bubble back up to the window,
 * so an alternative check must be used. The check must happen after the event can reach the "inside" container,
 * and not before it run to completion. `requestAnimationFrame` is the best way we know how to achieve this.
 * Usually we want click event handlers from parent components to access the latest commited values,
 * so `mousedown` is used instead of `click`.
 *
 * We must also rely on React's event capturing/bubbling to handle elements rendered in a portal.
 */

const cellEditing = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.EditCell {\n    padding: 0;\n  }\n"])));
function EditCell(_ref) {
  var _column$editorOptions, _column$editorOptions4, _column$editorOptions5, _column$editorOptions6;
  let {
    column,
    colSpan,
    row,
    allrow,
    rowIndex,
    onRowChange,
    api,
    node,
    closeEditor,
    handleReorderRow
  } = _ref;
  const frameRequestRef = (0, _react.useRef)();
  const commitOnOutsideClick = ((_column$editorOptions = column.editorOptions) === null || _column$editorOptions === void 0 ? void 0 : _column$editorOptions.commitOnOutsideClick) !== false;

  // We need to prevent the `useEffect` from cleaning up between re-renders,
  // as `onWindowCaptureMouseDown` might otherwise miss valid mousedown events.
  // To that end we instead access the latest props via useLatestFunc.
  const commitOnOutsideMouseDown = (0, _useLatestFunc.useLatestFunc)(() => {
    onClose(true);
  });
  (0, _react.useEffect)(() => {
    if (!commitOnOutsideClick) return;
    function onWindowCaptureMouseDown() {
      frameRequestRef.current = requestAnimationFrame(commitOnOutsideMouseDown);
    }

    // eslint-disable-next-line no-restricted-globals
    addEventListener("mousedown", onWindowCaptureMouseDown, {
      capture: true
    });
    return () => {
      // eslint-disable-next-line no-restricted-globals
      removeEventListener("mousedown", onWindowCaptureMouseDown, {
        capture: true
      });
      cancelFrameRequest();
    };
  }, [commitOnOutsideClick, commitOnOutsideMouseDown]);
  function cancelFrameRequest() {
    cancelAnimationFrame(frameRequestRef.current);
  }
  function onKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      // Discard changes
      onClose();
    } else if (event.key === "Enter") {
      event.stopPropagation();
      onClose(true);
    } else {
      var _column$editorOptions2, _column$editorOptions3;
      const onNavigation = (_column$editorOptions2 = (_column$editorOptions3 = column.editorOptions) === null || _column$editorOptions3 === void 0 ? void 0 : _column$editorOptions3.onNavigation) !== null && _column$editorOptions2 !== void 0 ? _column$editorOptions2 : _utils.onEditorNavigation;
      if (!onNavigation(event)) {
        event.stopPropagation();
      }
    }
  }
  function onClose(commitChanges) {
    if (commitChanges) {
      onRowChange(row, true);
    } else {
      closeEditor();
    }
  }
  const {
    cellClass
  } = column;
  const className = (0, _utils.getCellClassname)(column, "rdg-editor-container", !((_column$editorOptions4 = column.editorOptions) !== null && _column$editorOptions4 !== void 0 && _column$editorOptions4.renderFormatter) && cellEditing, typeof cellClass === "function" ? cellClass(row) : cellClass);
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
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "gridcell"
    // aria-colindex is 1-based
    ,
    "aria-colindex": column.idx + 1,
    "aria-colspan": colSpan,
    "aria-selected": true,
    className: className,
    style: (0, _utils.getCellStyle)(column, colSpan),
    onKeyDown: onKeyDown,
    onMouseDownCapture: commitOnOutsideClick ? cancelFrameRequest : undefined
  }, column.rowDrag && /*#__PURE__*/_react.default.createElement("div", {
    ref: ele => {
      drag(ele);
      drop(ele);
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginRight: "10px",
      cursor: "grab"
    }
  }, "\u25CA"), (column.cellEditor != null || column.editable === true) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, column.cellEditor({
    column,
    colDef: column,
    row,
    data: row,
    onRowChange,
    value: row[column.key],
    node,
    valueFormatted: column.valueFormatter,
    allrow,
    rowIndex,
    api,
    onClose
  }), ((_column$editorOptions5 = column.editorOptions) === null || _column$editorOptions5 === void 0 ? void 0 : _column$editorOptions5.renderFormatter) && column.editable !== true && column.formatter({
    colDef: column,
    column,
    data: row,
    row,
    api,
    node,
    value: row[column.key],
    valueFormatted: column.valueFormatter,
    onRowChange,
    isCellSelected: true
  }), column.editable && column.formatter({
    colDef: column,
    column,
    data: row,
    row,
    api,
    node,
    value: row[column.key],
    valueFormatted: column.valueFormatter,
    onRowChange,
    isCellSelected: true
  }))), (column.cellEditor != null || column.editable === true) && !column.rowDrag && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, column.cellEditor({
    column,
    colDef: column,
    row,
    data: row,
    onRowChange,
    value: row[column.key],
    node,
    valueFormatted: column.valueFormatter,
    allrow,
    rowIndex,
    api,
    onClose
  }), ((_column$editorOptions6 = column.editorOptions) === null || _column$editorOptions6 === void 0 ? void 0 : _column$editorOptions6.renderFormatter) && column.editable !== true && column.formatter({
    colDef: column,
    column,
    data: row,
    row,
    api,
    node,
    value: row[column.key],
    valueFormatted: column.valueFormatter,
    onRowChange,
    isCellSelected: true
  }), column.editable && column.formatter({
    colDef: column,
    column,
    data: row,
    row,
    api,
    node,
    value: row[column.key],
    valueFormatted: column.valueFormatter,
    onRowChange,
    isCellSelected: true
  })));
}