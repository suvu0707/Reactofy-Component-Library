"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridDefaultComponentsProvider = void 0;
exports.useDefaultComponents = useDefaultComponents;
var _react = require("react");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataGridDefaultComponentsContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const DataGridDefaultComponentsProvider = DataGridDefaultComponentsContext.Provider;
exports.DataGridDefaultComponentsProvider = DataGridDefaultComponentsProvider;
function useDefaultComponents() {
  return (0, _react.useContext)(DataGridDefaultComponentsContext);
}