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

export default function NotificationDialog({
  open1,
  setOpen1,
  notifications,
  setNotifications,
}) {
  const notFetch = () => {
    fetch("http://0.0.0.0:3000/notifications/" + 1)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotifications(data["data"]);
      });
  };

  const notUpdate = (id) => {
    fetch("http://0.0.0.0:3000/notifications/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          status: "read",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        notFetch()
      });
  };

  React.useEffect(() => {
    notFetch();
  }, []);

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
            {notifications.map((notification, index) => {
              return (
                <ListItem
                  onClick={() => notUpdate(notification.id)}
                  style={{ display: "flex" }}
                >
                  <ListItemText
                    style={{ cursor: "pointer" }}
                    primary={notification.title}
                    secondary={notification.body}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </DialogContent>
    </Dialog>
  );
}
