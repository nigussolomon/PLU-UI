import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NavBar from "../components/NavBar";
import { rows3 } from "../mock/Data";
import Button from "@mui/material/Button";
import AddSupplierDialog from "../components/dialogs/addSupplier";
import AddItemDialog from "../components/dialogs/addItem";
import Checkbox from "@mui/material/Checkbox";
import AlertMessage from "../components/dialogs/alert";

function Row(props) {
  const { row, onCheckboxChange } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedHistoryRow, setSelectedHistoryRow] = React.useState(null);
  const [open1, setOpen1] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("Test Message");

  const closeSnackbar = () => {
    setOpenSnackBar(false);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const handleRadioChange = (event, historyRow) => {
    setSelectedHistoryRow(historyRow);
  };

  const handleCheckbox = (event) => {
    onCheckboxChange(row.item_code, event.target.checked);
  };

  return (
    <React.Fragment>
      <AddSupplierDialog open={open1} handleClose={handleClose} row={row} />
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Checkbox
            checked={row.checked}
            onChange={handleCheckbox}
            color="primary"
            inputProps={{ "aria-label": "select item" }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.item_code}
        </TableCell>
        <TableCell align="left">{row.item_description}</TableCell>
        <TableCell align="right">{row.price_per_pc}</TableCell>
        <TableCell align="right">{row.new_price}</TableCell>
        <TableCell align="right">{row.base_unit}</TableCell>
        <TableCell align="right">{row.target_unit}</TableCell>
        <TableCell align="right">{row.currency}</TableCell>
        <TableCell align="right">{row.created_at}</TableCell>
        <TableCell align="right">{row.updated_at}</TableCell>
        <TableCell align="right">
          {
            <Button
              onClick={() => {
                setOpen(true);
                setOpen1(true);
              }}
              style={{
                padding: "3.5%",
                paddingInline: "10%",
                backgroundColor: "#04184B",
              }}
              variant="contained"
            >
              ADD SUPPLIER
            </Button>
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Supplier List
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Supplier Name</TableCell>
                    <TableCell>Supplier Country</TableCell>
                    <TableCell align="right">Supplier Description</TableCell>
                    <TableCell align="right">Supplier Offer</TableCell>
                    <TableCell align="right">Supplier Currency</TableCell>
                    <TableCell align="right">Select</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>{historyRow.country}</TableCell>
                      <TableCell align="right">
                        {historyRow.description}
                      </TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.offer)}
                      </TableCell>
                      <TableCell align="right">{historyRow.currency}</TableCell>
                      <TableCell align="right">
                        <input
                          type="radio"
                          checked={historyRow === selectedHistoryRow}
                          onChange={(event) =>
                            handleRadioChange(event, historyRow)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    item_code: PropTypes.string.isRequired,
    item_description: PropTypes.string.isRequired,
    price_per_pc: PropTypes.number.isRequired,
    new_price: PropTypes.number.isRequired,
    base_unit: PropTypes.string.isRequired,
    target_unit: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default function NewItem() {
  const [rowsState, setRowsState] = React.useState(rows3);
  const [open2, setOpen2] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("Test Message");

  const closeSnackbar = () => {
    setOpenSnackBar(false);
  };

  const handleClose1 = () => {
    setOpen2(false);
  };

  const handleCheckboxChange = (itemCode, checked) => {
    setRowsState((prevRows) =>
      prevRows.map((row) =>
        row.item_code === itemCode ? { ...row, checked } : row
      )
    );
  };

  return (
    <>
      <NavBar></NavBar>
      <AlertMessage
        openSnackBar={openSnackBar}
        closeSnackbar={closeSnackbar}
        message={message}
        severity={severity}
      />
      <AddItemDialog open={open2} handleClose={handleClose1} />
      <div
        className="head"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginRight: "20px",
        }}
      >
        <Typography
          style={{ marginTop: "10vh", marginInline: "8vh" }}
          variant="h4"
        >
          New Item Price List
        </Typography>
        <div
          className="actions"
          style={{
            display: "flex",
            width: "500px",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            style={{
              padding: "2.5%",
              paddingInline: "8%",
              backgroundColor: "#04184B",
            }}
          >
            IMPORT ITEMS
          </Button>
          <div className="space" style={{ width: "20px" }}></div>
          <Button
            onClick={() => {
              setOpen2(true);
            }}
            variant="contained"
            style={{
              padding: "2.5%",
              paddingInline: "8%",
              backgroundColor: "#04184B",
            }}
          >
            ADD ITEM
          </Button>
        </div>
      </div>
      <TableContainer
        style={{ marginInline: "4vw", width: "95vw", marginTop: "2vh" }}
        component={Paper}
      >
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "#04184B" }}>
            <TableRow>
              <TableCell />
              <TableCell style={{ color: "white" }} align="left">
                Select
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Item Code
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Item Description
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Price Per PC
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                New Price
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Base Unit
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Target Unit
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Currency
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Created At
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Updated At
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsState.map((row) => (
              <Row
                key={row.item_code}
                row={row}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        className="actions"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1.5vh",
          marginRight: "1vw",
        }}
      >
        <Button
          onClick={() => {
            setMessage("Items have been Quened for approval!");
            setSeverity("info");
            setOpenSnackBar(true);
          }}
          variant="contained"
          color="warning"
          style={{
            padding: ".5%",
            paddingInline: "1.7%",
            marginLeft: "8vw",
            marginBottom: "3vh",
          }}
        >
          START UPDATE
        </Button>
        <div className="space" style={{ width: "20px" }}></div>
        <Button
          onClick={() => {
            setMessage("Successfully added a supplier for items!");
            setSeverity("success");
            setOpenSnackBar(true);
          }}
          variant="contained"
          color="success"
          style={{
            padding: ".5%",
            paddingInline: "1.7%",
            marginBottom: "3vh",
          }}
        >
          APPROVE SUPPLIERS
        </Button>
      </div>
    </>
  );
}
