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
import { rows2 } from "../mock/Data";
import TableCell from "@mui/material/TableCell";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Master() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "item_code", headerName: "Item Code", width: 180 },
    { field: "item_description", headerName: "Item Description", width: 280 },
    { field: "dimensions", headerName: "Dimensions", width: 180 },
    { field: "price_per_pc", headerName: "Price Per PC", width: 150 },
    {
      field: "new_price",
      headerName: "New Price",
      width: 190,
      sortable: false,
      renderCell: (params) => {
        return (
          <TextField
            style={{ width: 190 }}
            label="New Price"
            variant="standard"
          />
        );
      },
    },
    { field: "base_unit", headerName: "Base Unit", width: 120 },
    { field: "target_unit", headerName: "Target Unit", width: 120 },
    { field: "currency", headerName: "Currency", width: 120 },
    { field: "created_at", headerName: "Created At", width: 160 },
    { field: "updated_at", headerName: "Updated At", width: 160 },
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
            <Button color="primary" variant="standard">
              DETAILS
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ margin: "3.5vw", width: "95vw" }}>
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
        <DialogTitle style={{ textAlign: "center" }}>
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
            <h4>Target Unit</h4>
            <h4>Target Unit</h4>
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
            <h4>Target Unit</h4>
            <h4>Target Unit</h4>
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
            <h4>Target Unit</h4>
            <h4>Target Unit</h4>
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
            <h4>Target Unit</h4>
            <h4>Target Unit</h4>
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
            <h4>Target Unit</h4>
            <h4>Target Unit</h4>
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
            <h4>Target Unit</h4>
            <h4>Target Unit</h4>
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
            <h4>Target Unit</h4>
            <h4>Target Unit</h4>
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
          rows={rows2}
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
            style={{ padding: ".7%", paddingInline: "2%", backgroundColor: "#04184B" }}
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
