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

function createData(
  id,
  item_code,
  item_description,
  dimensions,
  price_per_pc,
  new_price,
  base_unit,
  target_unit,
  currency,
  created_at,
  updated_at
) {
  return {
    id,
    item_code,
    item_description,
    dimensions,
    price_per_pc,
    new_price,
    base_unit,
    target_unit,
    currency,
    created_at,
    updated_at,
    checked: false,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

// ... (previous code)

function Row(props) {
  const { row, onRadioChange } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedHistoryRow, setSelectedHistoryRow] = React.useState(null);

  const handleRadioChange = (event, historyRow) => {
    setSelectedHistoryRow(historyRow);
  };

  return (
    <React.Fragment>
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
        <TableCell component="th" scope="row">
          {row.item_code}
        </TableCell>
        <TableCell align="right">{row.price_per_pc}</TableCell>
        <TableCell align="right">{row.new_price}</TableCell>
        <TableCell align="right">{row.base_unit}</TableCell>
        <TableCell align="right">{row.target_unit}</TableCell>
        <TableCell align="right">{row.currency}</TableCell>
        <TableCell align="right">{row.created_at}</TableCell>
        <TableCell align="right">{row.updated_at}</TableCell>
        <TableCell align="right">{/* Render actions here */}</TableCell>
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
                    <TableCell align="right">Supplier Offer($)</TableCell>
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

// ... (remaining code)

Row.propTypes = {
  row: PropTypes.shape({
    item_code: PropTypes.string.isRequired,
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
  }).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default function NewItem() {
  const [rowsState, setRowsState] = React.useState(rows3);

  const handleCheckboxChange = (id, checked) => {
    setRowsState((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, checked } : row))
    );
  };
  return (
    <>
      <NavBar></NavBar>
      <Typography
        style={{ marginTop: "10vh", marginInline: "8vh" }}
        variant="h4"
      >
        New Item Price List
      </Typography>
      <TableContainer
        style={{ marginInline: "4vw", width: "95vw", marginTop: "2vh" }}
        component={Paper}
      >
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "#04184B" }}>
            <TableRow>
              <TableCell />
              <TableCell style={{color: "white"}} align="right">Item Code</TableCell>
              <TableCell style={{color: "white"}} align="right">Price Per PC</TableCell>
              <TableCell style={{color: "white"}} align="right">New Price</TableCell>
              <TableCell style={{color: "white"}} align="right">Base Unit</TableCell>
              <TableCell style={{color: "white"}} align="right">Target Unit</TableCell>
              <TableCell style={{color: "white"}} align="right">Currency</TableCell>
              <TableCell style={{color: "white"}} align="right">Created At</TableCell>
              <TableCell style={{color: "white"}} align="right">Updated At</TableCell>
              <TableCell style={{color: "white"}} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows3.map((row) => (
              <Row
                key={row.item_code}
                row={row}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="actions" style={{display: "flex", justifyContent: "flex-end", marginTop: "1.5vh", marginRight: "1vw",}}>
      <Button
        variant="contained"
        color="success"
        style={{ padding: ".7%", paddingInline: "1.7%", marginLeft: "8vw" }}
      >
        APPROVE SUPPLIERS
      </Button>
      </div>
    </>
  );
}
