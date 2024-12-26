import React, { memo, useEffect, useState } from "react";
import {clsx} from "clsx";
import { css } from "@linaria/core";

import {
  cell,
  cellFrozenLast,
  rowClassname,
  rowSelectedClassname,
} from "./style";
import { SELECT_COLUMN_KEY } from "./Columns";
import TreeCell from "./TreeCell";
import { RowSelectionProvider } from "./hooks";
import { getRowStyle } from "./utils";

const groupRow = css`
  @layer rdg.TreeRow {
    &:not([aria-selected="true"]) {
      background-color: var(--rdg-header-background-color);
    }

    > .${String(cell)}:not(:last-child):not(.${String(cellFrozenLast)}) {
      border-inline-end: none;
    }
  }
`;

const groupRowClassname = `rdg-group-row ${groupRow}`;

function TreeRow({
  id,
  groupKey,
  viewportColumns,
  rowIdx,
  row,
  level,
  gridRowStart,
  height,
  isExpanded,
  selectedCellIdx,
  isRowSelected,
  selectGroup,
  toggleTree,
  sourceData,
  rowArray,
  ...props
}) {
  // Select is always the first column
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;

  function handleSelectGroup() {
    selectGroup(rowIdx);
  }
   const [detectedLevel, setDetectedLevel] = useState()


    useEffect(() => {
      var detectedLevel;
      function recursiveChild(obj, level) {
        if (!obj.children) return;
        if (JSON.stringify(obj) === JSON.stringify(row)) {
          detectedLevel = level;
          return;
        }
        level = level + 1;
        obj.children?.map((childObj) => {
          if (JSON.stringify(childObj) === JSON.stringify(row)) {
            detectedLevel = level;
            return;
          }
          recursiveChild(childObj, level);
        });
      }
      sourceData?.map((data) => {
        let level = 0;
        if (data.children) {
          recursiveChild(data, level);
        }
      });
      console.log('sourceData', sourceData)
      console.log('detectedLevel', detectedLevel)
      setDetectedLevel(detectedLevel)
    }, [sourceData])
    


  return (
    <RowSelectionProvider value={isRowSelected}>
      <div
        key={`${rowIdx}`}
        role="row"
        aria-level={level}
        aria-expanded={isExpanded}
        className={clsx(
          rowClassname,
          groupRowClassname,
          `rdg-row-groupRow-${rowIdx % 2 === 0 ? "even" : "odd"}`,
          {
            [rowSelectedClassname]: selectedCellIdx === -1,
          }
        )}
        // onClick={handleSelectGroup
        style={getRowStyle(gridRowStart, height)}
        {...props}
      >
        {viewportColumns.map((column) => (
          <TreeCell
            key={`${column.key}`}
            id={id}
            // groupKey={groupKey}
            childRows={row.children}
            isExpanded={isExpanded}
            isCellSelected={selectedCellIdx === column.idx}
            column={column}
            row={row}
            groupColumnIndex={idx}
            toggleTree={toggleTree}
            level={detectedLevel}
          />
        ))}
      </div>
    </RowSelectionProvider>
  );
}

export default memo(TreeRow);
