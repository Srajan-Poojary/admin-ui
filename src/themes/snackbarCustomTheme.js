import { Alert } from "@mui/material";
import React, { forwardRef } from "react";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});

export { SnackbarAlert };
