import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMessage({
  openSnackBar,
  closeSnackbar,
  severity,
  message,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
      open={openSnackBar}
      onClose={closeSnackbar}
    >
      <Alert onClose={closeSnackbar} severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
