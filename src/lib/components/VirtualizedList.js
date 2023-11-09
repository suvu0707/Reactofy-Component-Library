import React, { useState, useEffect, useRef } from "react";

function VirtualizedList({
  multiSelect,
  items,
  selectedOptions,
  optionHeight,
  containerWidth,
  containerHeight,
  handleOptionClick,
  checked
}) {
  
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / optionHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / optionHeight),
    items.length
  );
  const visibleItems = items.slice(startIndex, endIndex);
  const invisibleItemsHeight =
    (startIndex + visibleItems.length - endIndex) * optionHeight;
  const containerRef = useRef(null);

  const handleScroll = (event) => {
    setScrollTop(event.target.scrollTop);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

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
      <div style={{ height: `${items.length * optionHeight}px` }}>
        <div
          style={{
            position: "relative",
            height: `${visibleItems.length * optionHeight}px`,
            top: `${startIndex * optionHeight}px`,
          }}
        >
          {visibleItems.map((item) => (
            <div
              key={item.value}
              style={{
                height: `${optionHeight}px`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",  
              }}
              onClick={() => handleOptionClick(item)} 
            >
             {multiSelect && <input
                type="checkbox"
                checked={selectedOptions.includes(item)}
              />
             }
              {item.label}
            </div>
          ))}
        </div>
        <div style={{ height: `${invisibleItemsHeight}px` }} />
      </div>
    </div>
  );
}


export default VirtualizedList;
