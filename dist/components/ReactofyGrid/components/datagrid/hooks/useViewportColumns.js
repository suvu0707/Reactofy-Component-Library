"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useViewportColumns = useViewportColumns;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function useViewportColumns(_ref) {
  let {
    columns,
    colSpanColumns,
    rows,
    topSummaryRows,
    bottomSummaryRows,
    colOverscanStartIdx,
    colOverscanEndIdx,
    lastFrozenColumnIndex,
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    columnWidths,
    isGroupRow
  } = _ref;
  // find the column that spans over a column within the visible columns range and adjust colOverscanStartIdx
  const startIdx = (0, _react.useMemo)(() => {
    if (colOverscanStartIdx === 0) return 0;
    let startIdx = colOverscanStartIdx;
    const updateStartIdx = (colIdx, colSpan) => {
      if (colSpan !== undefined && colIdx + colSpan > colOverscanStartIdx) {
        startIdx = colIdx;
        return true;
      }
      return false;
    };
    for (const column of colSpanColumns) {
      // check header row
      const colIdx = column.idx;
      if (colIdx >= startIdx) break;
      if (updateStartIdx(colIdx, (0, _utils.getColSpan)(column, lastFrozenColumnIndex, {
        type: "HEADER"
      }))) {
        break;
      }

      // check viewport rows
      for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
        const row = rows[rowIdx];
        if (isGroupRow(row)) continue;
        if (updateStartIdx(colIdx, (0, _utils.getColSpan)(column, lastFrozenColumnIndex, {
          type: "ROW",
          row
        }))) {
          break;
        }
      }

      // check summary rows
      if (topSummaryRows != null) {
        for (const row of topSummaryRows) {
          if (updateStartIdx(colIdx, (0, _utils.getColSpan)(column, lastFrozenColumnIndex, {
            type: "SUMMARY",
            row
          }))) {
            break;
          }
        }
      }
      if (bottomSummaryRows != null) {
        for (const row of bottomSummaryRows) {
          if (updateStartIdx(colIdx, (0, _utils.getColSpan)(column, lastFrozenColumnIndex, {
            type: "SUMMARY",
            row
          }))) {
            break;
          }
        }
      }
    }
    return startIdx;
  }, [rowOverscanStartIdx, rowOverscanEndIdx, rows, topSummaryRows, bottomSummaryRows, colOverscanStartIdx, lastFrozenColumnIndex, colSpanColumns, isGroupRow]);
  const {
    viewportColumns,
    flexWidthViewportColumns
  } = (0, _react.useMemo)(() => {
    const viewportColumns = [];
    const flexWidthViewportColumns = [];
    for (let colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
      const column = columns[colIdx];
      if (colIdx < startIdx && !column.frozen) continue;
      viewportColumns.push(column);
      if (typeof column.width === "string") {
        flexWidthViewportColumns.push(column);
      }
    }
    return {
      viewportColumns,
      flexWidthViewportColumns
    };
  }, [startIdx, colOverscanEndIdx, columns]);
  const unsizedFlexWidthViewportColumns = (0, _react.useMemo)(() => {
    return flexWidthViewportColumns.filter(column => !columnWidths.has(column.key));
  }, [flexWidthViewportColumns, columnWidths]);
  return {
    viewportColumns,
    flexWidthViewportColumns: unsizedFlexWidthViewportColumns
  };
}