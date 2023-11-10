"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSVContent = CSVContent;
exports.exportToCsv = exportToCsv;
exports.exportToPdf = exportToPdf;
exports.exportToXlsx = exportToXlsx;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url-search-params.js");
var _react = _interopRequireDefault(require("react"));
var FileSaver = _interopRequireWildcard(require("file-saver"));
var XLSX = _interopRequireWildcard(require("xlsx"));
var _jspdf = _interopRequireDefault(require("jspdf"));
var _jspdfAutotable = _interopRequireDefault(require("jspdf-autotable"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function CSVContent(fileData, columns) {
  const field = columns === null || columns === void 0 ? void 0 : columns.map(ele => ele.field);
  const header = columns === null || columns === void 0 ? void 0 : columns.map(ele => ele.headerName);
  const data = fileData.map(f => {
    let sample = [];
    field.map(d => {
      if (d !== undefined) {
        sample.push(f[d]);
      } else {
        sample.push("");
      }
    });
    if (sample.length > 0) {
      return sample;
    }
  });
  const content = [header, ...data].map(cells => cells.map(serialiseCellValue).join(",")).join("\n");
  return content;
}
async function exportToCsv(fileData, columns, fileName) {
  downloadFile(fileName, new Blob([CSVContent(fileData, columns)], {
    type: "text/csv;charset=utf-8;"
  }));
}
async function exportToPdf(fileData, columns, fileName) {
  let field = [];
  columns === null || columns === void 0 || columns.map(ele => {
    if (ele.field) {
      field.push({
        dataKey: ele.field,
        header: ele.headerName
      });
    }
  });
  let doc = new _jspdf.default("p", "pt", "letter");
  const response = (0, _jspdfAutotable.default)(doc, {
    margin: {
      top: 10
    },
    styles: {
      cellWidth: "wrap",
      overflow: "visible",
      halign: "center",
      lineColor: "white",
      lineWidth: 0.5,
      fontSize: 11
    },
    alternateRowStyles: {
      fillColor: "#e5edf8"
    },
    bodyStyles: {
      fillColor: "#f3f8fc"
    },
    headStyles: {
      fillColor: "#16365D",
      textColor: "white",
      halign: "center",
      lineColor: "White",
      lineWidth: 0.5,
      fontSize: 11
    },
    body: fileData,
    theme: "striped",
    columns: field
  });
  doc.save(fileName);
}
function exportToXlsx(fileData, columns, fileName) {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const ws = XLSX.utils.json_to_sheet(fileData);
  const wb = {
    Sheets: {
      data: ws
    },
    SheetNames: ["data"]
  };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array"
  });
  const data = new Blob([excelBuffer], {
    type: fileType
  });
  FileSaver.saveAs(data, fileName + fileExtension);
}
function serialiseCellValue(value) {
  if (typeof value === "string") {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(",") ? "\"".concat(formattedValue, "\"") : formattedValue;
  }
  return value;
}
function downloadFile(fileName, data) {
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}