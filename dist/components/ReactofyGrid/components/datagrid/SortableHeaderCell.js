"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SortableHeaderCell;
var _DataGridDefaultComponentsProvider = require("./DataGridDefaultComponentsProvider");
var _react = _interopRequireDefault(require("react"));
var _hooks = require("./hooks");
var _core = require("@linaria/core");
var _templateObject, _templateObject2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const headerSortCell = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.SortableHeaderCell {\n    cursor: pointer;\n    padding:2px;\n\n    &:focus {\n      outline: none;\n    }\n  }\n"])));

// gridTemplateColumns: "`100%/Object.keys(subData.children).length` ".repeat(
//   Object.keys(subData.children).length
// ),

const headerSortCellClassname = "rdg-header-sort-cell ".concat(headerSortCell);
const headerSortName = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.SortableHeaderCellName {\n    flex-grow: 1;\n    overflow: hidden;\n    overflow: clip;\n    text-overflow: ellipsis;\n  }\n"])));
const headerSortNameClassname = "rdg-header-sort-name ".concat(headerSortName);
function SortableHeaderCell(_ref) {
  let {
    onSort,
    selectedPositionIdx,
    subCellIdx,
    sortDirection,
    priority,
    children,
    isCellSelected,
    column,
    borderBottom
  } = _ref;
  const sortStatus = (0, _DataGridDefaultComponentsProvider.useDefaultComponents)().sortStatus;
  var {
    ref,
    tabIndex
  } = (0, _hooks.useFocusRef)(isCellSelected);
  function handleKeyDown(event) {
    if (event.key === " " || event.key === "Enter") {
      // stop propagation to prevent scrolling
      event.preventDefault();
      onSort(event.ctrlKey || event.metaKey, children);
    }
  }
  function handleClick(event) {
    onSort(event.ctrlKey || event.metaKey, children);
  }
  return /*#__PURE__*/_react.default.createElement("span", {
    ref: ref,
    tabIndex: tabIndex,
    className: headerSortCellClassname,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: headerSortNameClassname
  }, children), selectedPositionIdx === subCellIdx && /*#__PURE__*/_react.default.createElement("span", null, sortStatus({
    sortDirection,
    priority
  })));
}