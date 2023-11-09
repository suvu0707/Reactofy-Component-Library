"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SerialNumberColumn = exports.SelectColumn = exports.SERIAL_NUMBER_COLUMN_KEY = exports.SELECT_COLUMN_KEY = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _core = require("@linaria/core");
var _formatters = require("./formatters");
var _useRowSelection = require("./hooks/useRowSelection");
var _templateObject;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const SERIAL_NUMBER_COLUMN_KEY = "serial-number";
exports.SERIAL_NUMBER_COLUMN_KEY = SERIAL_NUMBER_COLUMN_KEY;
const SELECT_COLUMN_KEY = "select-row";
exports.SELECT_COLUMN_KEY = SELECT_COLUMN_KEY;
const headerCellClassName = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #16365d;\n  color: white;\n  font-weight: bold;\n"])));
function SelectFormatter(props) {
  const [isRowSelected, onRowSelectionChange] = (0, _useRowSelection.useRowSelection)();
  const [checked, setChecked] = (0, _react.useState)(false);
  console.log("isRowSe", checked);
  return /*#__PURE__*/_react.default.createElement(_formatters.SelectCellFormatter, {
    "aria-label": "Select",
    id: props.row.id,
    isCellSelected: props.isCellSelected,
    allRowsSelected: props.allRowsSelected,
    value: isRowSelected,
    onChange: (checked, isShiftClick) => {
      console.log("FFFF", checked);
      setChecked(checked);
      onRowSelectionChange({
        row: props.row,
        checked,
        isShiftClick
      });
    }
  });
}
function SelectGroupFormatter(props) {
  const [isRowSelected, onRowSelectionChange] = (0, _useRowSelection.useRowSelection)();
  return /*#__PURE__*/_react.default.createElement(_formatters.SelectCellFormatter, {
    "aria-label": "Select Group",
    isCellSelected: props.isCellSelected,
    value: isRowSelected,
    onChange: checked => {
      onRowSelectionChange({
        row: props.row,
        checked,
        isShiftClick: false
      });
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectColumn = {
  key: SELECT_COLUMN_KEY,
  name: "",
  width: 35,
  minWidth: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,
  filter: false,
  haveChildren: false,
  headerRenderer(props) {
    return /*#__PURE__*/_react.default.createElement(_formatters.SelectCellFormatter, {
      "aria-label": "Select All",
      isCellSelected: props.isCellSelected,
      value: props.allRowsSelected,
      onChange: props.onAllRowsSelectionChange
    });
  },
  cellRenderer(props) {
    return /*#__PURE__*/_react.default.createElement(SelectFormatter, props);
  },
  groupFormatter(props) {
    return /*#__PURE__*/_react.default.createElement(SelectGroupFormatter, props);
  }
};
exports.SelectColumn = SelectColumn;
const SerialNumberColumn = {
  key: SERIAL_NUMBER_COLUMN_KEY,
  name: "Sr. No.",
  field: "Sr. No.",
  width: 45,
  resizable: false,
  sortable: false,
  frozen: true,
  filter: false,
  haveChildren: false,
  headerRenderer: () => {
    return SerialNumberColumn.name;
  },
  cellClass: headerCellClassName,
  cellRenderer: props => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.column.rowIndex + 1, " ");
  }
};
exports.SerialNumberColumn = SerialNumberColumn;