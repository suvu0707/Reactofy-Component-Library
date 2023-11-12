import React, { useState, useEffect, useRef } from "react";
import VirtualizedList from "./VirtualizedList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loadedOptions, setLoadedOptions] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State
  const containerRef = useRef(null);
  const isMounted = useRef(true);

  const modifiedOptions=options?.map((obj)=>{
    return {value:obj[valueKey],label:obj[labelKey]}
  })

  useEffect(() => {
    setLoadedOptions(modifiedOptions ? modifiedOptions : []);

    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(true);
  };
  getSelectedOptions &&
    getSelectedOptions(
      selectedOptions.length > 0 ? selectedOptions : selectedOption
    );
  const handleOptionClick = (option) => {
    setSearchInput("");
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([ option]);
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
console.log("ww",4)
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
      console.log("optionsForMultiSelect",optionsForMultiSelect)
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

  const onHandleClick=()=>{
    setIsOpen(!isOpen)
  }

  return (
    <div
      ref={containerRef}
      className={`large-combobox ${isOpen ? "open" : ""}`}
      style={{ cursor: "pointer", width: "max-content" }}
      role= "combobox"
    >
      <div
        className="combobox-header"
        onClick={toggleDropdown}
        style={{
          width: `${containerWidth ? containerWidth : 145}px`,
          border: "1px solid red",
          background: "white",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position:"relative",
          textOverflow: "ellipsis",
          boxSizing: "border-box",
        }}
      >
         {search && (
            <input
              style={{ width: "112px",position:"absolute",top:"0px",zIndex:isOpen ? 1: -1 }}
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
        {optionsForMultiSelect }
      
      
        <ArrowDropDownIcon
           
            style={{ transform: isOpen === false ? "rotate(0deg)" : "rotate(180deg)", fill: "black",background:"red", stroke: "blue", height: "100%",position:"absolute",right:0 }}
        />
    
       
        
      </div>
      {isOpen && (
        <div style={{position: "absolute",  zIndex: 9999}}>
         

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
