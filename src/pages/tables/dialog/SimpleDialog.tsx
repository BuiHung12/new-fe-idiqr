import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs" // Set width smaller for a simple dialog
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
        <Button onClick={onConfirm} color="primary">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
