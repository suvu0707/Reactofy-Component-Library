import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export function ToolTip() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const tooltipRef = useRef(null);

  const handleButtonClick = (event) => {
    setButtonRect(event.target.getBoundingClientRect());
    if (isOpen === false) {
      setIsOpen(true);
    } else if (isOpen === true) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef]);

  // Calculate the left position of the tooltip based on the buttonRect and viewport width
  const left = buttonRect && buttonRect.left + window.pageXOffset;
  const tooltipWidth = 200;

  console.log("viewportWidth", tooltipRef, tooltipWidth);
  const tooltipLeft = left + tooltipWidth > 300 ? left - tooltipWidth : left;

  return (
    <div>
      {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      {/* <button onMouseOver={handleButtonClick}>Click Here</button> */}
      {isOpen
        ? ReactDOM.createPortal(
            <div
              ref={tooltipRef}
              style={{
                position: "absolute",
                zIndex: 1300,
                top: buttonRect.top + buttonRect.height,
                left: tooltipLeft,
                // background:"white",
                // padding:"4px",
                // // width:"178px",
                // boxSizing:"border-box",
                // borderRadious:"4px"
              }}
              className="popover"
            >
              <div
               style={{
                width: "200px",

                padding: "10px 10px",
                background: "white",
                borderRadius: "6px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              >
                Please Select Combobox Value
              </div>
            </div>,

            document.body
          )
        : null}
    </div>
  );
}
