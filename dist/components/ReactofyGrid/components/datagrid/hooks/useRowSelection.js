"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowSelectionProvider = exports.RowSelectionChangeProvider = void 0;
exports.useRowSelection = useRowSelection;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const RowSelectionContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const RowSelectionProvider = RowSelectionContext.Provider;
exports.RowSelectionProvider = RowSelectionProvider;
const RowSelectionChangeContext = /*#__PURE__*/(0, _react.createContext)(undefined); // eslint-disable-next-line @typescript-eslint/no-explicit-any

const RowSelectionChangeProvider = RowSelectionChangeContext.Provider;
exports.RowSelectionChangeProvider = RowSelectionChangeProvider;
function useRowSelection() {
  const rowSelectionContext = (0, _react.useContext)(RowSelectionContext);
  const rowSelectionChangeContext = (0, _react.useContext)(RowSelectionChangeContext);
  if (rowSelectionContext === undefined || rowSelectionChangeContext === undefined) {
    throw new Error("useRowSelection must be used within DataGrid cells");
  }
  return [rowSelectionContext, rowSelectionChangeContext];
}