import React, { forwardRef } from "react";
import  DataGrid  from "./ReactofyGrid/DataGrid";
// import './aggrid.css'
// import {DataGrid} from "../../lib/bundle"


function AgGrid(){
    const columns = [
        {
          field: "id",
          headerName: "ID",
          width: 80,
        },
        {
          field: "task",
          headerName: "Title",
          width: 190,

        },
        {
          field: "priority",
          headerName: "Priority",
          width: 200,

        },
        {
          field: "issueType",
          headerName: "Issue Type",
          width: 200,

        },
        {
          field: "complete",
          headerName: "% Complete",
          width: 200,

        },
        {
          field: "startDate",
          headerName: "Start Date",
          width: 200,

        },
        {
          field: "completeDate",
          headerName: "Expected Complete",
          width: 200,
        },
      ];

      const rowDataa = [
        { id: 1, task: "Task 1", priority: "High", issueType: "Bug", complete: 50, startDate: "2024-12-01", completeDate: "2024-12-10" },
        { id: 2, task: "Task 2", priority: "Medium", issueType: "Task", complete: 75, startDate: "2024-12-05", completeDate: "2024-12-12" },
        { id: 3, task: "Task 3", priority: "Low", issueType: "Feature", complete: 30, startDate: "2024-12-03", completeDate: "2024-12-15" },
        { id: 4, task: "Task 4", priority: "High", issueType: "Bug", complete: 90, startDate: "2024-12-07", completeDate: "2024-12-20" },
        { id: 5, task: "Task 5", priority: "Medium", issueType: "Task", complete: 60, startDate: "2024-12-09", completeDate: "2024-12-18" },
        { id: 6, task: "Task 6", priority: "Low", issueType: "Feature", complete: 20, startDate: "2024-12-11", completeDate: "2024-12-25" },
        { id: 7, task: "Task 7", priority: "High", issueType: "Bug", complete: 80, startDate: "2024-12-13", completeDate: "2024-12-22" },
        { id: 8, task: "Task 8", priority: "Medium", issueType: "Task", complete: 50, startDate: "2024-12-15", completeDate: "2024-12-30" },
        { id: 9, task: "Task 9", priority: "Low", issueType: "Feature", complete: 40, startDate: "2024-12-17", completeDate: "2024-12-28" },
        { id: 10, task: "Task 10", priority: "High", issueType: "Bug", complete: 95, startDate: "2024-12-19", completeDate: "2024-12-29" },
        { id: 11, task: "Task 11", priority: "Medium", issueType: "Task", complete: 70, startDate: "2024-12-21", completeDate: "2024-12-31" },
        { id: 12, task: "Task 12", priority: "Low", issueType: "Feature", complete: 10, startDate: "2024-12-23", completeDate: "2025-01-05" },
      ];
      return(
    <div>
        <DataGrid
        rowData={rowDataa}
        columnData={columns}
        headerRowHeight={24}
        />
    </div>
)
}
export default AgGrid;