import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function Popup(props) {

  const { title, children, openPopup, setOpenPopup, maxWidth } = props;

  return (
    <Dialog open={openPopup} transitionDuration={200} maxWidth={maxWidth}>
      <DialogTitle>
        <div className="modal__title">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            className="button button--red"
            onClick={() => { setOpenPopup(false) }}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}
