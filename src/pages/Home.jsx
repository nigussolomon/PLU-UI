import React from "react";
import NavBar from "../components/NavBar.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import { rows, rows2 } from "../mock/Data";
import * as XLSX from "xlsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home({ source }) {
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
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    await setFiles(file);
    const reader = new FileReader();
    console.log(files);
    reader.onload = async (event) => {
      const binaryString = await event.target.result;
      const workbook = await XLSX.read(binaryString, { type: "binary" });
      const sheetName = await workbook.SheetNames[0];
      const worksheet = await workbook.Sheets[sheetName];
      const data = await XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const columnsToDisplay = [1, 3, 6, 12, 10, 11, 12, 13];
      const limitedData = await data.map((row) =>
        columnsToDisplay.map((colIndex) => row[colIndex])
      );

      // Add 'id' property to each item in 'limitedData'
      const limitedDataWithId = await limitedData.map((row, index) => ({
        id: index + 1, // You can use any other unique identifier here
        data: row,
      }));

      const mycolumns = await limitedDataWithId[0].data.map(
        (header, index) => ({
          field: `col${index}`,
          headerName: header,
          width: 230, // You can adjust the width as needed
        })
      );

      setFileDataHead(mycolumns);

      const transformedFileData = limitedDataWithId.slice(1).map((row) => ({
        id: row.id,
        ...Object.fromEntries(
          row.data.map((val, index) => [`col${index}`, val])
        ),
      }));

      setFileData(transformedFileData);
      setFileDataHead(mycolumns);
    };
    reader.onerror = (event) => {
      console.error("Error reading file:", event.target.error);
    };
    reader.readAsBinaryString(file);
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
    <div className="home" style={{width: "95vw", marginLeft: "3.5vw", marginTop: "8vh"}}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        sx={{ height: "25vh", width: "100vw", overflow: "hidden" }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ textAlign: "center" }}>
          {"Choose Data Source"}
        </DialogTitle>
        <DialogContent style={{ width: "25vw" }}>
          <div
            className="pathSelect"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <input
                id="upload-input"
                className="upload-input"
                type="file"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <label htmlFor="upload-input">
                <Button
                  onClick={() => {
                    handleClickOpen2();
                  }}
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  style={{
                    padding: "3%",
                    margin: "1%",
                    background: "#04184B",
                    color: "white",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": {
                      background: "#08327B",
                    },
                  }}
                >
                  Upload File
                </Button>
              </label>
            </div>
            <div
              className="path"
              style={{
                padding: "3%",
                margin: "1%",
                background: "#04184B",
                color: "white",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "25%",
                cursor: "pointer",
              }}
            >
              <Inventory2Icon />
              API SOURCE
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        sx={{
          height: "fit-content",
          width: "100%",
          minWidth: "100vh",
          overflow: "hidden",
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{ fontSize: "30px", textAlign: "left", fontWeight: 900 }}
        >
          <div
            className="title"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span style={{ fontSize: "35px", fontWeight: 300 }}>
              {supplier}
            </span>
            <span
              style={{ fontSize: "25px", fontWeight: 700, lineHeight: 0.8 }}
            >
              {curRef}
            </span>
            <span
              style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.3 }}
            >
              {date}
            </span>
          </div>
        </DialogTitle>
        <DialogContent style={{ width: "97.5vw", minWidth: "97.5vw" }}>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#04184B",
                color: "white",
                cursor: "pointer",
                stroke: "white",
                minWidth: "100vw",
              },
            }}
            rows={dummyRow}
            columns={columns2.map((column) => ({
              ...column,
              cellClassName: (params) =>
                getCellStyles(params) ? "price-per-pc" : "",
              cellStyle: getCellStyles,
            }))}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 25]}
          />
          <DialogActions>
            <Button
              style={{ padding: ".5%", paddingInline: "2.5%" }}
              color="error"
              variant="outlined"
              onClick={handleClose1}
            >
              CLOSE
            </Button>
            {status === "Drafted" ? (
              <Button
                style={{ padding: ".5%", paddingInline: "2.5%" }}
                color="success"
                variant="contained"
                onClick={handleClose1}
              >
                APPROVE & UPDATE
              </Button>
            ) : (
              <>
                <Button
                  disabled={disabled}
                  style={{ padding: ".5%", paddingInline: "2.5%" }}
                  color="success"
                  variant="contained"
                  onClick={handleClose1}
                >
                  ACCEPT & RECORD
                </Button>
                <Button
                  style={{ padding: ".5%", paddingInline: "2.5%" }}
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    const test = () => {
                      rows2.forEach((element) => {
                        element["currency"] = "EUR";
                        element["price_per_pc"] = element["price_per_pc"] * 1.1;
                      });

                      return rows2;
                    };
                    setDummyRow(test);
                    setDisabled(false);
                  }}
                >
                  CONVERT CURRENCY
                </Button>
              </>
            )}
            <Button
              style={{ padding: ".5%", paddingInline: "2.5%" }}
              color="error"
              variant="contained"
            >
              ARCHIVE
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        sx={{
          height: "fit-content",
          width: "100%",
          minWidth: "100vh",
          overflow: "hidden",
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{ fontSize: "30px", textAlign: "left", fontWeight: 900 }}
        >
          {curRef}
        </DialogTitle>
        <DialogContent style={{ width: "97.5vw", minWidth: "97.5vw" }}>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#04184B",
                color: "white",
                cursor: "pointer",
                stroke: "white",
                minWidth: "100vw",
              },
            }}
            rows={fileData}
            columns={fileDataHead.map((column) => ({
              ...column,
              cellClassName: (params) =>
                getCellStyles(params) ? "price-per-pc" : "",
              cellStyle: getCellStyles,
            }))}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 25]}
          />
          <DialogActions>
            <Button
              style={{ padding: ".5%", paddingInline: "2.5%" }}
              color="error"
              variant="outlined"
              onClick={handleClose2}
            >
              CANCEL
            </Button>
            <Button
              style={{ padding: ".5%", paddingInline: "2.5%" }}
              color="secondary"
              variant="contained"
              onClick={() => {
                handleClose2();
              }}
            >
              SAVE
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <NavBar></NavBar>
      <Typography style={{ margin: "1%" }} variant="h4">
        Supplier's Price List Drafts
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
          <TextField
            select
            style={{ width: "24%" }}
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
            style={{ width: "24%" }}
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
            style={{ width: "24%" }}
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
