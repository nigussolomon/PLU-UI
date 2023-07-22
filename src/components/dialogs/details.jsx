import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DialogActions from "@mui/material/DialogActions";
import { rows2 } from "../../mock/Data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Details({
  open1,
  curRef,
  supplier,
  date,
  dummyRow,
  columns2,
  status,
  handleClose1,
  disabled,
  getCellStyles,
  setDisabled,
  setDummyRow,
}) {
  return (
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
          <span style={{ fontSize: "35px", fontWeight: 300 }}>{supplier}</span>
          <span style={{ fontSize: "25px", fontWeight: 700, lineHeight: 0.8 }}>
            {curRef}
          </span>
          <span style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.3 }}>
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
  );
}
