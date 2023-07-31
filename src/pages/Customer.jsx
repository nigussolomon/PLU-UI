import React from "react";
import NavBar from "../components/NavBar.jsx";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

export default function Customer() {
  const [row, setRow] = React.useState([])
  React.useEffect(() => {
    fetch("http://0.0.0.0:3000/items")
      .then((res) => res.json())
      .then((data) => {
        setRow(data["data2"]);
      });
  }, []);

  function isNowOrWithinThreeDays(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);
    const differenceInMs = Math.abs(targetDate - now);
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    return differenceInMs <= threeDaysInMs;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "item_code", headerName: "Item Code", width: 110 },
    { field: "item_name", headerName: "Item Name", width: 110 },
    { field: "decor_code", headerName: "Decor Code", width: 110 },
    { field: "item_description", headerName: "Item Description", width: 580 },
    {
      field: "dimensions",
      headerName: "Dimensions",
      width: 110,
      renderCell: (params) => {
        return (
          <div>
            {params.row.dimension.length +
              "x" +
              params.row.dimension.width +
              "x" +
              params.row.dimension.height}
          </div>
        );
      },
    },
    { field: "tax_class", headerName: "Tax Class", width: 110 },
    { field: "weight", headerName: "Weight", width: 110 },

    {
      field: "old selling price",
      headerName: "Old Selling Price",
      width: 150,
      renderCell: (params) => {
        return (
          <div>{params.row.main_item_pricing.pricing.old_retail_price}</div>
        );
      },
    },

    {
      field: "selling price",
      headerName: "Selling Price",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "60%",
              height: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              boxShadow: isNowOrWithinThreeDays(
                params.row.main_item_pricing.pricing.updated_at
              )
                ? "0px 0px 10px rgba(0, 0, 0, 0.25)"
                : "",
              background: isNowOrWithinThreeDays(
                params.row.main_item_pricing.pricing.updated_at
              )
                ? "red"
                : "",
              color: isNowOrWithinThreeDays(
                params.row.main_item_pricing.pricing.updated_at
              )
                ? "white"
                : "",
              fontWeight: isNowOrWithinThreeDays(
                params.row.main_item_pricing.pricing.updated_at
              )
                ? 900
                : "normal",
            }}
          >
            {params.row.main_item_pricing.pricing.new_retail_price}
          </div>
        );
      },
    },

    {
      field: "valid_from",
      headerName: "Valid From",
      width: 120,
      valueGetter: (params) =>
        formatDate(
          params.row.main_item_pricing.pricing.new_retail_price_valid_from
        ),
    },

    {
      field: "valid_to",
      headerName: "Valid To",
      width: 120,
      valueGetter: (params) =>
        formatDate(
          params.row.main_item_pricing.pricing.new_retail_price_valid_to
        ),
    },

  ];
  return (
    <div style={{ margin: "3.5vw", width: "95vw" }}>
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
          rows={row}
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
