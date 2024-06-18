import React, { useState, useEffect, useRef } from "react";
import VirtualizedList from "./VirtualizedList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ToolTip from "./ToolTip";

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [enableValidation, setEnableValidation] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [loadedOptions, setLoadedOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const containerRef = useRef(null);

  const modifiedOptions = options?.map((obj) => ({
    value: obj[valueKey],
    label: obj[labelKey],
  }));

  useEffect(() => {
    setLoadedOptions(modifiedOptions || []);
  }, [options]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen && selectedOptions.length === 0) {
      setEnableValidation(true);
    }
  };

  const handleOptionClick = (option) => {
    setIsToolTipOpen(false);
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  
    // Check if there are any selected options, if not, enable validation
    setEnableValidation(selectedOptions.length === 1 && selectedOptions[0] === option);
  };
  

  const handleClickOutside = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      event.target !== containerRef.current.previousSibling
    ) {
      setIsOpen(false);
      setSearchInput("");
    }
  };

  const filteredOptions = loadedOptions?.filter((option) =>
    option.label?.toLowerCase().startsWith(searchInput?.toLowerCase())
  );

  const optionsForMultiSelect =
    selectedOptions?.length > 0
      ? selectedOptions.map((item) => item.label).join(", ")
      : "Select an item";

  const contHeight = containerHeight || 200;
  const optHeight = optionHeight || 24;
  const totalOptionsHeight = Math.min(
    filteredOptions?.length * optHeight,
    contHeight
  );

  const toggleIconWidth = iconWidth || 24;

  const handleToolTipOpen = () => {
    if (!isOpen && selectedOptions.length === 0) {
      setIsToolTipOpen(true);
    } else {
      setIsToolTipOpen(false);
    }
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

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
          border: `1.5px solid ${enableValidation ? "red" : "blue"}`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: `${containerWidth - toggleIconWidth - 10}px`,
          }}
        >
          {optionsForMultiSelect}
        </div>
        <div onClick={toggleDropdown} style={{ cursor: "pointer" }}>
          <ArrowDropDownIcon
                  onClick={toggleDropdown}
            style={{
              transform: !isOpen ? "rotate(0deg)" : "rotate(180deg)",
              fill: "white",
              background: "blue",
              stroke: "blue",
              height: "100%",
              position: "absolute",
              width: toggleIconWidth,
              right: 0,
              bottom: 0,
              borderRadius: "0 3px 3px 0",
            }}
          />
        </div>
        {isToolTipOpen && <ToolTip stopPropagation={stopPropagation} />}
      </div>

      {isOpen && (
        <div
          className="combobox-dropdown"
          style={{ position: "absolute", zIndex: 9999 }}
        >
          <VirtualizedList
            multiSelect={multiSelect}
            items={filteredOptions}
            selectedOptions={selectedOptions}
            optionHeight={optHeight}
            containerWidth={containerWidth || 145}
            containerHeight={totalOptionsHeight}
            handleOptionClick={handleOptionClick}
            search={search}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
      )}
    </div>
  );
}

export default Combobox;
