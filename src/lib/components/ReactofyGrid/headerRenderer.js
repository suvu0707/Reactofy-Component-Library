import React, { useState } from "react";
import { css } from "@linaria/core";
import { useRovingCellRef } from "./hooks";
import FilterRenderer from "./FilterRenderer";
import SortableHeaderCell from "./SortableHeaderCell";

import { FilterRendererWithSvg } from "./FilterRendererWithSvg";

const filterClassname = css`
  display: flex;
  grid-gap: 10px;
  grid-template-columns: auto auto;
  padding: 2px;
  font-size: 18px;
  inline-size: 100%;
  cursor: pointer;
`;

const headerWrapperWithChildData = css`
  display: flex;
  align-items: center;
  height: inherit;
  justify-content: center;
  border-inline-end: 1px solid var(--rdg-border-color);
`;

const headerWrapperWithcellData = css`
  display: flex;
  box-sizing: border-box;
`;
export default function headerRenderer({
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
  gridWidth,
}) {
  if (column.haveChildren === true) {
    return (
      <div>
        <div
          style={{
            borderBlockEnd: "1px solid var(--rdg-border-color)",
            height: `${headerRowHeight}px`,
          }}
        >
          <div className={headerWrapperWithChildData}>
            {column.headerName ?? column.field}
          </div>
        </div>

        <div className={headerWrapperWithcellData}>
          {/* rome-ignore lint/complexity/useOptionalChain: <explanation> */}
          {column.children !== undefined &&
            column.children.map((info, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {RecursiveScan(
                    column.children,
                    info,
                    cellHeight,
                    index,
                    headerRowHeight,
                    selectedPosition,
                    selectedCellHeaderStyle,
                    column,
                    selectCell,
                    shouldFocusGrid,

                    onSort,
                    sortDirection,
                    priority,
                    setFilters,
                    arrayDepth,
                    ChildColumnSetup,
                    selectedCellIdx,

                    setFilterType,
                    gridWidth
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    var isCellSelected;
    if (selectedCellIdx === column.idx) {
      isCellSelected = true;
    } else {
      isCellSelected = false;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { onFocus } = useRovingCellRef(isCellSelected);
    ChildColumnSetup(column);
    var style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "inherit",
      width: column.width ?? "100%",
    };
    selectedCellHeaderStyle && selectedPosition.idx === column.idx
      ? (style = { ...style, ...selectedCellHeaderStyle })
      : style;
    function onClick() {
      selectCell(column.idx);
    }
    function onDoubleClick(event) {
      const { right, left } = event.currentTarget.getBoundingClientRect();
      const offset = isRtl ? event.clientX - left : right - event.clientX;

      if (offset > 11) {
        // +1px to account for the border size
        return;
      }

      onColumnResize(column, "max-content");
    }

    function handleFocus(event) {
      onFocus?.(event);
      if (shouldFocusGrid) {
        // Select the first header cell if there is no selected cell
        selectCell(0);
      }
    }

 

    // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
if  (!column.sortable && !column.filter) {
      return (
        // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
          key={column.idx}
          role="columnheader"
          aria-selected={isCellSelected}
          style={{
            height: `${cellHeight}px`,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
          onFocus={handleFocus}
          onClick={onClick}
          onDoubleClick={column.resizable ? onDoubleClick : undefined}
          // onPointerDown={column.resizable ? onPointerDown : undefined}
        >
          <div style={{ ...style }}>{column.headerName ?? column.field}</div>
        </div>
      );
    }
    if (column.sortable && !column.filter) {
      return (
        <div
          key={column.idx}
          role="columnheader"
          aria-selected={isCellSelected}
          style={{
            height: `${cellHeight}px`,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
          onFocus={handleFocus}
          onClick={onClick}
          onDoubleClick={column.resizable ? onDoubleClick : undefined}
        >
          <div style={{ ...style }}>
            <SortableHeaderCell
              onSort={onSort}
              sortDirection={sortDirection}
              priority={priority}
              isCellSelected={isCellSelected}
              column={column}
              borderBottom={"none"}
            >
              {column.headerName ?? column.field}
            </SortableHeaderCell>
          </div>
        </div>
      );
    }
    if (column.filter && !column.sortable) {
      var style11 = {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      };
      selectedCellHeaderStyle && selectedPosition.idx === column.idx
        ? (style11 = { ...style11, ...selectedCellHeaderStyle })
        : style11;



      return (
        <div
          role="columnheader"
          aria-selected={isCellSelected}
          style={{ ...style11 }}
          key={column.idx}
          onClick={onClick}
        >
          <FilterRenderer
            selectedCellHeaderStyle={selectedCellHeaderStyle}
            selectedPosition={selectedCellHeaderStyle}
            onFocus={handleFocus}
            onClick={onClick}
            column={column}
            onDoubleClick={column.resizable ? onDoubleClick : undefined}
            isCellSelected={isCellSelected}
          >
            {({ filters, ...rest }) =>
              FilterRendererWithSvg(
                column,

                filterClassname,
                filters,
                setFilters,
                setFilterType,
                gridWidth
              )
            }
          </FilterRenderer>
        </div>
      );
    }
    if (column.filter && column.sortable) {
      var styleSF = {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      };
      selectedCellHeaderStyle && selectedPosition.idx === column.idx
        ? (styleSF = { ...styleSF, ...selectedCellHeaderStyle })
        : styleSF;

    
      return (
        <div
          key={column.idx}
          role="columnheader"
          aria-selected={isCellSelected}
          onFocus={handleFocus}
          onClick={onClick}
          onDoubleClick={column.resizable ? onDoubleClick : undefined}
          style={{ ...styleSF }}
        >
          <SortableHeaderCell
            onSort={onSort}
            sortDirection={sortDirection}
            priority={priority}
            isCellSelected={isCellSelected}
          >
            {column.headerName ?? column.field}
          </SortableHeaderCell>
          <FilterRenderer column={column} isCellSelected={isCellSelected}>
            {({ filters, ...rest }) =>
              FilterRendererWithSvg(
                column,

                filterClassname,
                filters,
                setFilters,
                setFilterType,
                gridWidth
              )
            }
          </FilterRenderer>
        </div>
      );
    }
  }
}
// useMemo(() => expensiveCalculation(count), [count]);

var columnsList = [];

const RecursiveScan = (
  masterData,
  subData,
  cellHeight,
  index,
  headerRowHeight,
  selectedPosition,
  selectedCellHeaderStyle,
  column,
  selectCell,
  shouldFocusGrid,

  onSort,
  sortDirection,
  priority,
  setFilters,
  arrayDepth,
  ChildColumnSetup,
  selectedCellIdx,

  setFilterType,
  gridWidth,
  direction
) => {
  var cellHeight = cellHeight - headerRowHeight;
  ChildColumnSetup(subData);

  if (subData.haveChildren === true) {
    return (
      <div style={{ textAlign: "center" }}>
        {
          <div
            style={{
              borderBlockEnd: "1px solid var(--rdg-border-color)",
              height: `${headerRowHeight}px`,
            }}
          >
            <div className={headerWrapperWithChildData}>
              {subData.headerName ?? subData.field}
            </div>
          </div>
        }
        <div className={headerWrapperWithcellData}>
          {subData.children.map((subInfo, index) => {
            var style = {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            };

            return (
              <div style={{ ...style }}>
                {RecursiveScan(
                  subData.children,
                  subInfo,
                  cellHeight,
                  index,
                  headerRowHeight,
                  selectedPosition,
                  selectedCellHeaderStyle,
                  column,
                  selectCell,
                  shouldFocusGrid,

                  onSort,
                  sortDirection,
                  priority,
                  setFilters,
                  arrayDepth,
                  ChildColumnSetup,
                  selectedCellIdx,

                  setFilterType,
                  gridWidth
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    var isCellSelected;
    if (selectedCellIdx === subData.idx) {
      isCellSelected = true;
    } else {
      isCellSelected = false;
    }
    const { onFocus } = useRovingCellRef(isCellSelected);
    columnsList.includes(subData.name) ? null : columnsList.push(subData.name);
    var style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderInlineEnd: "1px solid var(--rdg-border-color)",
      width: subData.width,
      boxSizing: "border-box",
      height: `${cellHeight}px`,
      outline:
        selectedCellIdx === subData.idx
          ? "1px solid var(--rdg-selection-color)"
          : "none",
      outlineOffset: selectedCellIdx === subData.idx ? "-1px" : "0px",
    };
    selectedCellHeaderStyle && selectedPosition.idx === subData.idx
      ? (style = { ...style, ...selectedCellHeaderStyle })
      : style;

    function onClick() {
      selectCell(subData.idx);
    }

    const isRtl = direction === "rtl";

    function onDoubleClick(event) {
      const { right, left } = event.currentTarget.getBoundingClientRect();
      const offset = isRtl ? event.clientX - left : right - event.clientX;

      if (offset > 11) {
        // +1px to account for the border size
        return;
      }

      onColumnResize(subData, "max-content");
    }

    function handleFocus(event) {
      onFocus?.(event);
      if (shouldFocusGrid) {
        // Select the first header cell if there is no selected cell
        selectCell(0);
      }
    }


    if (!subData.sortable && !subData.filter)
      return (
        // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <>
          <div
            key={subData.idx}
            role="columnheader"
            aria-selected={isCellSelected}
            aria-colindex={`${column.index + 1}.${
              columnsList.indexOf(subData.name) + 1
            }`}
            aria-selected={selectedCellIdx === subData.idx}
            style={{ ...style }}
            // onFocus={handleFocus}
            onClick={onClick}
            onDoubleClick={column.resizable ? onDoubleClick : undefined}
            // onPointerDown={column.resizable ? onPointerDown : undefined}
          >
            {subData.headerName ?? subData.field}
          </div>
        </>
      );
    if (subData.sortable && !subData.filter)
      return (
        // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          key={subData.idx}
          role="columnheader"
          aria-selected={isCellSelected}
          style={{ ...style }}
          // onFocus={handleFocus}
          onClick={onClick}
          onDoubleClick={subData.resizable ? onDoubleClick : undefined}
          // onPointerDown={column.resizable ? onPointerDown : undefined}
        >
          <SortableHeaderCell
            onSort={onSort}
            selectedPositionIdx={selectedPosition.idx}
            subCellIdx={subData.idx}
            sortDirection={sortDirection}
            priority={priority}
            isCellSelected={isCellSelected}
          >
            {subData.headerName ?? subData.field}
          </SortableHeaderCell>
        </div>
      );
    if (subData.filter && !subData.sortable) {
      var style1 = {
        display: "flex",
        justifyContent: "center",
        borderRight: "1px solid var(--rdg-border-color)",
        width: subData.width,
        alignItems: "center",
        height: `${cellHeight}px`,
        boxSizing: "border-box",
        outline:
          selectedCellIdx === subData.idx
            ? "1px solid var(--rdg-selection-color)"
            : "none",
        outlineOffset: selectedCellIdx === subData.idx ? "-1px" : "0px",
      };

      selectedCellHeaderStyle && selectedPosition.idx === subData.idx
        ? (style1 = { ...style1, ...selectedCellHeaderStyle })
        : style1;

      function onClickFilter() {
        selectCell(subData.idx);
      }

   

      return (
        <div
          key={subData.idx}
          role="columnheader"
          aria-selected={isCellSelected}
          onClick={onClickFilter}
          onDoubleClick={subData.resizable ? onDoubleClick : undefined}
          style={{ ...style1 }}
        >
          <FilterRenderer column={subData} isCellSelected={isCellSelected}>
            {({ filters, ...rest }) =>
              FilterRendererWithSvg(
                subData,
                filterClassname,
                filters,
                setFilters,
                setFilterType,
                gridWidth
              )
            }
          </FilterRenderer>
        </div>
      );
    }
    if (subData.filter && subData.sortable) {
      var style1 = {
        display: "flex",
        justifyContent: "center",
        borderRight: "1px solid var(--rdg-border-color)",
        width: subData.width,
        alignItems: "center",
        height: `${cellHeight}px`,
        boxSizing: "border-box",
        outline:
          selectedCellIdx === subData.idx
            ? "1px solid var(--rdg-selection-color)"
            : "none",
        outlineOffset: selectedCellIdx === subData.idx ? "-1px" : "0px",
      };

      selectedCellHeaderStyle && selectedPosition.idx === subData.idx
        ? (style1 = { ...style1, ...selectedCellHeaderStyle })
        : style1;

      function onClickFilter() {
        selectCell(subData.idx);
      }



      return (
        // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          key={subData.idx}
          role="columnheader"
          aria-selected={isCellSelected}
          style={{ ...style1 }}
          // onFocus={handleFocus}
          onClick={onClickFilter}
          onDoubleClick={column.resizable ? onDoubleClick : undefined}
          // onPointerDown={column.resizable ? onPointerDown : undefined}
        >
          <SortableHeaderCell
            onSort={onSort}
            selectedPositionIdx={selectedPosition.idx}
            subCellIdx={subData.idx}
            sortDirection={sortDirection}
            priority={priority}
            isCellSelected={isCellSelected}
          >
            {subData.headerName ?? subData.field}
          </SortableHeaderCell>
          <FilterRenderer column={subData} isCellSelected={isCellSelected}>
            {({ filters, ...rest }) =>
              FilterRendererWithSvg(
                subData,

                filterClassname,
                filters,
                setFilters,
                setFilterType,
                gridWidth
              )
            }
          </FilterRenderer>
        </div>
      );
    }
  }
};

function inputStopPropagation(event) {
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.stopPropagation();
  }
}
