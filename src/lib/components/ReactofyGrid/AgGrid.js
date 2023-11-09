import React, { forwardRef } from "react";
import  DataGrid  from "./components/datagrid/DataGrid";
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
        },
        {
          field: "priority",
          headerName: "Priority",
        },
        {
          field: "issueType",
          headerName: "Issue Type",
        },
        {
          field: "complete",
          headerName: "% Complete",
        },
        {
          field: "startDate",
          headerName: "Start Date",
        },
        {
          field: "completeDate",
          headerName: "Expected Complete",
          width: 200,
        },
      ];

const rowDataa = [{id:1 , task:"task1", }]
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