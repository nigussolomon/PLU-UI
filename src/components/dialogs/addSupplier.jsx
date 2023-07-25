import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddSupplierDialog({ row, open, handleClose }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      sx={{
        width: "100vw",
        minWidth: "60vw",
        overflow: "hidden",
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={{ textAlign: "left" }}>
        <div
          className="title"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span style={{ fontSize: "35px" }}>{row.item_code}</span>
          <span style={{ fontSize: "15px", fontWeight: 400 }}>
            {row.item_description}
          </span>
        </div>
        <Divider style={{ marginTop: "2%" }} />
      </DialogTitle>
      <DialogContent style={{ width: "26vw" }}>
        <div className="form">
          <div className="inputs" style={{ display: "flex", flexWrap: "wrap" }}>
            <div
              className="inputTop"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "1%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Supplier Name"
                variant="outlined"
                style={{
                  width: "48%",
                }}
              />

              <TextField
                id="outlined-basic"
                label="Supplier Country"
                variant="outlined"
                style={{
                  width: "48%",
                }}
              />
            </div>

            <div
              className="inputBottom1"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "5%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Supplier Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </div>
            <div
              className="inputBottom1"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "5%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Supplier Offer"
                variant="outlined"
                style={{ width: "65%" }}
              />

              <TextField
                select
                id="outlined-basic"
                label="Currency"
                variant="outlined"
                style={{ width: "30%" }}
              >
                <MenuItem value="usd">USD</MenuItem>
                <MenuItem value="eur">EUR</MenuItem>
                <MenuItem value="etb">ETB</MenuItem>
              </TextField>
            </div>
          </div>
          <br />
          <div
            className="actions"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Button
              variant="contained"
              color="success"
              fullWidth
              style={{ padding: "2%", paddingInline: "5%" }}
            >
              SUBMIT
            </Button>
            <div className="space" style={{ height: "15px" }}></div>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="error"
              fullWidth
              style={{ padding: "2%", paddingInline: "5%" }}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
