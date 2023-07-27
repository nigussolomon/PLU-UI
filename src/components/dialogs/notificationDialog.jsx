import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationDialog({ open1, setOpen1 }) {
  return (
    <Dialog
      open={open1}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        setOpen1(!open1);
      }}
      sx={{ height: "fit-content", width: "100vw", overflow: "hidden" }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={{ textAlign: "left" }}>
        <div
          className="head"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {"NOTIFICATIONS"}
          <CloseIcon
            onClick={() => setOpen1(false)}
            style={{ color: "red", fontWeight: 900, cursor: "pointer" }}
          />
        </div>
        <Divider style={{ marginTop: "8px" }} />
      </DialogTitle>
      <DialogContent style={{ width: "25vw" }}>
        <div>
          <List>
            <ListItem style={{ display: "flex" }}>
              <ListItemText
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => {
                  alert("You clicked a notification!");
                }}
                primary={"This is a test Notification"}
                secondary={
                  "This the body to this test notification to see how it's gonna be structured"
                }
              />
            </ListItem>
            <ListItem style={{ display: "flex" }}>
              <ListItemText
                style={{ cursor: "pointer", color: "green" }}
                onClick={() => {
                  alert("You clicked a notification!");
                }}
                primary={"This is a test Notification"}
                secondary={
                  "This the body to this test notification to see how it's gonna be structured"
                }
              />
            </ListItem>
            <ListItem style={{ display: "flex" }}>
              <ListItemText
                style={{ cursor: "pointer", color: "green" }}
                onClick={() => {
                  alert("You clicked a notification!");
                }}
                primary={"This is a test Notification"}
                secondary={
                  "This the body to this test notification to see how it's gonna be structured"
                }
              />
            </ListItem>
          </List>
        </div>
      </DialogContent>
    </Dialog>
  );
}
