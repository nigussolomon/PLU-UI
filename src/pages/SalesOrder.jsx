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
  const [addPutButt, setAddPutButt] = useState(false);
  const [headers, setHeaders] = useState({});

  const columns = [
    { field: "ItemCode", headerName: "Item Code", width: 150 },
    {
      field: "ItemName",
      headerName: "Item",
      width: 550,
      renderCell: (params) => {
        return (
          <div
            className="item"
            style={{
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
              wordWrap: "break-word",
              whiteSpace: "normal",
              paddingRight: "20px",
            }}
          >
            {params.row.GeneralSpec
              ? params.row.ItemName + params.row.GeneralSpec
              : params.row.ItemName}
          </div>
        );
      },
    },
    { field: "QuantityOrdered", headerName: "Quantity Ordered", width: 180 },
    { field: "UnitPrice", headerName: "Unit Price", width: 150 },
    { field: "TotalPrice", headerName: "Total Price", width: 150 },
  ];

  const columns2 = [
    { field: "so_ref", headerName: "Order Reference", width: 550 },
    { field: "so_created", headerName: "Date", width: 550 },
    { field: "status", headerName: "Status", width: 350 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        const handleActionClick = async (event) => {
          await event.stopPropagation();
          await setAddPutButt(true);
          await setCode(params.row.so_ref);
          fetchSOItems(params.row.so_ref);
        };
        return (
          <div
            className="actions"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              onClick={handleActionClick}
              disabled={loading}
              variant={
                params.row.status === "confirmed" ? "outlined" : "contained"
              }
              size="small"
              color={params.row.status === "confirmed" ? "success" : "primary"}
            >
              Details
            </Button>
            <div className="space" style={{ width: "15px" }}></div>
            <Button
              onClick={handleActionClick}
              disabled={loading}
              variant="contained"
              size="small"
              color="secondary"
            >
              SEND ORDER
            </Button>
          </div>
        );
      },
    },
  ];

  const handleDetailsClick = (params) => {
    setSelectedRow(params.row);
  };

  const fetchSOItems = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/so_items?po_login_code=${
          id ? id : code
        }&user_full_name=maveko_plu_module}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const rowsWithId = data["details"].map((row) => ({
        ...row,
        id: row.LineNumber,
      }));
      await setRows(rowsWithId);
      await setHeaders(data["header"]["__values__"]);
      setVisible("block");
      setLoading(false);
      setActions(false);
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
            Order Listing
          </Typography>
          <br />
          <div
            className="input"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <TextField
              variant="outlined"
              label="Order Number"
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
              onClick={() => {
                fetchSOItems(code);
              }}
              loading={loading}
              loadingPosition="start"
              style={{ marginLeft: "1%", paddingInline: "2%" }}
              startIcon={<GetAppIcon />}
              variant="contained"
            >
              CAPTURE ORDER
            </LoadingButton>
          </div>
        </div>
        <br />
        <div
          style={{
            height: "fit-content",
            width: "100%",
            display: visible === "none" ? "block" : "none",
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
        <div className="headerDetails">
          <div className="po" style={{ display: visible }}>
            <Divider />
            <h2 style={{ lineHeight: 0.5 }}>{headers.PONumber}</h2>
            <Divider />
            <br />
            <div
              className="data"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              {[
                { label: "From", value: headers.POSentByPersonCompany },
                {
                  label: "Final Delivery",
                  value:
                    headers.DeliveryDateToDestination +
                    " | " +
                    headers.DestinationDeliveryPlace,
                },
                { label: "Payment Terms", value: headers.PaymentTerms },
                { label: "Date of Order", value: headers.POSentDate },
                { label: "Requested By", value: headers.POSentByPerson },
                {
                  label: "For",
                  value:
                    headers.PODestinationName + " | " + headers.DocDeptName,
                },
              ].map((item, index) => (
                <h3
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: "20px",
                    paddingTop: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: "20px",
                    borderLeft: "2px solid #000",
                    paddingLeft: "10px",
                  }}
                >
                  {item.label}{" "}
                  <span style={{ fontSize: "15px", fontWeight: 400 }}>
                    {item.value}
                  </span>
                </h3>
              ))}
            </div>
            <br />
            <Divider />
            <br />
          </div>
        </div>
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
            <div className="space" style={{ width: "10px" }}></div>

            <Button
              onClick={() => {
                setVisible("none");
              }}
              disabled={actions}
              variant="contained"
              color="secondary"
              style={{ padding: ".6%", paddingInline: "3%" }}
            >
              INPUT ORDER INFORMATION
            </Button>
            <div className="space" style={{ width: "10px" }}></div>
            <Button
              onClick={() => {
                setVisible("none");
              }}
              disabled={actions}
              variant="contained"
              color="success"
              style={{ padding: ".6%", paddingInline: "3%" }}
            >
              COMPLETE DOCUMENT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
