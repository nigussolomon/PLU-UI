import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Dialog
        open={open1}
        keepMounted
        onClose={() => {
          setOpen1(!open1);
        }}
        sx={{ height: "fit-content", width: "100vw", overflow: "hidden" }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ textAlign: "left" }}>
          {"NOTIFICATIONS"}
          <Divider style={{ marginTop: "8px" }} />
        </DialogTitle>
        <DialogContent style={{ width: "25vw" }}>
          <div>
            <List>
              <ListItem style={{ display: "flex" }}>
                <ListItemIcon>
                  <NotificationsNoneIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ cursor: "pointer" }}
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
                <ListItemIcon>
                  <NotificationsNoneIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ cursor: "pointer" }}
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
                <ListItemIcon>
                  <NotificationsNoneIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ cursor: "pointer" }}
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
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#04184B", zIndex: 1 }}
      >
        <Toolbar>
          <div
            className="toolBarContent"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="head"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: open ? "" : "3.5%",
              }}
            >
              <Typography variant="h6" noWrap component="div">
                MAVEKO PLU
              </Typography>
            </div>
            <div className="tail" style={{ width: "fit-content" }}>
              <div
                className="actions"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  background: "#fff",
                  padding: "3%",
                  paddingRight: "15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <AccountCircleIcon style={{ color: "#04184B" }} />
                <div className="text">
                  <span style={{ color: "black" }}>usename</span>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer style={{zIndex: 2}} variant="permanent" open={open}>
        <DrawerHeader style={{ background: "#04184B" }}>
          {!open ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                ...(open && { display: "none" }),
                color: "#fff",
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "#fff" }} />
              ) : (
                <ChevronLeftIcon style={{ color: "#fff" }} />
              )}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <div className="headList">
            <ListItem>
              <ListItemButton
                onClick={() => navigate("/home")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SaveAsIcon style={{ color: "#04184B" }} />
                </ListItemIcon>
                <ListItemText
                  primary="DRAFTS PAGE"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => navigate("/master")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FormatListBulletedTwoToneIcon style={{ color: "#04184B" }} />
                </ListItemIcon>
                <ListItemText
                  primary="MASTER LIST"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => navigate("/customer")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ContactPageIcon style={{ color: "#04184B" }} />
                </ListItemIcon>
                <ListItemText
                  primary="CUSTOMER LIST"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => navigate("/newitem")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FiberNewIcon style={{ color: "#04184B" }} />
                </ListItemIcon>
                <ListItemText
                  primary="NEW ITEM LIST"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => navigate("/ps")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SyncAltIcon style={{ color: "#04184B" }} />
                </ListItemIcon>
                <ListItemText
                  primary="UPDATE SOURCE"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </div>
          <div className="tailList">
            <ListItem>
              <ListItemButton
                onClick={() => setOpen1(!open1)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsNoneIcon style={{ color: "#04184B" }} />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary="NOTIFICATIONS"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => navigate("/")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ExitToAppIcon style={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText
                  primary="LOGOUT"
                  sx={{ opacity: open ? 1 : 0, color: "red" }}
                />
              </ListItemButton>
            </ListItem>
          </div>
        </List>
      </Drawer>
    </Box>
  );
}
