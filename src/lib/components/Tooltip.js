import React from "react";

function ToolTip({stopPropagation}) {
 
  return (
    <div
      role="ValidationTooltip"
      style={{
        position: "absolute",
        zIndex: 9999,
        top: "20px",
        fontSize: "14px",
        width: "max-content",
        padding: "5px 10px",
        background: "white",
        // borderRadius: "6px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
      onClick={stopPropagation}
    >
      Please Select Combobox Value
    </div>
  );
}

export default ToolTip;
