import React, { useState, useEffect, useRef } from "react";

function VirtualizedList({
  multiSelect,
  items,
  selectedOptions,
  optionHeight,
  containerWidth,
  containerHeight,
  handleOptionClick,
  search,
  searchInput,
  setSearchInput,
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / optionHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / optionHeight),
    items.length
  );
  const visibleItems = items.slice(startIndex, endIndex);
  const invisibleItemsHeight = (items.length - visibleItems.length) * optionHeight;
  const containerRef = useRef(null);

  const handleScroll = (event) => {
    setScrollTop(event.target.scrollTop);
  };

  return (
    <div className="virtualized-list">
      {search && (
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #000",
            backgroundColor: "#f3f3ff",
          }}
        >
          <input
            style={{ width: "85%", height: "24px" }}
            placeholder="Search Your Item"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      )}
      {visibleItems.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: `${40}px`,
            width: `${containerWidth}px`,
            color: "grey",
          }}
        >
          No option found
        </div>
      ) : (
        <div
          ref={containerRef}
          style={{
            height: `${containerHeight}px`,
            width: `${containerWidth}px`,
            overflowY: "auto",
            background: "white",
            boxSizing: "border-box",
          }}
          onScroll={handleScroll}
        >
          <div style={{ height: `${items.length * optionHeight}px`, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: `${startIndex * optionHeight}px`,
                width: "100%",
              }}
            >
              {visibleItems.map((item) => (
                <div
                  key={item.value}
                  className="virtualized-list-item"
                  style={{
                    height: `${optionHeight}px`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #ccc",
                  }}
                  onClick={() => handleOptionClick(item)}
                >
                  {multiSelect && (
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(item)}
                      style={{ cursor: "pointer" }}
                      readOnly
                    />
                  )}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VirtualizedList;
