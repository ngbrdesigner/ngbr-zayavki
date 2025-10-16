"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Error({ error, reset }) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h5" color="error" sx={{ mb: 2 }}>
        Что-то пошло не так!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {error?.message}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => reset()}>
        Попробовать снова
      </Button>
    </Box>
  );
}
