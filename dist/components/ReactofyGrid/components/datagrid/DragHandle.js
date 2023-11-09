"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DragHandle;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _core = require("@linaria/core");
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const cellDragHandle = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.DragHandle {\n    cursor: move;\n    position: absolute;\n    inset-inline-end: 0;\n    inset-block-end: 0;\n    inline-size: 8px;\n    block-size: 8px;\n    background-color: var(--rdg-selection-color);\n\n    &:hover {\n      inline-size: 16px;\n      block-size: 16px;\n      border: 2px solid var(--rdg-selection-color);\n      background-color: var(--rdg-background-color);\n    }\n  }\n"])));
const cellDragHandleClassname = "rdg-cell-drag-handle ".concat(cellDragHandle);
function DragHandle(_ref) {
  let {
    rows,
    columns,
    selectedPosition,
    latestDraggedOverRowIdx,
    isCellEditable,
    onRowsChange,
    onFill,
    setDragging,
    setDraggedOverRowIdx
  } = _ref;
  function handleMouseDown(event) {
    if (event.buttons !== 1) return;
    setDragging(true);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseup", onMouseUp);
    function onMouseOver(event) {
      // Trigger onMouseup in edge cases where we release the mouse button but `mouseup` isn't triggered,
      // for example when releasing the mouse button outside the iframe the grid is rendered in.
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
      if (event.buttons !== 1) onMouseUp();
    }
    function onMouseUp() {
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseup", onMouseUp);
      setDragging(false);
      handleDragEnd();
    }
  }
  function handleDragEnd() {
    const overRowIdx = latestDraggedOverRowIdx.current;
    if (overRowIdx === undefined) return;
    const {
      rowIdx
    } = selectedPosition;
    const startRowIndex = rowIdx < overRowIdx ? rowIdx + 1 : overRowIdx;
    const endRowIndex = rowIdx < overRowIdx ? overRowIdx + 1 : rowIdx;
    updateRows(startRowIndex, endRowIndex);
    setDraggedOverRowIdx(undefined);
  }
  function handleDoubleClick(event) {
    event.stopPropagation();
    updateRows(selectedPosition.rowIdx + 1, rows.length);
  }
  function updateRows(startRowIdx, endRowIdx) {
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const column = columns[idx];
    const sourceRow = rows[rowIdx];
    const updatedRows = [...rows];
    const indexes = [];
    for (let i = startRowIdx; i < endRowIdx; i++) {
      if (isCellEditable({
        rowIdx: i,
        idx
      })) {
        const updatedRow = onFill({
          columnKey: column.key,
          sourceRow,
          targetRow: rows[i]
        });
        if (updatedRow !== rows[i]) {
          updatedRows[i] = updatedRow;
          indexes.push(i);
        }
      }
    }
    if (indexes.length > 0) {
      onRowsChange === null || onRowsChange === void 0 ? void 0 : onRowsChange(updatedRows, {
        indexes,
        column
      });
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: cellDragHandleClassname,
    onMouseDown: handleMouseDown,
    onDoubleClick: handleDoubleClick
  });
}