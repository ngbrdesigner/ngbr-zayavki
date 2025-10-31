import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

function SlideDownTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function TopAlert({
  open,
  message,
  severity = "info",
  onClose,
  duration = 4000,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      slots={{ transition: SlideDownTransition }} // ✅ новый способ задать анимацию
      slotProps={{
        transition: { direction: "down" }, // можно указать дополнительные props
      }}
      sx={{
        position: "fixed",
        left: 15,
        right: 15,
        top: 16,
        zIndex: 9999,
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          boxShadow: 3,
          borderRadius: "10px",
          fontSize: "1rem",
          alignItems: "center",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
