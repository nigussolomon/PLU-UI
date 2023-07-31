import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Details({
  docId,
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
  setOpenSnackBar,
  setSeverity,
  setMessage,
}) {
  const navigate = useNavigate();

  const updateRec = (status) => {
    fetch("http://0.0.0.0:3000/supplier_documents/" + docId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          status: status,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSeverity(status === "approved" ? "success" : "info");
        setMessage(`${curRef} ${status} Successfully!`);
        setOpenSnackBar(true);
        status === "approved" ? navigate("/master") : window.location.reload(false);
      });
  };

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
          {status === "drafted" ? (
            <Button
              disabled={
                status === "approved" || status === "archived" ? true : false
              }
              style={{ padding: ".5%", paddingInline: "2.5%" }}
              color="success"
              variant="contained"
              onClick={() => {
                updateRec("approved");
                handleClose1();
              }}
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
                onClick={() => {
                  updateRec("drafted");
                  handleClose1();
                  setSeverity("success");
                  setMessage("Items successfully recorded!");
                  setOpenSnackBar(true);
                }}
              >
                ACCEPT & RECORD
              </Button>
              <Button
                disabled={
                  status === "approved" || status === "archived" ? true : false
                }
                style={{ padding: ".5%", paddingInline: "2.5%" }}
                color="secondary"
                variant="contained"
                onClick={() => {
                  const test = () => {
                    dummyRow.forEach((element) => {
                      element["currency"] = "EUR";
                      element["price_per_pc"] = element["price_per_pc"] * 1.1;
                    });

                    return dummyRow;
                  };
                  setDummyRow(test);
                  setDisabled(false);
                  setSeverity("success");
                  setMessage("Currency converted successfully");
                  setOpenSnackBar(true);
                }}
              >
                CONVERT CURRENCY
              </Button>
            </>
          )}
          <Button
            disabled={status === "archived" ? true : false}
            onClick={() => {
              updateRec("archived");
              handleClose1();
              setSeverity("error");
              setMessage("Items have been archived!");
              setOpenSnackBar(true);
              window.location.reload(false);
            }}
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
