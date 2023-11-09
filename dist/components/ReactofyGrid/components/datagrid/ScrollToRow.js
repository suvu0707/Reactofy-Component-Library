"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ScrollToRow;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _DataGrid = _interopRequireDefault(require("./components/datagrid/DataGrid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const columns = [{
  key: 'id',
  name: 'ID'
}, {
  key: 'title',
  name: 'Title'
}, {
  key: 'count',
  name: 'Count'
}];
function ScrollToRow(_ref) {
  let {
    direction
  } = _ref;
  const [rows] = (0, _react.useState)(() => {
    const rows = [];
    for (let i = 0; i < 1000; i++) {
      rows.push({
        id: i,
        title: "Title ".concat(i),
        count: i * 1000
      });
    }
    return rows;
  });
  const [value, setValue] = (0, _react.useState)(10);
  const gridRef = (0, _react.useRef)(null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBlockEnd: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginInlineEnd: 5
    }
  }, "Row index: "), /*#__PURE__*/React.createElement("input", {
    style: {
      inlineSize: 50
    },
    type: "number",
    value: value,
    onChange: event => setValue(event.target.valueAsNumber)
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => gridRef.current.scrollToRow(value)
  }, "Scroll to row")), /*#__PURE__*/React.createElement(_DataGrid.default, {
    ref: gridRef,
    columnData: columns,
    rowData: rows,
    direction: direction
  }));
}