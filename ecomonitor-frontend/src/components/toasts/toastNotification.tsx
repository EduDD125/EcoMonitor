import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastNotificationProps {
  open: boolean;
  message: string;
  status: number;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ open, message, status, onClose }) => {
  const getSeverity = () => {
    if (status >= 200 && status < 300) return "success";
    if (status >= 400 && status < 500) return "warning";
    if (status >= 500) return "error";
    return "info";
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert onClose={onClose} severity={getSeverity()} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
