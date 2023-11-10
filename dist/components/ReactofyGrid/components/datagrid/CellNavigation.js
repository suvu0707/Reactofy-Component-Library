"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CellNavigation;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _DataGrid = _interopRequireDefault(require("./components/datagrid/DataGrid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const columns = [{
  key: 'id',
  name: 'ID',
  width: 80
}, {
  key: 'task',
  name: 'Title'
}, {
  key: 'priority',
  name: 'Priority'
}, {
  key: 'issueType',
  name: 'Issue Type'
}, {
  key: 'complete',
  name: '% Complete'
}, {
  key: 'startDate',
  name: 'Start Date'
}, {
  key: 'completeDate',
  name: 'Expected Complete',
  width: 200
}];
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}
function createRows() {
  const rows = [];
  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: "Task ".concat(i),
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 3 + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor(Math.random() * 3 + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
    });
  }
  return rows;
}
function CellNavigation(_ref) {
  let {
    direction
  } = _ref;
  const [rows] = (0, _react.useState)(createRows);
  const [cellNavigationMode, setCellNavigationMode] = (0, _react.useState)('CHANGE_ROW');
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginBlockEnd: 5
    }
  }, "Cell Navigation Modes:", /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "mode",
    checked: cellNavigationMode === 'NONE',
    onChange: () => setCellNavigationMode('NONE')
  }), "None"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "mode",
    checked: cellNavigationMode === 'CHANGE_ROW',
    onChange: () => setCellNavigationMode('CHANGE_ROW')
  }), "Change Row"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "mode",
    checked: cellNavigationMode === 'LOOP_OVER_ROW',
    onChange: () => setCellNavigationMode('LOOP_OVER_ROW')
  }), "Loop Over Row")), /*#__PURE__*/_react.default.createElement(_DataGrid.default, {
    columnData: columns,
    rowData: rows,
    cellNavigationMode: cellNavigationMode,
    direction: direction
  }));
}