import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";

const ConfirmationDialog = ({ open, spotId, onConfirmBooking, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">
        Confirm Booking
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", right: "8px", top: "8px" }}
        >
          <MdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          Are you sure you want to book spot <strong>{spotId}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirmBooking} variant="contained">
          Book Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  spotId: PropTypes.string,
  onConfirmBooking: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
