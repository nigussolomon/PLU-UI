import React from "react";
import NavBar from "../components/NavBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function FormulaSetup() {
  return (
    <>
      <NavBar></NavBar>
      <div className="fs" style={{ margin: "4.5vw" }}>
        <Typography variant="h4">Formula Setup</Typography>
        <br />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>SUPPLIER MARGIN SETUP</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="suppFormula" style={{ display: "flex" }}>
              <TextField
                sx={{ width: "250px" }}
                select
                variant="outlined"
                label="Supplier"
              >
                <MenuItem value="supplier1">Supplier 1</MenuItem>
                <MenuItem value="supplier2">Supplier 2</MenuItem>
                <MenuItem value="supplier3">Supplier 3</MenuItem>
                <MenuItem value="supplier4">Supplier 4</MenuItem>
                <MenuItem value="supplier5">Supplier 5</MenuItem>
              </TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField variant="outlined" label="Formula Label"></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField variant="outlined" label="Margin"></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <Button
                variant="contained"
                color="success"
                style={{ paddingInline: "3%" }}
              >
                ADD FORMULA
              </Button>
            </div>
            <br />
            <div className="suppFormula" style={{ display: "flex" }}>
              <TextField
                sx={{ width: "250px" }}
                select
                variant="outlined"
                label="Formula Label"
              >
                <MenuItem value="formula1">Formula 1</MenuItem>
                <MenuItem value="formula2">Formula 2</MenuItem>
                <MenuItem value="formula3">Formula 3</MenuItem>
                <MenuItem value="formula4">Formula 4</MenuItem>
                <MenuItem value="formula5">Formula 5</MenuItem>
              </TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField variant="outlined" label="Margin"></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <Button
                variant="contained"
                color="secondary"
                style={{ paddingInline: "3%" }}
              >
                UPDATE FORMULA
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Customer Discount Formula</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="cusFormula" style={{ display: "flex" }}>
              <TextField
                sx={{ width: "250px" }}
                select
                variant="outlined"
                label="Customer"
              >
                <MenuItem value="customer1">Customer 1</MenuItem>
                <MenuItem value="customer2">Customer 2</MenuItem>
                <MenuItem value="customer3">Customer 3</MenuItem>
                <MenuItem value="customer4">Customer 4</MenuItem>
                <MenuItem value="customer5">Customer 5</MenuItem>
              </TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField variant="outlined" label="Formula Label"></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField variant="outlined" label="Discount"></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <Button
                variant="contained"
                color="success"
                style={{ paddingInline: "3%" }}
              >
                ADD FORMULA
              </Button>
            </div>
            <br />
            <div className="cusFormula" style={{ display: "flex" }}>
              <TextField
                sx={{ width: "250px" }}
                select
                variant="outlined"
                label="Formula Label"
              >
                <MenuItem value="formula1">Formula 1</MenuItem>
                <MenuItem value="formula2">Formula 2</MenuItem>
                <MenuItem value="formula3">Formula 3</MenuItem>
                <MenuItem value="formula4">Formula 4</MenuItem>
                <MenuItem value="formula5">Formula 5</MenuItem>
              </TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField variant="outlined" label="Discount"></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <Button
                variant="contained"
                color="secondary"
                style={{ paddingInline: "3%" }}
              >
                UPDATE FORMULA
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Customer Custom Formula</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </>
  );
}
