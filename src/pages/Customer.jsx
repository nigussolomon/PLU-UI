import React from "react";
import NavBar from "../components/NavBar.jsx";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { rows2 } from "../mock/Data";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "item_code", headerName: "Item Code", width: 160 },
  { field: "item_description", headerName: "Item Description", width: 280 },
  { field: "dimensions", headerName: "Dimensions", width: 210 },
  { field: "price_per_pc", headerName: "Price Per PC", width: 190 },
  { field: "base_unit", headerName: "Base Unit", width: 120 },
  { field: "target_unit", headerName: "Target Unit", width: 120 },
  { field: "currency", headerName: "Currency", width: 120 },
  {
    field: "supplier_document_id",
    headerName: "Supplier Document ID",
    width: 200,
  },
  { field: "created_at", headerName: "Created At", width: 200 },
  { field: "updated_at", headerName: "Updated At", width: 200 },
];

export default function Customer() {
  return (
    <div style={{margin: "3.5vw", width: "95vw"}}>
      <NavBar></NavBar>
      <Typography style={{ margin: "1%" }} variant="h4">
        Customer Price List
      </Typography>
      <div
        className="filters"
        style={{
          margin: "1%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="fields"
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            style={{ width: "24%" }}
            label="Search"
            variant="outlined"
          />
        </div>
        <div className="action" style={{ width: "10%" }}></div>
      </div>
      <div
        style={{
          height: "fit-content",
          width: "98%",
          margin: "1%",
        }}
      >
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#04184B",
              color: "white",
              cursor: "pointer",
              stroke: "white",
            },
          }}
          rows={rows2}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
        />
      </div>
    </div>
  );
}
