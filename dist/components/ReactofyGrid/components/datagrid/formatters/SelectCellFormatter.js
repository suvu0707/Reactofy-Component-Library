"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectCellFormatter = SelectCellFormatter;
var _react = _interopRequireDefault(require("react"));
var _useFocusRef = require("../hooks/useFocusRef");
var _DataGridDefaultComponentsProvider = require("../DataGridDefaultComponentsProvider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SelectCellFormatter(_ref) {
  let {
    value,
    id,
    isCellSelected,
    allRowsSelected,
    disabled,
    onChange,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy
  } = _ref;
  const {
    ref,
    tabIndex
  } = (0, _useFocusRef.useFocusRef)(isCellSelected);
  const checkboxFormatter = (0, _DataGridDefaultComponentsProvider.useDefaultComponents)().checkboxFormatter;
  return /*#__PURE__*/_react.default.createElement("div", null, checkboxFormatter({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    tabIndex,
    id,
    disabled,
    checked: value,
    onChange
  }, ref));
}