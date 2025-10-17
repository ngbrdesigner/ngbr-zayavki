"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function SuccessDialog({ open, onClose, autoCloseMs = 2500 }) {
  useEffect(() => {
    if (!open) return;
    if (autoCloseMs > 0) {
      const t = setTimeout(() => onClose(), autoCloseMs);
      return () => clearTimeout(t);
    }
  }, [open, autoCloseMs, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircleOutlineIcon color="success" />
          <Typography variant="h6">Готово</Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Заявка отправлена успешно
          </Typography>
          <Button variant="contained" onClick={onClose} fullWidth>
            Закрыть
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
