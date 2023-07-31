import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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
  const [suppliers, setSuppliers] = React.useState([]);
  const [supplierFilter, setSupplierFilter] = React.useState();

  // use the built in react useeffect function to fetch supplier documnets from localhost:3000/supplier_documents
  React.useEffect(() => {
    fetch("http://0.0.0.0:3000/suppliers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuppliers(data["data"]);
      });
  }, []);
  const [loading, setLoading] = React.useState(false);
  const SaveDocument = async (file) => {
    setLoading(true);
    const randomNum = Math.floor(Math.random() * 10000);
    const sup_doc_res = await fetch(
      "http://0.0.0.0:3000/supplier_documents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: {
            reference_no: `REF-${randomNum}`,
            effective_date: new Date().toISOString().split("T")[0],
            supplier_id: supplierFilter,
          },
        }),
      }
    );

    const sup_doc = await sup_doc_res.json();

    if (sup_doc.success) {
      for (const data of fileData) {
        console.log(data);
        const response = await fetch(
          "http://0.0.0.0:3000/supplier_item_requests",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payload: {
                item_code: data["col0"],
                item_description: data["col1"],
                dimensions: data["col2"],
                price_per_pc: data["col3"],
                base_unit: data["col4"],
                target_unit: data["col5"],
                currency: data["col7"],
                supplier_document_id: sup_doc.data.id,
                valid_from: new Date().toISOString().split("T")[0],
                valid_to: new Date().toISOString().split("T")[0],
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create supplier document");
        }
      }
    }
  };
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
        <TextField
          select
          value={supplierFilter}
          style={{ width: "30%" }}
          label="Supplier"
          variant="outlined"
          onChange={(e) => {
            setSupplierFilter(e.target.value);
          }}
        >
          {suppliers.map((supplier, index) => (
            <MenuItem key={index} value={supplier.id}>
              {supplier.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogTitle>
      <DialogContent style={{ width: "97.5vw", minWidth: "97.5vw" }}>
        <DataGrid
          loading={loading}
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
            disabled={supplierFilter === undefined || supplierFilter === "" ? true : loading}
            style={{ padding: ".5%", paddingInline: "2.5%" }}
            color="secondary"
            variant="contained"
            onClick={async () => {
              await SaveDocument();
              setLoading(false);
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
