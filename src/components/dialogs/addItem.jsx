import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import AlertMessage from "./alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddItemDialog({ open, handleClose }) {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("Test Message");

  const closeSnackbar = () => {
    setOpenSnackBar(false);
  };
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
      <AlertMessage
        openSnackBar={openSnackBar}
        closeSnackbar={closeSnackbar}
        message={message}
        severity={severity}
      />
      <DialogTitle style={{ textAlign: "left" }}>
        <div
          className="title"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span style={{ fontSize: "35px" }}>New Item</span>
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
                label="Item Code"
                variant="outlined"
                style={{
                  width: "48%",
                }}
              />

              <TextField
                id="outlined-basic"
                label="Item Name"
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
                label="Item Description"
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
                label="Dimensions"
                variant="outlined"
                style={{ width: "76%" }}
              />

              <TextField
                select
                id="outlined-basic"
                label="Unit"
                variant="outlined"
                style={{ width: "20%" }}
              >
                <MenuItem value="usd">PCS</MenuItem>
                <MenuItem value="eur">BOX</MenuItem>
                <MenuItem value="etb">PACK</MenuItem>
              </TextField>
            </div>
          </div>
          <br />
          <div
            className="actions"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Button
              onClick={() => {
                setOpenSnackBar(true);
                setMessage("Item Added Successfully");
                setSeverity("success");
                handleClose();
              }}
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
