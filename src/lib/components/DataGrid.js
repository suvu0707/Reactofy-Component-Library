import React, { useEffect, useRef, useState } from "react";
import "./Table.css"; // Create this CSS file for styling

function DataGrid({
  rowData,
  rowHeight,
  containerWidth,
  containerHeight,
  children,
  getVisibleRowData
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / rowHeight);
  
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / rowHeight),
    rowData.length
  );
  const visibleItems = rowData.slice(startIndex, endIndex);
  const invisibleItemsHeight = (startIndex + visibleItems.length - endIndex) * rowHeight;
  const containerRef = useRef(null);

  const handleScroll = (event) => {
    setScrollTop(event.target.scrollTop);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

useEffect(()=>{
  getVisibleRowData && getVisibleRowData(visibleItems, startIndex);

},[visibleItems && startIndex && scrollTop])
  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerHeight}px`,
        width: `${containerWidth}px`,
        overflowY: "auto",
        background: "white",
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${rowData.length * rowHeight}px` }}>
        {children}
      </div>
      <div style={{ height: `${invisibleItemsHeight}px` }} />
    </div>
  );
}

export default DataGrid;
