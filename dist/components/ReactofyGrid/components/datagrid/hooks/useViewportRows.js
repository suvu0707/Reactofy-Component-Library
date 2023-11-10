"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useViewportRows = useViewportRows;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// TODO: https://github.com/microsoft/TypeScript/issues/41808
function isReadonlyArray(arr) {
  return Array.isArray(arr);
}
function useViewportRows(_ref) {
  let {
    rawRows,
    rowHeight,
    clientHeight,
    scrollTop,
    groupBy,
    rowGrouper,
    expandedGroupIds,
    enableVirtualization,
    paginationPageSize,
    current,
    pagination,
    expandAll
  } = _ref;
  const [groupedRows, rowsCount] = (0, _react.useMemo)(() => {
    if (groupBy.length === 0 || rowGrouper == null) return [undefined, rawRows.length];
    const groupRows = (rows, _ref2, startRowIndex) => {
      let [groupByKey, ...remainingGroupByKeys] = _ref2;
      let groupRowsCount = 0;
      const groups = {};
      for (const [key, childRows] of Object.entries(rowGrouper(rows, groupByKey))) {
        // Recursively group each parent group
        const [childGroups, childRowsCount] = remainingGroupByKeys.length === 0 ? [childRows, childRows.length] : groupRows(childRows, remainingGroupByKeys, startRowIndex + groupRowsCount + 1); // 1 for parent row
        groups[key] = {
          childRows,
          childGroups,
          startRowIndex: startRowIndex + groupRowsCount
        };
        groupRowsCount += childRowsCount + 1; // 1 for parent row
      }

      return [groups, groupRowsCount];
    };
    return groupRows(rawRows, groupBy, 0);
  }, [groupBy, rowGrouper, rawRows]);
  const [rows, isGroupRow] = (0, _react.useMemo)(() => {
    const allGroupRows = new Set();
    if (!groupedRows) return [rawRows, isGroupRow];
    const flattenedRows = [];
    const expandGroup = (rows, parentId, level) => {
      if (isReadonlyArray(rows)) {
        flattenedRows.push(...rows);
        return;
      }
      Object.keys(rows).forEach((groupKey, posInSet, keys) => {
        var _expandedGroupIds$has;
        // TODO: should users have control over the generated key?
        const id = parentId !== undefined ? "".concat(parentId, "__").concat(groupKey) : groupKey;
        const isExpanded = expandAll != null ? expandAll : (_expandedGroupIds$has = expandedGroupIds === null || expandedGroupIds === void 0 ? void 0 : expandedGroupIds.has(id)) !== null && _expandedGroupIds$has !== void 0 ? _expandedGroupIds$has : false;
        const {
          childRows,
          childGroups,
          startRowIndex
        } = rows[groupKey];
        const groupRow = {
          id,
          parentId,
          groupKey,
          isExpanded,
          childRows,
          level,
          posInSet,
          startRowIndex,
          setSize: keys.length
        };
        flattenedRows.push(groupRow);
        allGroupRows.add(groupRow);
        if (isExpanded) {
          expandGroup(childGroups, id, level + 1);
        }
      });
    };
    expandGroup(groupedRows, undefined, 0);
    return [flattenedRows, isGroupRow];
    function isGroupRow(row) {
      return allGroupRows.has(row);
    }
  }, [expandedGroupIds, groupedRows, rawRows, expandAll]);
  const {
    totalRowHeight,
    gridTemplateRows,
    getRowTop,
    getRowHeight,
    findRowIdx
  } = (0, _react.useMemo)(() => {
    if (typeof rowHeight === "number") {
      return {
        totalRowHeight: rowHeight * rows.length,
        gridTemplateRows: pagination ? " repeat(".concat(paginationPageSize, ", ").concat(rowHeight, "px)") : " repeat(".concat(rows.length, ", ").concat(rowHeight, "px)"),
        getRowTop: rowIdx => rowIdx * rowHeight,
        getRowHeight: () => rowHeight,
        findRowIdx: offset => (0, _utils.floor)(offset / rowHeight)
      };
    }
    let totalRowHeight = 0;
    let gridTemplateRows = " ";
    // Calcule the height of all the rows upfront. This can cause performance issues
    // and we can consider using a similar approach as react-window
    // https://github.com/bvaughn/react-window/blob/b0a470cc264e9100afcaa1b78ed59d88f7914ad4/src/VariableSizeList.js#L68
    const rowPositions = rows.map(row => {
      const currentRowHeight = isGroupRow(row) ? rowHeight({
        type: "GROUP",
        row
      }) : rowHeight({
        type: "ROW",
        row
      });
      const position = {
        top: totalRowHeight,
        height: currentRowHeight
      };
      gridTemplateRows += "".concat(currentRowHeight, "px ");
      totalRowHeight += currentRowHeight;
      return position;
    });
    const validateRowIdx = rowIdx => {
      return (0, _utils.max)(0, (0, _utils.min)(rows.length - 1, rowIdx));
    };
    return {
      totalRowHeight,
      gridTemplateRows,
      getRowTop: rowIdx => rowPositions[validateRowIdx(rowIdx)].top,
      getRowHeight: rowIdx => rowPositions[validateRowIdx(rowIdx)].height,
      findRowIdx(offset) {
        let start = 0;
        let end = rowPositions.length - 1;
        while (start <= end) {
          const middle = start + (0, _utils.floor)((end - start) / 2);
          const currentOffset = rowPositions[middle].top;
          if (currentOffset === offset) return middle;
          if (currentOffset < offset) {
            start = middle + 1;
          } else if (currentOffset > offset) {
            end = middle - 1;
          }
          if (start > end) return end;
        }
        return 0;
      }
    };
  }, [isGroupRow, rowHeight, rows]);
  let rowOverscanStartIdx = 0;
  let rowOverscanEndIdx = rows.length - 1;
  if (enableVirtualization) {
    const overscanThreshold = 4;
    const rowVisibleStartIdx = 0;
    const rowVisibleEndIdx = findRowIdx(scrollTop + clientHeight);
    rowOverscanStartIdx = (0, _utils.max)(0, rowVisibleStartIdx - overscanThreshold);
    let numberOfRows = rows.length - (current - 1) * paginationPageSize >= paginationPageSize ? paginationPageSize - 1 : rows.length - (current - 1) * paginationPageSize - 1;
    rowOverscanEndIdx = (0, _utils.min)(pagination ? numberOfRows : rows.length - 1, rowVisibleEndIdx + overscanThreshold);
  }
  if (pagination) {
    let start = paginationPageSize * current - paginationPageSize;
    let end = paginationPageSize * current;
    return {
      rowOverscanStartIdx,
      rowOverscanEndIdx,
      rows: rows.slice(start, end),
      rowsCount: rows.slice(start, end).length - 1,
      totalRowHeight,
      gridTemplateRows,
      isGroupRow,
      getRowTop,
      getRowHeight,
      findRowIdx
    };
  } else {
    return {
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
    };
  }
}