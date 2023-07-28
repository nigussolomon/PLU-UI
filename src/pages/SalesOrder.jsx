import React, { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import Divider from "@mui/material/Divider";
import { rows4 } from "../mock/Data";

export default function SalesOrder() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [actions, setActions] = useState(true);
  const [visible, setVisible] = useState("none");

  const columns = [
    { field: "ItemCode", headerName: "Item Code", width: 150 },
    { field: "ItemName", headerName: "Item Name", width: 250 },
    { field: "GeneralSpec", headerName: "General Spec", width: 250 },
    { field: "QuantityOrdered", headerName: "Quantity Ordered", width: 180 },
    { field: "UnitPrice", headerName: "Unit Price", width: 150 },
    { field: "TotalPrice", headerName: "Total Price", width: 150 },
  ];

  const columns2 = [
    { field: "so_ref", headerName: "Sales Order Reference", width: 550 },
    { field: "so_created", headerName: "Date", width: 550 },
    { field: "status", headerName: "Status", width: 350 },
    {
      field: "details",
      headerName: "Details",
      width: 250,
      renderCell: (params) => (
        <Button
          disabled={loading}
          variant={params.row.status === "Approved" ? "outlined" : "contained"}
          size="small"
          color={params.row.status === "Approved" ? "success" : "primary"}
        >
          Details
        </Button>
      ),
    },
  ];

  const handleDetailsClick = (params) => {
    setSelectedRow(params.row);
  };

  const handleCloseDialog = () => {
    setSelectedRow(null);
  };

  const fetchSOItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/so_items?po_login_code=${code}&user_full_name=maveko_plu_module}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        setLoading(false);
        setActions(false);
      }

      const data = await response.json();
      const rowsWithId = data.map((row) => ({ ...row, id: row.LineNumber }));
      setRows(rowsWithId);
      setVisible("block");
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setRows([]);
    }
  };

  return (
    <>
      <NavBar />
      <div className="head" style={{ margin: "4.5vw" }}>
        <div className="so">
          <Typography style={{ marginTop: "1.5%" }} variant="h4">
            Sales Order Listing
          </Typography>
          <br />
          <div
            className="input"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <TextField
              variant="outlined"
              label="Sales Order Number"
              style={{ width: "25%" }}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (e.target.value.length > 8) setDisabled(false);
                else setDisabled(true);
              }}
            />
            <LoadingButton
              disabled={disabled}
              onClick={fetchSOItems}
              loading={loading}
              loadingPosition="start"
              style={{ marginLeft: "1%", paddingInline: "2%" }}
              startIcon={<GetAppIcon />}
              variant="contained"
            >
              CAPTURE SO
            </LoadingButton>
          </div>
        </div>
        <br />
        <div style={{ height: "fit-content", width: "100%" }}>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#04184B",
                color: "white",
                cursor: "pointer",
                stroke: "white",
              },
            }}
            rows={rows4}
            columns={columns2}
            loading={loading}
            onRowClick={handleDetailsClick}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 3 },
              },
            }}
          />
        </div>
        <br />
        <div style={{ height: "fit-content", width: "100%", display: visible }}>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#04184B",
                color: "white",
                cursor: "pointer",
                stroke: "white",
              },
            }}
            rows={rows}
            columns={columns}
            loading={loading}
            onRowClick={handleDetailsClick}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 25]}
          />
          <br />
          <div
            className="actions"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={() => {
                setVisible("none");
              }}
              disabled={actions}
              variant="outlined"
              color="error"
              style={{ padding: ".6%", paddingInline: "3%" }}
            >
              Cancel
            </Button>
            <div className="space" style={{ width: "1%" }}></div>
            <Button
              onClick={() => {
                setVisible("none");
              }}
              disabled={actions}
              variant="contained"
              color="success"
              style={{ padding: ".6%", paddingInline: "3%" }}
            >
              Save Item
            </Button>
          </div>
        </div>
        <Dialog
          open={selectedRow !== null}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            {selectedRow && (
              <>
                <Typography variant="h4">Item Details</Typography>
                <Typography variant="h6">{selectedRow.ItemCode}</Typography>
                <Divider style={{ marginTop: "8px", marginBottom: "15px" }} />
                <Typography>Item Name: {selectedRow.ItemName}</Typography>
                <Typography>
                  Quantity Ordered: {selectedRow.QuantityOrdered}
                </Typography>
                <Typography>Unit Price: {selectedRow.UnitPrice}</Typography>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
