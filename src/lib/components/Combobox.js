import React, { useState, useEffect, useRef } from "react";
import VirtualizedList from "./VirtualizedList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReactDOM from "react-dom";
function Combobox({
  options,
  valueKey,
  labelKey,
  multiSelect,
  search,
  containerHeight,
  optionHeight,
  containerWidth,
  getSelectedOptions,
  iconWidth,
}) {
  const [isOpen, setIsOpen] = useState();
  const [checked, setChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [loadedOptions, setLoadedOptions] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State
  const containerRef = useRef(null);
  const isMounted = useRef(true);

  const modifiedOptions = options?.map((obj) => {
    return { value: obj[valueKey], label: obj[labelKey] };
  });

  useEffect(() => {
    setLoadedOptions(modifiedOptions ? modifiedOptions : []);

    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  getSelectedOptions &&
    getSelectedOptions(
      selectedOptions.length > 0 ? selectedOptions : selectedOption
    );
  const handleOptionClick = (option) => {
    setSearchInput("");
    setIsToolTipOpen(false);
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      // setSelectedOption( option);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    setSearchInput("");
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      event.target !== containerRef.current.previousSibling
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    const cleanup = () => {
      if (isMounted.current) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      cleanup();
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  const filteredOptions = loadedOptions.filter((option) =>
    option.label?.toLowerCase().startsWith(searchInput?.toLowerCase())
  );
  const optionsForMultiSelect =
    selectedOptions.length > 0
      ? selectedOptions.map((item) => item.label).join(", ")
      : "Select an item";
  console.log("optionsForMultiSelect", isOpen , selectedOptions.length );
  const optionsForSingleSelect = selectedOption
    ? selectedOption.label
    : "Select an item";

  const contHeight = containerHeight ? containerHeight : 200;
  const optHeight = optionHeight ? optionHeight : 24;
  let totalOptionsHeight;
  if (
    filteredOptions.length * optHeight < contHeight &&
    filteredOptions.length > 0
  ) {
    totalOptionsHeight = filteredOptions.length * optHeight;
  } else if (filteredOptions.length === 0) {
    totalOptionsHeight = optHeight;
  } else {
    totalOptionsHeight = contHeight;
  }
  console.log("filteredOptions", contHeight, optHeight, totalOptionsHeight);

  const onHandleClick = () => {
    setIsOpen(!isOpen);
  };
  const toggleIconWidth = iconWidth ? iconWidth : 24;


  const handleToolTipOpen = () => {
    if (isOpen === false && selectedOptions.length === 0) {
      setIsToolTipOpen(true);
    }  
    else{
      setIsToolTipOpen(false);
    }
  };
  
  // Calculate the left position of the tooltip based on the buttonRect and viewport width

  return (
    <div
      ref={containerRef}
      className={`large-combobox ${isOpen ? "open" : ""}`}
      style={{ cursor: "pointer", width: "max-content" }}
      role="combobox"
      onMouseEnter={handleToolTipOpen}
      onMouseLeave={() => setIsToolTipOpen(false)}
    >
      <div
        className="combobox-header"
        onClick={toggleDropdown}
        style={{
          width: `${containerWidth ? containerWidth : 145}px`,
          border: `1px solid ${isToolTipOpen ? "red" : "blue"}`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white",
          boxSizing: "border-box",
        }}
      >
        {search && (
          <input
            style={{
              width: `${containerWidth - 24}px`,
              position: "absolute",
              boxSizing: "border-box",
              top: "0px",
              zIndex: isOpen ? 1 : -1,
            }}
            placeholder="Search Your Item"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        )}
        {/* {multiSelect ? optionsForMultiSelect : optionsForSingleSelect} */}
        {/* {multiSelect && <input
                type="checkbox"
                checked={checked}
                onChange={e=>setChecked(!checked)}
              />
             } */}
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: `${containerWidth - toggleIconWidth}px`,
          }}
        >
          {optionsForMultiSelect}
        </div>
        <div onClick={onHandleClick} style={{ cursor: "pointer" }}>
          <ArrowDropDownIcon
            style={{
              transform: isOpen === false ? "rotate(0deg)" : "rotate(180deg)",
              fill: "white",
              background: "blue",
              stroke: "blue",
              height: "100%",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          />
        </div>
      </div>
      {isToolTipOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 9999,
            width: "200px",
            padding: "10px 10px",
            background: "white",
            borderRadius: "6px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Please Select Combobox Value
        </div>
      )}
      {isOpen && (
        <div style={{ position: "absolute", zIndex: 9999 }}>
          <VirtualizedList
            multiSelect={multiSelect}
            checked={checked}
            items={filteredOptions}
            selectedOptions={selectedOptions}
            optionHeight={optHeight}
            containerWidth={containerWidth ? containerWidth : 145}
            containerHeight={totalOptionsHeight}
            handleOptionClick={handleOptionClick}
          />
        </div>
      )}
    </div>
  );
}

export default Combobox;
