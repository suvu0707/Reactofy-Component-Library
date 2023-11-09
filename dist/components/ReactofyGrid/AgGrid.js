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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var _default = AgGrid;
exports.default = _default;