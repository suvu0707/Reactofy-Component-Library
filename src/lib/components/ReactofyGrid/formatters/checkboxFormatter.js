import React from 'react';
import {clsx} from "clsx"
import { css } from "@linaria/core"



export function checkboxFormatter({ allRowsSelected,id,value,onChange, ...props }, ref) {

  const checkboxLabel = css`
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex !important;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
`;

const checkboxLabelClassname = `rdg-checkbox-label ${checkboxLabel}`;

const checkboxInput = css`
  @layer rdg.CheckboxInput {
    all: unset;
  }
`;

 const checkboxInputClassname = `rdg-checkbox-input ${checkboxInput}`;

const checkbox = css`
  @layer rdg.CheckboxIcon {
    content: "";
    inline-size: 20px;
    block-size: 20px;
    border: 0.9998000264167786px solid #95b3d7;
    background-color: var(--rdg-background-color);
    height: 13px;
    width: 13px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
      height: 7px;
      width: 7px;
    }

    .${checkboxInput}:checked + & > div {
      background-color: var(--rdg-checkbox-color);

      /* outline: 3px solid var(--rdg-background-color);
      height: 8px;
      width: 8px; */
    }

    .${checkboxInput}:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
`;

const checkboxClassname = `rdg-checkbox ${checkbox}`;

const checkboxLabelDisabled = css`
  @layer rdg.CheckboxLabel {
    cursor: default;

    .${checkbox} {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
`;

const checkboxLabelDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;
  function handleChange(e) {
     console.log("target",e.target.checked)
    onChange(e.target.checked, e.nativeEvent.shiftKey)
  }
  console.log("checked", id !== undefined && id )

  const rowCheckboxTestId = `rowCheckBox${id}`;
  return (
    <label
      data-testid={`chkLebel${id}`}
      className={clsx(checkboxLabelClassname, {
        [checkboxLabelDisabledClassname]: props.disabled,
      })}
    >
      <input
        type="checkbox"
        ref={ref}
        checked={value}
        {...props}
        className={checkboxInputClassname}
        onChange={handleChange}
      />
      <div data-testid="rowCheckbox" className={checkboxClassname}>
        <div data-testid={rowCheckboxTestId}></div>
      </div>
    </label>
  );
}
