import React from "react";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { useNavigate } from "react-router-dom";

export default function PathSelector({source , setSource}) {
  const naviagte = useNavigate();
  return (
    <div
      className="pathSelect"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div
        onClick={() => {
          setSource("BO API");
          naviagte("/home");
        }}
        className="path"
        style={{
          padding: "1%",
          margin: "1%",
          background: "#04184B",
          color: "white",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "6.5%",
          cursor: "pointer",
        }}
      >
        <FilterFramesIcon />
        BACK ORDER
      </div>
      <div
        onClick={() => {
          setSource("Supplier Catalog");
          naviagte("/home");
        }}
        className="path"
        style={{
          padding: "1%",
          margin: "1%",
          background: "#04184B",
          color: "white",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "10%",
          cursor: "pointer",
        }}
      >
        <Inventory2Icon />
        SUPPLIER CATALOGUE
      </div>
      <div
        onClick={() => naviagte("/master")}
        className="path"
        style={{
          padding: "1%",
          margin: "1%",
          background: "#04184B",
          color: "white",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "8.5%",
          cursor: "pointer",
        }}
      >
        <ApartmentIcon />
        INTERNAL UPDATE
      </div>
      <div
        onClick={() => naviagte("/newitem")}
        className="path"
        style={{
          padding: "1%",
          margin: "1%",
          background: "#04184B",
          color: "white",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "7.3%",
          cursor: "pointer",
        }}
      >
        <FiberNewIcon />
        NEW SUPPLIER
      </div>
    </div>
  );
}
