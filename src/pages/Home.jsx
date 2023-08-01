import React from "react";
import NavBar from "../components/NavBar.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import DataSourceDialog from "../components/dialogs/dataSource";
import Details from "../components/dialogs/details";
import UploadedData from "../components/dialogs/uploadedData";
import AlertMessage from "../components/dialogs/alert";

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
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("Test Message");
  const [row, setRow] = React.useState([]);
  const [docId, setDocId] = React.useState();
  const [supplierFilter, setSupplierFilter] = React.useState();
  const [statusFilter, setStatusFilter] = React.useState("pending");
  const [suppliers, setSuppliers] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);

  // use the built in react useeffect function to fetch supplier documnets from localhost:3000/supplier_documents
  React.useEffect(() => {
    fetch("http://0.0.0.0:3000/supplier_documents")
      .then((res) => res.json())
      .then((data) => {
        setRow(data["data"].slice().reverse());
      });

    fetch("http://0.0.0.0:3000/suppliers")
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data["data"].slice().reverse());
      });
  }, []);

  const fetchSDItems = (id) => {
    fetch("http://0.0.0.0:3000/supplier_documents/" + id)
      .then((res) => res.json())
      .then((data) => {
        setDummyRow(data["data"].slice().reverse());
      });
  };

  React.useEffect(() => {
    const filterRows = () => {
      let filteredData = row;

      if (supplierFilter) {
        filteredData = filteredData.filter(
          (item) => item.supplier.id === supplierFilter
        );
      }

      if (statusFilter) {
        filteredData = filteredData.filter(
          (item) => item.status === statusFilter
        );
      }

      setFilteredRows(filteredData.slice().reverse());
      return filteredData;
    };

    filterRows();
    console.log(filterRows());
    if (row.length !== 0 && filterRows().length === 0) {
      setSeverity("info");
      setMessage(`No ${statusFilter}  documents found`);
      setOpenSnackBar(true);
    }
  }, [supplierFilter, statusFilter, row]);

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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    { field: "reference_no", headerName: "Reference No", width: 180 },
    {
      field: "supplier",
      headerName: "Supplier Name",
      headerAlign: "center",
      align: "center",
      width: 250,
      valueGetter: (params) => params.row.supplier.name,
    },
    {
      field: "created_at",
      headerName: "Created At",
      headerAlign: "center",
      align: "center",
      width: 235,
      valueGetter: (params) => formatDate(params.row.created_at),
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      headerAlign: "center",
      align: "center",
      width: 235,
      valueGetter: (params) => formatDate(params.row.updated_at),
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      width: 220,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background:
              params.row.status === "approved"
                ? "green"
                : params.row.status === "archived"
                ? "red"
                : params.row.status === "drafted"
                ? "blue"
                : "orange",
            color: "#fff",
            textTransform: "uppercase",
            fontWeight: 900,
            padding: "5px",
            width: "100%",
            height: "100%",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          {params.row.status}
        </div>
      ),
    },
    {
      field: "effective_date",
      headerName: "Effective Date",
      headerAlign: "center",
      align: "center",
      width: 280,
      valueGetter: (params) => formatDate(params.row.effective_date),
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const handleActionClick = async (event) => {
          setDocId(params.row.id);
          fetchSDItems(params.row.id);
          event.stopPropagation();
          setCurRef(params.row.reference_no);
          handleClickOpen1();
          setStatus(params.row.status);
          setSupplier(params.row.supplier.name);
          setDate(params.row.effective_date);
        };
        return (
          <div onClick={handleActionClick} style={{ display: "flex" }}>
            <Button
              style={{
                background: "#04184B",
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
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      valueGetter: (params) => formatDate(params.row.created_at),
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 200,
      valueGetter: (params) => formatDate(params.row.updated_at),
    },
  ];

  const [dummyRow, setDummyRow] = React.useState([]);
  const handleClose1 = () => {
    setOpen1(false);
    setDisabled(true);
  };

  const getCellStyles = (params) => {
    const field = params.field;
    if (field === "price_per_pc") {
      return { color: "red" };
    }
    return null;
  };

  const closeSnackbar = () => {
    setOpenSnackBar(false);
  };

  return (
    <div
      className="home"
      style={{ width: "95vw", marginLeft: "3.5vw", marginTop: "8vh" }}
    >
      <AlertMessage
        openSnackBar={openSnackBar}
        severity={severity}
        message={message}
        closeSnackbar={closeSnackbar}
      />
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
        docId={docId}
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
        setSeverity={setSeverity}
        setOpenSnackBar={setOpenSnackBar}
        setMessage={setMessage}
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
          {localStorage.getItem("source")
            ? localStorage.getItem("source")
            : "Drafts"}
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
            width: "34%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            select
            value={supplierFilter || ""}
            style={{ width: "40%" }}
            label="Supplier"
            variant="outlined"
            onChange={async (e) => {
              setSupplierFilter(e.target.value);
            }}
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            value={statusFilter || ""}
            style={{ width: "40%" }}
            label="Status"
            variant="outlined"
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
          >
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="drafted">Draft</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </TextField>
          <Button
            onClick={() => {
              setSupplierFilter("");
              setStatusFilter("");
            }}
            variant="outlined"
            color="error"
          >
            CLEAR
          </Button>
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
          rows={filteredRows}
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
