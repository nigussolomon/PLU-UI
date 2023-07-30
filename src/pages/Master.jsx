import React from "react";
import NavBar from "../components/NavBar.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import TableCell from "@mui/material/TableCell";
import AlertMessage from "../components/dialogs/alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Master() {
  function isNowOrWithinThreeDays(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);
    const differenceInMs = Math.abs(targetDate - now);
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    return differenceInMs <= threeDaysInMs;
  }

  const [open, setOpen] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("Test Message");
  const [row, setRow] = React.useState([]);
  const [data, setData] = React.useState([]);

  const SaveDocument = async (file) => {
    const randomNum = Math.floor(Math.random() * 10000);
    const sup_doc_res = await fetch(
      "http://localhost:3000/supplier_documents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: {
            reference_no: `REF-${randomNum}`,
            effective_date: new Date().toISOString().split("T")[0],
            supplier_id: 1,
          },
        }),
      }
    );

    const sup_doc = await sup_doc_res.json();
    if (sup_doc.success) {
      for (const dat of data) {
        const response = await fetch(
          "http://localhost:3000/supplier_item_requests",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payload: {
                item_code: dat["data"]["item_code"],
                item_description: dat["data"]["item_description"],
                dimensions:
                  dat["data"]["dimension"]["length"] +
                  "x" +
                  dat["data"]["dimension"]["width"] +
                  "x" +
                  dat["data"]["dimension"]["height"],
                price_per_pc: dat["price"],
                base_unit: dat["data"]["base_unit"]["unit"],
                target_unit: dat["data"]["base_unit"]["unit"],
                currency: "EUR",
                supplier_document_id: sup_doc.data.id,
                valid_from: new Date().toISOString().split("T")[0],
                valid_to: new Date().toISOString().split("T")[0],
              },
            }),
          }
        );
        const res = await response.json();
        console.log(res);
      }
    }
  };

  const closeSnackbar = () => {
    setOpenSnackBar(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "item_code", headerName: "Item Code", width: 180 },
    { field: "decor_code", headerName: "Decor Code", width: 180 },
    { field: "item_name", headerName: "Item Name", width: 180 },
    { field: "item_description", headerName: "Item Description", width: 280 },
    {
      field: "dimensions",
      headerName: "Dimensions",
      width: 180,
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
    {
      field: "purchase price",
      headerName: "Purchase Price",
      width: 150,
      renderCell: (params) => {
        return (
          <div>{params.row.main_item_pricing.pricing.new_purchase_price}</div>
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
              background: isNowOrWithinThreeDays(
                params.row.main_item_pricing.pricing.updated_at
              )
                ? "purple"
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
      field: "base_unit",
      headerName: "Base Unit",
      width: 120,
      renderCell: (params) => {
        return <div>{params.row.base_unit.unit}</div>;
      },
    },
    {
      field: "new_price",
      headerName: "New Price",
      width: 190,
      sortable: false,
      renderCell: (params) => {
        return (
          <TextField
            value={
              data.find((item) => item.item_code === params.row.item_code)
                ?.price || ""
            }
            style={{ width: 190 }}
            label="New Price"
            variant="standard"
            onChange={(e) => {
              const newItemCode = params.row.item_code;
              const newPrice = e.target.value;
              const newData = [...data];
              const indexToUpdate = newData.findIndex(
                (item) => item.item_code === newItemCode
              );

              if (indexToUpdate !== -1) {
                newData[indexToUpdate] = {
                  ...newData[indexToUpdate],
                  price: newPrice,
                  data: params.row,
                };
              } else {
                newData.push({
                  item_code: newItemCode,
                  price: newPrice,
                  data: params.row,
                });
              }
              setData(newData);
              console.log(newData);
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const handleActionClick = (event) => {
          event.stopPropagation();
          handleClickOpen();
        };
        return (
          <div onClick={handleActionClick}>
            <Button style={{ backgroundColor: "#04184B" }} variant="contained">
              DETAILS
            </Button>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        setRow(data["data"]);
      });
  }, []);

  return (
    <div style={{ margin: "3.5vw", width: "95vw" }}>
      <AlertMessage
        openSnackBar={openSnackBar}
        closeSnackbar={closeSnackbar}
        severity={severity}
        message={message}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="lg"
        fullWidth
        onClose={handleClose}
        sx={{ width: "100vw", overflow: "hidden" }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ textAlign: "left" }}>
          {"Item Details"}
        </DialogTitle>
        <DialogContent style={{ minWidth: "50vh" }}>
          <TableCell
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <span>Target Unit</span>
            <span>PCS</span>
          </TableCell>
          <br />
          <TableCell
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <span>Target Unit</span>
            <span>PCS</span>
          </TableCell>
          <br />
          <TableCell
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <span>Target Unit</span>
            <span>PCS</span>
          </TableCell>
          <br />
          <TableCell
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <span>Target Unit</span>
            <span>PCS</span>
          </TableCell>
          <br />
          <TableCell
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <span>Target Unit</span>
            <span>PCS</span>
          </TableCell>
          <br />
          <TableCell
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <span>Target Unit</span>
            <span>PCS</span>
          </TableCell>
          <br />
          <TableCell
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <span>Target Unit</span>
            <span>PCS</span>
          </TableCell>
        </DialogContent>
      </Dialog>
      <NavBar></NavBar>
      <Typography style={{ margin: "1%" }} variant="h4">
        Master Price List
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
          rows={row}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
        />
        <div
          className="actions"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: ".6%",
          }}
        >
          <Button
            onClick={async () => {
              await SaveDocument();
              setOpenSnackBar(true);
              setSeverity("info");
              setMessage("Successfully drafted new prices.");
            }}
            style={{
              padding: ".7%",
              paddingInline: "2%",
              backgroundColor: "#04184B",
            }}
            variant="contained"
            endIcon={<FormatListBulletedIcon />}
          >
            DRAFT NEW PRICE
          </Button>
        </div>
      </div>
    </div>
  );
}
