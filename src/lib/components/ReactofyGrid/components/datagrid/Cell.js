import React, { memo, useState, useRef } from "react";
import { css } from "@linaria/core";

import { getCellStyle, getCellClassname, isCellEditable } from "./utils";
import { useRovingCellRef } from "./hooks/useRovingCellRef";
import { useDrag, useDrop } from "react-dnd";
import moment from "moment";
import {
  bottomRowIsSelectedClassName,
  rowIsSelectedClassName,
  topRowIsSelectedClassName,
} from "./style";
const cellCopied = css`
  @layer rdg.Cell {
    background-color: #ccccff;
  }
`;

const cellCopiedClassname = `rdg-cell-copied ${cellCopied}`;

const cellDraggedOver = css`
  @layer rdg.Cell {
    background-color: #ccccff;

    &.${cellCopied} {
      background-color: #9999ff;
    }
  }
`;

const cellDraggedOverClassname = `rdg-cell-dragged-over ${cellDraggedOver}`;

const rowCellFreezeClassname = css`
  @layer rdg.rowCell {
    position: sticky;
    z-index: 2;
    background: dark blue;
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
`;
const freezeCol = css`
  @layer rdg.rowFridge {
    z-index: 3;
  }
`;
const freezedLastRowClassName = css`
  @layer rdg.freezedLastRowShadow {
    box-shadow: 0 calc(2px * var(--rdg-sign)) 5px -2px rgba(136, 136, 136, 0.5);
  }
`;

