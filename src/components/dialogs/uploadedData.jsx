import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DialogActions from "@mui/material/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadedData({
  open2,
  curRef,
  fileData,
  fileDataHead,
  getCellStyles,
  handleClose2,
}) {
  return (
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
  );
}
