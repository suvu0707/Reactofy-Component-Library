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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const SERIAL_NUMBER_COLUMN_KEY = exports.SERIAL_NUMBER_COLUMN_KEY = "serial-number";
const SELECT_COLUMN_KEY = exports.SELECT_COLUMN_KEY = "select-row";
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
const SelectColumn = exports.SelectColumn = {
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
const SerialNumberColumn = exports.SerialNumberColumn = {
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