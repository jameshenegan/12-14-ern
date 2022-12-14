import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FilterListIcon from "@mui/icons-material/FilterList";

import TableOfCategories from "./TableOfCategories";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  categoricalColumn,
  categoricalColumnDisplay,
  categoriesAndCounts,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<FilterListIcon />}>
        {categoricalColumnDisplay}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableOfCategories
            categoricalColumn={categoricalColumn}
            categoricalColumnDisplay={categoricalColumnDisplay}
            categoriesAndCounts={categoriesAndCounts}
          ></TableOfCategories>
        </Box>
      </Modal>
    </div>
  );
}
