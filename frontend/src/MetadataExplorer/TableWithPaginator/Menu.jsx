import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";

import {
  setNumResultsPerPage,
  setPageNumber,
  selectNumResultsPerPage,
} from "../slice";

export default function BasicMenu() {
  const numResultsPerPage = useSelector(selectNumResultsPerPage);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (number) => {
    dispatch(setPageNumber(1));
    dispatch(setNumResultsPerPage(number));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      Results per page:
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {numResultsPerPage}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleSelect(5);
            handleClose();
          }}
        >
          5
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelect(10);
            handleClose();
          }}
        >
          10
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelect(15);
            handleClose();
          }}
        >
          15
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelect(20);
            handleClose();
          }}
        >
          20
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelect(50);
            handleClose();
          }}
        >
          50
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelect(100);
            handleClose();
          }}
        >
          100
        </MenuItem>
      </Menu>
    </div>
  );
}
