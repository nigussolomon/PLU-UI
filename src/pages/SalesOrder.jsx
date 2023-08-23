import React, { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import Divider from "@mui/material/Divider";
import { rows4 } from "../mock/Data";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SalesOrder() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [actions, setActions] = useState(true);
  const [visible, setVisible] = useState("none");
  const [headers, setHeaders] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [value, setValue] = React.useState("1");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [rp, setRp] = React.useState("p1");
  const [cp, setCp] = React.useState("p1");
  const [title, setTitle] = React.useState("");
  const [titleFocus, setTitleFocus] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [newDis, setNewDis] = React.useState(false)

  function parseDateForMuiDatePicker(dateString) {
    const dateParts = dateString.split("-");
    const day = parseInt(dateParts[0], 10);
    const month = dateParts[1];
    const year = parseInt(dateParts[2], 10);
    return new Date(`${month} ${day}, ${year}`);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    { field: "UOM", headerName: "Ordered Unit", width: 180 },
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
          await setCode(params.row.so_ref);
          setActions(false);
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
            rows={data}
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
                setOpenForm(true);
              }}
              disabled={actions}
              variant="contained"
              color="secondary"
              style={{ padding: ".6%", paddingInline: "3%", display: data.length === 0 ? "block" : "none" }}
            >
              INPUT ORDER INFORMATION
            </Button>
            <Button
              onClick={() => {
                setNewDis(true)
                setOpenForm(true);
              }}
              disabled={actions}
              variant="contained"
              color="secondary"
              style={{ padding: ".6%", paddingInline: "3%", display: data.length === 0 ? "none" : "block" }}
            >
              ORDER INFORMATION
            </Button>
            <div className="space" style={{ width: "10px" }}></div>
            <Button
              onClick={() => {
                setOpenForm(true);
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
      <Dialog
        scroll="body"
        open={openForm}
        onClose={() => {
          setOpenForm(false);
        }}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        sx={{
          width: "100%",
          minWidth: "100vh",
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div
            className="titleHead"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="title">
              <h1 style={{ lineHeight: 0.5 }}>Order Information</h1>
            </div>
            <div className="action">
              <TextField
                disabled
                select
                value={"type1"}
                focused
                style={{
                  width: "450px",
                }}
                variant="outlined"
                label="Recipient Type"
              >
                <MenuItem key="type1" value="type1">
                  {"Customer"}
                </MenuItem>
              </TextField>
            </div>
          </div>
        </DialogTitle>
        <DialogContent dividers={true}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="DOC HEADERS" value="1" />
              <Tab label="MAVEKO DETAILS" value="2" />
              <Tab label="AES - CUSTOMS" value="3" />
            </TabList>

            <TabPanel value="1">
              <div className="headersInfo">
                <h2 style={{ lineHeight: 0.5 }}>Customer Information</h2>
                <Divider></Divider>
                <br />
                <div
                  className="customerInfo"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "450px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    focused
                    value={headers.POSentByPersonCompany}
                    variant="outlined"
                    label="Customer"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    focused={titleFocus}
                    value={headers.PODescription}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTitleFocus(true);
                    }}
                    style={{
                      width: "300px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Title"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "350px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    focused
                    value={headers.POSentByPersonCompany}
                    variant="outlined"
                    label="Name"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    select
                    focused
                    value={cp}
                    style={{
                      width: "480px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    onChange={(e) => setCp(e.target.value)}
                    variant="outlined"
                    label="Contact Person"
                  >
                    <MenuItem key="p1" value="p1">
                      {"Hana Gebeyehu"}
                    </MenuItem>
                    <MenuItem key="p2" value="p2">
                      {"Nigus Solomon"}
                    </MenuItem>
                    <MenuItem key="p3" value="p3">
                      {"Eyosias Mekbib"}
                    </MenuItem>
                  </TextField>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "350px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    focused
                    value={headers.SentInvoiceAddress3}
                    label="Street"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "180px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    focused
                    value={headers.SentInvoiceAddress2}
                    variant="outlined"
                    label="City"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "580px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    focused
                    value={
                      headers.SentInvoiceAddress5 +
                      " | " +
                      headers.SentInvoiceAddress4 +
                      " | " +
                      headers.SentInvoiceAddress6
                    }
                  ></TextField>
                </div>
                <br />

                <h2 style={{ lineHeight: 0.5 }}>Document Information</h2>
                <Divider></Divider>
                <br />
                <div
                  className="customerInfo"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    disabled={newDis}
                    select
                    focused
                    value={rp}
                    style={{
                      width: "480px",
                      marginBottom: "20px",
                      marginTop: "8px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Reciepent Person"
                  >
                    <MenuItem key="p1" value="p1">
                      {"Hana Gebeyehu"}
                    </MenuItem>
                  </TextField>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        disabled={newDis}
                        focused
                        defaultValue={dayjs(headers.POSentDate)}
                        sx={{
                          width: "350px",
                          marginRight: "20px",
                        }}
                        label="Reference Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        disabled={newDis}
                        focused
                        defaultValue={dayjs(headers.DeliveryDateToDestination)}
                        sx={{
                          width: "350px",
                          marginRight: "20px",
                        }}
                        label="Delivery Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        disabled={newDis}
                        focused
                        defaultValue={dayjs(headers.POSentDate)}
                        sx={{
                          width: "350px",
                          marginRight: "20px",
                        }}
                        label="Curr Value"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "280px",
                      marginBottom: "20px",
                      marginTop: "8px",
                      marginRight: "20px",
                    }}
                    focused
                    value={headers.PaymentTerms}
                    variant="outlined"
                    label="Terms"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    label="Process Matchcode"
                    style={{
                      width: "280px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    value={headers.PONumber}
                    focused
                  ></TextField>
                </div>

                <br />

                <h2 style={{ lineHeight: 0.5 }}>Delivery Information</h2>
                <Divider></Divider>
                <br />
                <div
                  className="customerInfo"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    disabled={newDis}
                    value={headers.DeliveryAddress1}
                    focused
                    style={{
                      width: "580px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Delivery Address"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    focused={titleFocus}
                    value={headers.PODescription}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTitleFocus(true);
                    }}
                    style={{
                      width: "300px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Title"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    focused
                    value={headers.POSentByPersonCompany}
                    style={{
                      width: "350px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Name"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    select
                    focused
                    value={cp}
                    style={{
                      width: "480px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Contact Person"
                  >
                    <MenuItem key="p1" value="p1">
                      {"Hana Gebeyehu"}
                    </MenuItem>
                    <MenuItem key="p2" value="p2">
                      {"Nigus Solomon"}
                    </MenuItem>
                    <MenuItem key="p3" value="p3">
                      {"Eyosias Mekbib"}
                    </MenuItem>
                  </TextField>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "180px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    focused
                    value={headers.SentInvoiceAddress2}
                    variant="outlined"
                    label="City"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "580px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    focused
                    value={
                      headers.SentInvoiceAddress5 +
                      " | " +
                      headers.SentInvoiceAddress4 +
                      " | " +
                      headers.SentInvoiceAddress6
                    }
                  ></TextField>
                </div>

                <br />
                <h2 style={{ lineHeight: 0.5 }}>Invoice Information</h2>
                <Divider></Divider>
                <br />
                <div
                  className="customerInfo"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    disabled={newDis}
                    focused
                    value={headers.POSentByPersonCompany}
                    style={{
                      width: "580px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Invoice Address"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    focused={titleFocus}
                    value={headers.PODescription}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTitleFocus(true);
                    }}
                    style={{
                      width: "300px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Title"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    focused
                    value={headers.POSentByPersonCompany}
                    style={{
                      width: "350px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Name"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    select
                    focused
                    value={cp}
                    style={{
                      width: "480px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    variant="outlined"
                    label="Contact Person"
                  >
                    <MenuItem key="p1" value="p1">
                      {"Hana Gebeyehu"}
                    </MenuItem>
                    <MenuItem key="p2" value="p2">
                      {"Nigus Solomon"}
                    </MenuItem>
                    <MenuItem key="p3" value="p3">
                      {"Eyosias Mekbib"}
                    </MenuItem>
                  </TextField>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "180px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    focused
                    value={headers.SentInvoiceAddress2}
                    variant="outlined"
                    label="City"
                  ></TextField>
                  <TextField
                    disabled={newDis}
                    style={{
                      width: "580px",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                    focused
                    value={
                      headers.SentInvoiceAddress5 +
                      " | " +
                      headers.SentInvoiceAddress4 +
                      " | " +
                      headers.SentInvoiceAddress6
                    }
                  ></TextField>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <h2 style={{ lineHeight: 0.5 }}>Maveko Information</h2>
              <Divider></Divider>
              <br />
              <div
                className="customerInfo"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  disabled={newDis}
                  value={headers.PONumber}
                  focused
                  style={{
                    width: "450px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="PO-No"
                ></TextField>
                <TextField
                  disabled={newDis}
                  value={headers.PODestinationName}
                  focused
                  style={{
                    width: "400px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Name of Ship"
                ></TextField>
                <TextField
                  disabled={newDis}
                  style={{
                    width: "350px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Ship Number"
                ></TextField>
                <TextField
                  disabled={newDis}
                  focused
                  value={headers.DeliveryAddress1}
                  style={{
                    width: "450px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Delivery Address"
                ></TextField>
                <TextField
                  disabled={newDis}
                  focused
                  value={
                    headers.DeliveryDateToDestination +
                    " | " +
                    headers.DestinationDeliveryPlace
                  }
                  style={{
                    width: "350px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Final Delivery"
                ></TextField>
                <TextField
                  disabled={newDis}
                  style={{
                    width: "380px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Voyage Number"
                ></TextField>
                <TextField
                  disabled={newDis}
                  select
                  value="t1"
                  style={{
                    width: "380px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  label="Backorder Text"
                >
                  <MenuItem key="t1" value="t1">
                    {"BACKORDER"}
                  </MenuItem>
                </TextField>
              </div>
              <br />
            </TabPanel>
            <TabPanel value="3">
              <h2 style={{ lineHeight: 0.5 }}>AES - Customs Information</h2>
              <Divider></Divider>
              <br />
              <div
                className="customerInfo"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  disabled={newDis}
                  select
                  style={{
                    width: "450px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Designated Eyes"
                >
                  <MenuItem key="c1" value="c1">
                    {"Zollamt Rotterdam"}
                  </MenuItem>
                  <MenuItem key="c2" value="c2">
                    {"Zollamt Venedig"}
                  </MenuItem>
                </TextField>
                <TextField
                  disabled={newDis}
                  value="0000 / Anmelder ist Ausführer"
                  focused
                  style={{
                    width: "450px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Involved Parties"
                ></TextField>
                <TextField
                  disabled={newDis}
                  select
                  style={{
                    width: "450px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Destination Country"
                >
                  <MenuItem key="d1" value="d1">
                    {"QQ – Schiffs-und Luftfahrzeugbedarf"}
                  </MenuItem>
                  <MenuItem key="d2" value="d2">
                    {"QS – Schiffs-und Luftfahrzeugbedarf"}
                  </MenuItem>
                  <MenuItem key="d3" value="d3">
                    {"QR – Schiffs-und Luftfahrzeugbedarf"}
                  </MenuItem>
                </TextField>
                <TextField
                  disabled={newDis}
                  value="3 / Strabenverkehr"
                  focused
                  style={{
                    width: "400px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Transportation Mode I"
                ></TextField>
                <TextField
                  disabled={newDis}
                  focused
                  value="1 / Seeverkehr"
                  style={{
                    width: "350px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Transportation Mode A"
                ></TextField>
                <TextField
                  disabled={newDis}
                  focused
                  value="EXW / Ab Werk"
                  style={{
                    width: "450px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Delivery Condition Code"
                ></TextField>
                <TextField
                  disabled={newDis}
                  focused
                  value="10 see Schiff"
                  style={{
                    width: "350px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Transportation to Border Point"
                ></TextField>
                <TextField
                  disabled={newDis}
                  focused
                  value="UNBEKANNT"
                  style={{
                    width: "380px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  variant="outlined"
                  label="Registration Number"
                ></TextField>
                <TextField
                  disabled={newDis}
                  focused
                  value="30 / Registration Number of the road vehicle"
                  style={{
                    width: "380px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  label="Type"
                ></TextField>
              </div>
              <br />
              <div
                className="route"
                style={{
                  paddingTop: "15px",
                  border: "1px solid #1976d2",
                  paddingInline: "20px",
                  borderRadius: "5px",
                }}
              >
                <h3 style={{ lineHeight: 0.5, marginTop: 0, marginBottom: 0 }}>
                  Transport Route
                </h3>
                <div className="fields" style={{ display: "flex" }}>
                  <TextField
                    disabled={newDis}
                    select
                    style={{
                      width: "250px",
                      marginBottom: "20px",
                      marginRight: "30px",
                      marginTop: "25px",
                    }}
                    variant="outlined"
                    label="Origin"
                  >
                    <MenuItem key="dod1" value="dod1">
                      {"DE | Deutschland"}
                    </MenuItem>
                  </TextField>
                  <TextField
                    disabled={newDis}
                    select
                    style={{
                      width: "250px",
                      marginBottom: "20px",
                      marginRight: "30px",
                      marginTop: "25px",
                    }}
                    variant="outlined"
                    label="Transit"
                  >
                    <MenuItem key="de1" value="de1">
                      {"NO | Norwegen"}
                    </MenuItem>
                  </TextField>
                  <TextField
                    disabled={newDis}
                    select
                    style={{
                      width: "250px",
                      marginBottom: "20px",
                      marginRight: "30px",
                      marginTop: "25px",
                    }}
                    variant="outlined"
                    label="Destination"
                  >
                    <MenuItem key="dd1" value="dd1">
                      {"CA | Kanada"}
                    </MenuItem>
                  </TextField>
                </div>
              </div>
            </TabPanel>
          </TabContext>
          <Divider></Divider>
          <div
            className="actions"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={() => {
                setOpenForm(!openForm);
              }}
              variant="outlined"
              color="error"
              style={{
                marginRight: "20px",
                padding: "10px",
                paddingInline: "50px",
              }}
            >
              HIDE
            </Button>
            <Button
              disabled={newDis}
              onClick={() => {
                setData([
                  {
                    id: 1,
                    so_ref: "8C03CE1E83C24D3B8ED6159CA0D8CE4D",
                    status: "pending",
                    so_created: "2023-07-27",
                  },
                ]);
                setVisible("none");
                setLoading(false);
                setActions(false);
                setOpenForm(!openForm);
              }}
              variant="contained"
              color="success"
              style={{
                marginRight: "20px",
                padding: "10px",
                paddingInline: "50px",
              }}
            >
              SAVE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
