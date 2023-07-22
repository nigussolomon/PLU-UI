import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import * as XLSX from "xlsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DataSourceDialog({
  open,
  handleClose,
  files,
  setFiles,
  setFileDataHead,
  setFileData,
  handleClickOpen2,
}) {
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
      const limitedDataWithId = await limitedData.map((row, index) => ({
        id: index + 1,
        data: row,
      }));

      const mycolumns = await limitedDataWithId[0].data.map(
        (header, index) => ({
          field: `col${index}`,
          headerName: header,
          width: 230,
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
    await reader.readAsBinaryString(file);
    handleClickOpen2();
  };
  
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      sx={{
        height: "25vh",
        width: "100vw",
        minWidth: "40vw",
        overflow: "hidden",
      }}
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
  );
}
