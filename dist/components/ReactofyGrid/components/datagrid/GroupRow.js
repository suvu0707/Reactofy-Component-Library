"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _clsx = require("clsx");
var _core = require("@linaria/core");
var _style = require("./style");
var _Columns = require("./Columns");
var _GroupCell = _interopRequireDefault(require("./GroupCell"));
var _hooks = require("./hooks");
var _utils = require("./utils");
const _excluded = ["id", "groupKey", "viewportColumns", "childRows", "rowIdx", "row", "gridRowStart", "height", "level", "isExpanded", "selectedCellIdx", "isRowSelected", "selectGroup", "toggleGroup"];
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const groupRow = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.GroupedRow {\n    &:not([aria-selected=\"true\"]) {\n      background-color: var(--rdg-header-background-color);\n    }\n\n    > .", ":not(:last-child):not(.", ") {\n      border-inline-end: none;\n    }\n  }\n"])), _style.cell, _style.cellFrozenLast);
const groupRowClassname = "rdg-group-row ".concat(groupRow);
function GroupedRow(_ref) {
  let {
      id,
      groupKey,
      viewportColumns,
      childRows,
      rowIdx,
      row,
      gridRowStart,
      height,
      level,
      isExpanded,
      selectedCellIdx,
      isRowSelected,
      selectGroup,
      toggleGroup
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  // Select is always the first column
  const idx = viewportColumns[0].key === _Columns.SELECT_COLUMN_KEY ? level + 1 : level;
  function handleSelectGroup() {
    selectGroup(rowIdx);
  }
  return /*#__PURE__*/_react.default.createElement(_hooks.RowSelectionProvider, {
    value: isRowSelected
  }, /*#__PURE__*/_react.default.createElement("div", _extends({
    key: "".concat(rowIdx),
    role: "row",
    "aria-level": level,
    "aria-expanded": isExpanded,
    className: (0, _clsx.clsx)(_style.rowClassname, groupRowClassname, "rdg-row-groupRow-".concat(rowIdx % 2 === 0 ? "even" : "odd"), {
      [_style.rowSelectedClassname]: selectedCellIdx === -1
    }),
    onClick: handleSelectGroup,
    style: (0, _utils.getRowStyle)(gridRowStart, height)
  }, props), viewportColumns.map(column => /*#__PURE__*/_react.default.createElement(_GroupCell.default, {
    key: "".concat(column.key),
    id: id,
    groupKey: groupKey,
    childRows: childRows,
    isExpanded: isExpanded,
    isCellSelected: selectedCellIdx === column.idx,
    column: column,
    row: row,
    groupColumnIndex: idx,
    toggleGroup: toggleGroup
  }))));
}
var _default = /*#__PURE__*/(0, _react.memo)(GroupedRow);
exports.default = _default;