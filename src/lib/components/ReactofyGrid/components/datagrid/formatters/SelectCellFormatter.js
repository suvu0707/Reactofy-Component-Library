import React from 'react';
import { useFocusRef } from "../hooks/useFocusRef"
import { useDefaultComponents } from "../DataGridDefaultComponentsProvider"

export function SelectCellFormatter({
  value,
  id,
  isCellSelected,
  allRowsSelected,
  disabled,
  onChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy
}) {
  const { ref, tabIndex } = useFocusRef(isCellSelected)
  const checkboxFormatter = useDefaultComponents().checkboxFormatter

  return (
    <div>
      {checkboxFormatter(
        {
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          tabIndex,
          id,
          disabled,
          
          checked: value,
          onChange
        },
        ref
      )}
    </div>
  )
}