function Cell({
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
  summaryRowHeight,
  ...props
}) {
  const gridCell = useRef(null);
  const cellRendererParams =
    typeof column?.cellRendererParams === "function"
      ? column?.cellRendererParams()
      : column?.cellRendererParams;
  const [value, setValue] = useState(
    cellRendererParams?.value ?? row[column.key]
  );
  const {  tabIndex, onFocus } = useRovingCellRef(isCellSelected);

  const { cellClass } = column;
  const topRow = rowIndex === 0 && isRowSelected ? true : false;
  const bottomRow =
    rowIndex === allrow.length - 1 && isRowSelected ? true : false;
  const middleRow = !(topRow || bottomRow) && isRowSelected ? true : false;
  const className = getCellClassname(
    column,
    `rdg-cell-column-${column.idx % 2 === 0 ? "even" : "odd"}`,
    {
      [cellCopiedClassname]: isCopied,
      [cellDraggedOverClassname]: isDraggedOver,
      [rowIsSelectedClassName]: middleRow,
      [topRowIsSelectedClassName]: topRow,
      [bottomRowIsSelectedClassName]: bottomRow,
      [rowCellFreezeClassname]: rowIndex <= rowFreezLastIndex,
      [freezeCol]: column.frozen === true && rowIndex <= rowFreezLastIndex,
      [freezedLastRowClassName]: rowIndex === rowFreezLastIndex,
    },
    typeof cellClass === "function" ? cellClass(row) : cellClass
  );

  function handleClick(e) {
    // selectCellWrapper(column.editorOptions?.editOnClick);
    onRowClick?.({
      api: api,
      data: row,
      columnApi: columnApi,
      node: node,
      rowIndex: rowIndex,
      type: "rowClicked",
      event: e,
    });
    onCellClick?.({
      api: api,
      colDef: {
        field: column.field,
        resizable: column.resizable ?? undefined,
        sortable: column.sortable ?? undefined,
        width: column.width,
      },
      data: row,
      node: node,
      columnApi: columnApi,
      rowIndex: rowIndex,
      value: row[column.field] ?? undefined,
      type: "cellClicked",
      event: e,
    });
  }

  function handleContextMenu(e) {
    selectCellWrapper();
    onCellContextMenu?.({
      api: api,
      colDef: {
        field: column.field,
        resizable: column.resizable ?? undefined,
        sortable: column.sortable ?? undefined,
        width: column.width,
      },
      data: row,
      node: node,
      columnApi: columnApi,
      rowIndex: rowIndex,
      value: row[column.field] ?? undefined,
      type: "cellContextMenu",
      event: e,
    });
  }

  function handleDoubleClick(e) {
    // selectCellWrapper(true);
    onRowDoubleClick?.({
      api: api,
      data: row,
      columnApi: columnApi,
      node: node,
      rowIndex: rowIndex,
      type: "rowDoubleClicked",
      event: e,
    });
    onCellDoubleClick?.({
      api: api,
      colDef: {
        field: column.field,
        resizable: column.resizable ?? undefined,
        sortable: column.sortable ?? undefined,
        width: column.width,
      },
      data: row,
      node: node,
      columnApi: columnApi,
      rowIndex: rowIndex,
      value: row[column.field] ?? undefined,
      type: "cellDoubleClicked",
      event: e,
    });
  }

  function handleRowChange(newRow) {
    onRowChange(column, newRow);
  }

  // -----------

  let style = {
    ...getCellStyle(column, colSpan, row),
    "--rdg-summary-row-top": `${
      headerheight + summaryRowHeight + rowIndex * 24
    }px`,
  };
  style =
    column.haveChildren === true
      ? { ...style, ...{ borderInlineEnd: "none" } }
      : { ...style };
  style =
    column.idx === 0 && isRowSelected
      ? { ...style, ...{ borderInlineStart: "1px solid #9bbb59" } }
      : { ...style };
  style =
    column.idx === totalColumns - 1 && isRowSelected
      ? { ...style, ...{ borderInlineEnd: "1px solid #9bbb59" } }
      : { ...style };
  const rowSpan = column.rowSpan?.({ type: "ROW", row }) ?? undefined;

  if (column.validation) {
    const validationStyle = column.validation.style
      ? column.validation.style
      : { backgroundColor: "red" };
    if (column.validation.method(row[column.key])) {
      style = {
        ...style,
        ...validationStyle,
      };
    }
  }

  if (column.alignment) {
    function alignmentUtils() {
      let styles = style;
      let symbol = ["£", "$", "₹", "€", "¥", "₣", "¢"];
      if (
        column.alignment.type?.toLowerCase() === "date" ||
        moment(row[column.key], "YYYY-MM-DD", true).isValid() ||
        moment(row[column.key], "YYYY/MM/DD", true).isValid() ||
        moment(row[column.key], "YYYY-DD-MM", true).isValid() ||
        moment(row[column.key], "YYYY/DD/MM", true).isValid() ||
        moment(row[column.key], "MM-DD-YYYY", true).isValid() ||
        moment(row[column.key], "MM/DD/YYYY", true).isValid() ||
        moment(row[column.key], "MM-YYYY-DD", true).isValid() ||
        moment(row[column.key], "MM/YYYY/DD", true).isValid() ||
        moment(row[column.key], "DD-MM-YYYY", true).isValid() ||
        moment(row[column.key], "DD/MM/YYYY", true).isValid() ||
        moment(row[column.key], "DD-YYYY-MM", true).isValid() ||
        moment(row[column.key], "DD/YYYY/MM", true).isValid() ||
        moment(row[column.key], "DD-MMM-YYYY", true).isValid() ||
        moment(row[column.key], "DD/MMM/YYYY", true).isValid() ||
        moment(row[column.key], "DD-YYYY-MMM", true).isValid() ||
        moment(row[column.key], "DD/YYYY/MMM", true).isValid() ||
        moment(row[column.key], "MMM-DD-YYYY", true).isValid() ||
        moment(row[column.key], "MMM/DD/YYYY", true).isValid() ||
        moment(row[column.key], "MMM-YYYY-DD", true).isValid() ||
        moment(row[column.key], "MMM/YYYY/DD", true).isValid() ||
        moment(row[column.key], "YYYY-MMM-DD", true).isValid() ||
        moment(row[column.key], "YYYY/MMM/DD", true).isValid() ||
        moment(row[column.key], "YYYY-DD-MMM", true).isValid() ||
        moment(row[column.key], "YYYY/DD/MMM", true).isValid() ||
        JSON.stringify(row[column.key]).split("/").length === 3 ||
        JSON.stringify(row[column.key]).split("-").length === 3
      ) {
        const alignmentStyle = column.alignment.align
          ? { textAlign: column.alignment.align }
          : {
              textAlign: "end",
              paddingRight: "6px",
              paddingLeft: "6px",
            };
        styles = {
          ...styles,
          ...alignmentStyle,
        };
        return styles;
      } else if (
        column.alignment.type?.toLowerCase() === "time" ||
        moment(row[column.key], "hh:mm", true).isValid() ||
        moment(row[column.key], "hh:mm:ss", true).isValid() ||
        moment(row[column.key], "hh:mm:ss a", true).isValid() ||
        moment(row[column.key], "hh:mm a", true).isValid() ||
        JSON.stringify(row[column.key]).split(":").length > 1
      ) {
        const alignment = column.alignment.align
          ? { textAlign: column.alignment.align }
          : { textAlign: "end", paddingRight: "6px", paddingLeft: "6px" };
        styles = {
          ...styles,
          ...alignment,
        };
        return styles;
      } else if (
        column.alignment.type?.toLowerCase() === "datetime" ||
        (JSON.stringify(row[column.key]).split(":").length > 1 &&
          (JSON.stringify(row[column.key]).split("/").length === 3 ||
            JSON.stringify(row[column.key]).split("-").length === 3))
      ) {
        const alignment = column.alignment.align
          ? {
              textAlign: column.alignment.align,
              paddingRight: "6px",
              paddingLeft: "6px",
            }
          : { textAlign: "end", paddingRight: "6px", paddingLeft: "6px" };
        styles = {
          ...styles,
          ...alignment,
        };
        return styles;
      } else if (
        column.alignment.type?.toLowerCase() === "number" ||
        (typeof row[column.key] === "number" &&
          column.alignment.type !== "currency")
      ) {
        const alignment = column.alignment.align
          ? { textAlign: column.alignment.align }
          : { textAlign: "end" };
        styles = {
          ...styles,
          ...alignment,
        };
        return styles;
      } else if (
        column.alignment.type?.toLowerCase() === "currency" ||
        symbol.includes(JSON.stringify(row[column.key])[1]) ||
        symbol.includes(JSON.stringify(row[column.key])[row[column.key].length])
      ) {
        const alignment = column.alignment.align
          ? { textAlign: column.alignment.align }
          : { textAlign: "end" };
        styles = {
          ...styles,
          ...alignment,
        };
        return styles;
      } else if (
        column.alignment.type?.toLowerCase() === "string" ||
        column.alignment.type?.toLowerCase() === "text" ||
        typeof row[column.ley] === "string"
      ) {
        const alignment = column.alignment.align
          ? { textAlign: column.alignment.align }
          : { textAlign: "start" };
        styles = {
          ...styles,
          ...alignment,
        };
        return styles;
      } else {
        const alignment = column.alignment.align
          ? { textAlign: column.alignment.align }
          : { textAlign: "center" };
        styles = { ...styles, ...alignment };
        return styles;
      }
    }
    style = column.alignment.align
      ? { ...style, textAlign: column.alignment.align }
      : alignmentUtils({ column, row, style });
  }
  /// -----------------------
  if (valueChangedCellStyle) {
    if (previousData[rowIndex]?.includes(column.key)) {
      style = {
        ...style,
        backgroundColor:
          valueChangedCellStyle.backgroundColor ?? style.backgroundColor,
        color: valueChangedCellStyle.color ?? style.color,
      };
    }
  }

  const [{ isDragging }, drag] = useDrag({
    type: "ROW_DRAG",
    item: { index: rowIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  function onRowReorder(fromIndex, toIndex) {
    const newRows = [...allrow];
    newRows.splice(toIndex, 0, newRows.splice(fromIndex, 1)[0]);
    handleReorderRow(newRows);
  }
  const [{ isOver }, drop] = useDrop({
    accept: "ROW_DRAG",
    drop({ index }) {
      onRowReorder(index, rowIndex);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      // role="gridcell"
      aria-colindex={column.idx + 1}
      data-testid="rowCell"
      aria-colspan={colSpan}
      aria-rowspan={rowSpan}
      aria-readonly={!isCellEditable(column, row) || undefined}
      ref={gridCell}
      tabIndex={tabIndex}
      className={className}
      style={style}
      // onClick={handleClick}
      // onDoubleClick={handleDoubleClick}
      onFocus={onFocus}
      {...props}
    >
      {!column.rowGroup && (
        <>
          {column.rowDrag && (
            <div
              ref={(ele) => {
                drag(ele);
                drop(ele);
              }}
            >
              <span style={{ marginRight: "10px", cursor: "grab" }}>
                &#9674;
              </span>
              {column.cellRenderer({
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
                onRowClick: onRowClick, columnApi, onCellClick, onCellDoubleClick,
                selectCell,
                onRowDoubleClick,
                subColumn,
                value: value,
                valueFormatted: cellRendererParams?.valueFormatted,
                fullWidth: cellRendererParams?.fullWidth,
                eGridCell: gridCell.current,
                refreshCell: () => {
                  const content = document.getElementById(
                    `${rowIndex}${row[column.key]}`
                  ).innerHTML;
                  document.getElementById(
                    `${rowIndex}${row[column.key]}`
                  ).innerHTML = content;
                },
                getValue: () => value,
                setValue: (newValue) => {
                  setValue(newValue);
                },
                ...cellRendererParams,
              })}
            </div>
          )}
          {!column.rowDrag &&
            column.cellRenderer({
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
              onRowClick: onRowClick, columnApi, onCellClick, onCellDoubleClick,
              onRowDoubleClick,
              subColumn,
              value: value,
              valueFormatted: cellRendererParams?.valueFormatted,
              fullWidth: cellRendererParams?.fullWidth,
              eGridCell: gridCell.current,
              refreshCell: () => {
                const content = document.getElementById(
                  `${rowIndex}${row[column.key]}`
                ).innerHTML;
                document.getElementById(
                  `${rowIndex}${row[column.key]}`
                ).innerHTML = content;
              },
              getValue: () => value,
              setValue: (newValue) => {
                setValue(newValue);
              },
              ...cellRendererParams,
            })}
          {dragHandle}
        </>
      )}
    </div>
  );
}

export default memo(Cell);
