import React from "react";
import NavBar from "../components/NavBar.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { rows, rows2 } from "../mock/Data";
import DataSourceDialog from "../components/dialogs/dataSource";
import Details from "../components/dialogs/details";
import UploadedData from "../components/dialogs/uploadedData";

export default function Home({ source, setSource }) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [curRef, setCurRef] = React.useState("");
  const [supplier, setSupplier] = React.useState("");
  const [date, setDate] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [files, setFiles] = React.useState();
  const [fileData, setFileData] = React.useState([]);
  const [fileDataHead, setFileDataHead] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setOpen(false);
    setFileData([]);
    setFileDataHead([]);
    setFiles([]);
    window.location.reload(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "reference_no", headerName: "Reference No", width: 180 },
    { field: "supplier_name", headerName: "Supplier Name", width: 250 },
    { field: "created_at", headerName: "Created At", width: 235 },
    { field: "updated_at", headerName: "Updated At", width: 235 },
    { field: "status", headerName: "Status", width: 220 },
    { field: "effective_date", headerName: "Effective Date", width: 280 },
    { field: "assigned_user", headerName: "Assigned User", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const handleActionClick = (event) => {
          event.stopPropagation();
          setCurRef(params.row.reference_no);
          params.row.status === "Approved"
            ? setCurRef(params.row.reference_no)
            : handleClickOpen1();
          setStatus(params.row.status);
          setSupplier(params.row.supplier_name);
          setDate(params.row.effective_date);
        };
        return (
          <div onClick={handleActionClick} style={{ display: "flex" }}>
            <Button
              disabled={params.row.status === "Approved" ? disabled : null}
              color={
                params.row.status === "Approved" ||
                params.row.status === "Drafted"
                  ? "success"
                  : "primary"
              }
              style={{
                backgroundColor:
                  params.row.status === "Pending"
                    ? "#04184B"
                    : null,
              }}
              variant="contained"
            >
              DETAILS
            </Button>
          </div>
        );
      },
    },
  ];

  const columns2 = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "item_code", headerName: "Item Code", width: 180 },
    { field: "item_description", headerName: "Item Description", width: 280 },
    { field: "dimensions", headerName: "Dimensions", width: 230 },
    { field: "price_per_pc", headerName: "Price Per PC", width: 190 },
    { field: "base_unit", headerName: "Base Unit", width: 150 },
    { field: "target_unit", headerName: "Target Unit", width: 150 },
    { field: "currency", headerName: "Currency", width: 120 },
    {
      field: "supplier_document_id",
      headerName: "Supplier Document ID",
      width: 200,
    },
    { field: "created_at", headerName: "Created At", width: 200 },
    { field: "updated_at", headerName: "Updated At", width: 200 },
  ];

  const [dummyRow, setDummyRow] = React.useState(rows2);
  const handleClose1 = () => {
    setOpen1(false);
    setDisabled(true);
    setDummyRow(rows2);
  };

  const getCellStyles = (params) => {
    const field = params.field;
    if (field === "price_per_pc") {
      return { color: "red" };
    }
    return null;
  };

  return (
    <div
      className="home"
      style={{ width: "95vw", marginLeft: "3.5vw", marginTop: "8vh" }}
    >
      <DataSourceDialog
        open={open}
        handleClose={handleClose}
        files={files}
        setFiles={setFiles}
        setFileData={setFileData}
        setFileDataHead={setFileDataHead}
        handleClickOpen2={handleClickOpen2}
      />
      <Details
        open1={open1}
        curRef={curRef}
        supplier={supplier}
        date={date}
        dummyRow={dummyRow}
        columns2={columns2}
        status={status}
        handleClose1={handleClose1}
        disabled={disabled}
        getCellStyles={getCellStyles}
        setDisabled={setDisabled}
        setDummyRow={setDummyRow}
      />
      <UploadedData
        open2={open2}
        handleClose2={handleClose2}
        getCellStyles={getCellStyles}
        fileData={fileData}
        fileDataHead={fileDataHead}
      />

      <NavBar></NavBar>
      <div
        className="title"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography style={{ margin: "1%" }} variant="h4">
          Price List Drafts
        </Typography>
        <Typography style={{ margin: "1%", fontWeight: 900 }} variant="h5">
          {localStorage.getItem("source") ? localStorage.getItem("source") : "Drafts"}
        </Typography>
      </div>
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
            width: "54%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            select
            style={{ width: "30%" }}
            label="Supplier"
            variant="outlined"
          >
            <MenuItem value="supplier1">Supplier 1</MenuItem>
            <MenuItem value="supplier2">Supplier 2</MenuItem>
            <MenuItem value="supplier3">Supplier 3</MenuItem>
            <MenuItem value="supplier4">Supplier 4</MenuItem>
            <MenuItem value="supplier5">Supplier 5</MenuItem>
          </TextField>
          <TextField
            select
            style={{ width: "30%" }}
            label="Status"
            variant="outlined"
          >
            <MenuItem value="status1">Approved</MenuItem>
            <MenuItem value="status2">Pending</MenuItem>
            <MenuItem value="status3">Draft</MenuItem>
            <MenuItem value="status4">Archived</MenuItem>
          </TextField>
          <TextField
            select
            style={{ width: "30%" }}
            label="Source"
            variant="outlined"
          >
            <MenuItem value="source1">BO API</MenuItem>
            <MenuItem value="source2">INTERNAL UPDATE</MenuItem>
            <MenuItem value="source3">SUPPLIER CATALOG</MenuItem>
            <MenuItem value="source4">NEW ITEM REQUEST</MenuItem>
          </TextField>
        </div>
        <div className="action" style={{ width: "10%" }}>
          <Button
            onClick={handleClickOpen}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#04184B",
              color: "white",
            }}
            variant="contained"
          >
            Import
            <FormatListBulletedIcon />
          </Button>
        </div>
      </div>
      <div
        style={{
          height: "fit-content",
          width: "98%",
          margin: "1%",
          marginTop: "2%",
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
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
