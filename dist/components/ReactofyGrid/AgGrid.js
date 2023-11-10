"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataGrid = _interopRequireDefault(require("./components/datagrid/DataGrid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import './aggrid.css'
// import {DataGrid} from "../../lib/bundle"
function AgGrid() {
  const columns = [{
    field: "id",
    headerName: "ID",
    width: 80
  }, {
    field: "task",
    headerName: "Title"
  }, {
    field: "priority",
    headerName: "Priority"
  }, {
    field: "issueType",
    headerName: "Issue Type"
  }, {
    field: "complete",
    headerName: "% Complete"
  }, {
    field: "startDate",
    headerName: "Start Date"
  }, {
    field: "completeDate",
    headerName: "Expected Complete",
    width: 200
  }];
  const rowDataa = [{
    id: 1,
    task: "task1"
  }];
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_DataGrid.default, {
    rowData: rowDataa,
    columnData: columns,
    headerRowHeight: 24
  }));
}
var _default = exports.default = AgGrid;