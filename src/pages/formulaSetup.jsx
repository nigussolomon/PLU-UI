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
  const [suppliers, setSuppliers] = React.useState([]);
  const [formulas, setFormulas] = React.useState([]);
  const [formulas2, setFormulas2] = React.useState([]);
  const [supplierFilter, setSupplierFilter] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [labelAlt, setLabelAlt] = React.useState("");
  const [margin, setMargin] = React.useState("");
  const [marginAlt, setMarginAlt] = React.useState("");
  const [formula, setFormula] = React.useState("");
  const [customers, setCustomers] = React.useState([]);
  const [customerFilter, setCustomerFilter] = React.useState([]);
  const [discount, setDiscount] = React.useState("");
  const [discountAlt, setDiscountAlt] = React.useState();

  const addFormula = async () => {
    const res = await fetch("http://localhost:3000/supplier_formulas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          supplier_id: supplierFilter,
          label: label,
          margin: margin,
          active: true,
        },
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  const addFormula2 = async () => {
    const res = await fetch("http://localhost:3000/customer_formulas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          customer_id: customerFilter,
          label: labelAlt,
          formula: discount,
          active: true,
        },
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  const updateFormula = async () => {
    const res = await fetch(
      "http://localhost:3000/supplier_formulas/" + formula,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: {
            margin: marginAlt,
          },
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const updateFormula2 = async () => {
    const res = await fetch(
      "http://localhost:3000/supplier_formulas/" + formula,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: {
            formula: discountAlt,
          },
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  React.useEffect(() => {
    fetch("http://localhost:3000/suppliers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuppliers(data["data"]);
      });
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:3000/customers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomers(data["data"]);
      });
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:3000/supplier_formulas")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormulas(data["data"]);
      });
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:3000/customer_formulas")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormulas2(data["data"]);
      });
  }, []);
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
                select
                value={supplierFilter || ""}
                style={{ width: "250px" }}
                label="Supplier"
                variant="outlined"
                onChange={async (e) => {
                  setSupplierFilter(e.target.value);
                }}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField
                value={label || ""}
                onChange={(e) => setLabel(e.target.value)}
                variant="outlined"
                label="Formula Label"
              ></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField
                value={margin || ""}
                onChange={(e) => setMargin(e.target.value)}
                variant="outlined"
                label="Margin"
              ></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <Button
                onClick={addFormula}
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
                select
                value={formula || ""}
                style={{ width: "250px" }}
                label="Formula Label"
                variant="outlined"
                onChange={async (e) => {
                  setFormula(e.target.value);
                }}
              >
                {formulas.map((formula) => (
                  <MenuItem key={formula.id} value={formula.id}>
                    {formula.label}
                  </MenuItem>
                ))}
              </TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField
                value={marginAlt || ""}
                onChange={(e) => setMarginAlt(e.target.value)}
                variant="outlined"
                label="Margin"
              ></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <Button
                onClick={updateFormula}
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
            <Typography>CUSTOMER DISCOUNT SETUP</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="cusFormula" style={{ display: "flex" }}>
              <TextField
                select
                value={customerFilter || ""}
                style={{ width: "250px" }}
                label="Customer"
                variant="outlined"
                onChange={async (e) => {
                  setCustomerFilter(e.target.value);
                }}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField
                value={labelAlt}
                onChange={(e) => {
                  setLabelAlt(e.target.value);
                }}
                variant="outlined"
                label="Formula Label"
              ></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
                variant="outlined"
                label="Discount"
              ></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <Button
                onClick={addFormula2}
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
                select
                value={formula || ""}
                style={{ width: "250px" }}
                label="Formula Label"
                variant="outlined"
                onChange={async (e) => {
                  setFormula(e.target.value);
                }}
              >
                {formulas2.map((formula) => (
                  <MenuItem key={formula.id} value={formula.id}>
                    {formula.label}
                  </MenuItem>
                ))}
              </TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <TextField
                value={discountAlt}
                onChange={(e) => {
                  setDiscountAlt(e.target.value);
                }}
                variant="outlined"
                label="Discount"
              ></TextField>
              <div className="space" style={{ width: "15px" }}></div>
              <Button
                onClick={updateFormula2}
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
