import React, { Fragment, useState } from "react";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Menu from "./Menu";

import { useDispatch } from "react-redux";

import { setPageNumber } from "../slice";

function Paginator({ paginatorProps }) {
  const dispatch = useDispatch();

  const { pageNumber, numPages, startIndex, endIndex, numItems } =
    paginatorProps;

  // Is the "enter page number" features showing?
  const [enterPageVisible, setEnterPageVisible] = useState(false);
  const [searchBoxValue, setSearchBoxValue] = useState(pageNumber.toString());

  // Logic Helpers

  // For basic paginator

  const handleFirstPageClick = () => {
    dispatch(setPageNumber(1));
  };

  const handlePrevPageClick = (pageNumber) => {
    if (pageNumber > 1) {
      dispatch(setPageNumber(pageNumber - 1));
    }
  };

  const handleNextPageClick = (pageNumber, numPages) => {
    if (pageNumber < numPages) {
      dispatch(setPageNumber(pageNumber + 1));
    }
  };

  const handleLastPageClick = (numPages) => {
    dispatch(setPageNumber(numPages));
  };

  const handleCloseClick = (setEnterPageVisible) => {
    setEnterPageVisible(false);
  };

  // For "jump-to" functionality

  const handleSearchBoxValueChange = (e) => {
    const value = e.target.value;
    setSearchBoxValue(value);
  };

  const handleJumpClick = () => {
    // Validate searchBoxValue

    // Is it a positive integer?
    const isAnInteger = isPositiveInteger(searchBoxValue);
    if (!isAnInteger) {
      return null;
    }

    const requestedPageNumber = parseInt(searchBoxValue);

    // Is the requested page number in the valid range?
    const validRequest = requestedPageNumber < numPages;

    if (validRequest) {
      dispatch(setPageNumber(requestedPageNumber));
    }
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleJumpClick();
    }
  };

  // Helpers for rendering

  const renderWhenEnterPageNumberVisible = () => {
    return (
      <Stack spacing={5} direction="row">
        <IconButton
          variant="text"
          onClick={() => {
            handleCloseClick(setEnterPageVisible);
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "7ch", height: "1ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            sx={{
              "& > :not(style)": { width: "7ch", height: "3ch" },
            }}
            value={searchBoxValue}
            onChange={handleSearchBoxValueChange}
            autoFocus
            onKeyDown={keyPress}
          />
        </Box>
        <IconButton
          variant="text"
          onClick={() => {
            handleJumpClick();
          }}
        >
          <MoveDownIcon />
        </IconButton>
      </Stack>
    );
  };

  const renderWhenEnterPageNumberNotVisible = () => {
    return (
      <Stack spacing={0} direction="row">
        <IconButton
          variant="text"
          disabled={pageNumber === 1}
          onClick={() => {
            handleFirstPageClick();
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
        <IconButton
          variant="text"
          disabled={pageNumber === 1}
          onClick={() => {
            handlePrevPageClick(pageNumber);
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Button
          variant="text"
          onClick={() => {
            setEnterPageVisible(true);
            setSearchBoxValue(pageNumber);
          }}
        >
          {pageNumber}
        </Button>

        <IconButton
          variant="text"
          disabled={pageNumber === numPages}
          onClick={() => {
            handleNextPageClick(pageNumber, numPages);
          }}
        >
          <NavigateNextIcon />{" "}
        </IconButton>
        <IconButton
          variant="text"
          disabled={pageNumber === numPages}
          onClick={() => {
            handleLastPageClick(numPages);
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </Stack>
    );
  };

  return (
    <Fragment>
      <Grid
        item
        xs={3}
        sx={{
          marginTop: 1,
        }}
      ></Grid>
      <Grid
        item
        xs={3}
        sx={{
          marginTop: 1.85,
        }}
      >
        <Menu></Menu>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          marginTop: 1,
        }}
      >
        <Box
          sx={{
            marginTop: 1.68,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>
            {startIndex}-{Math.min(endIndex, numItems)} of {numItems}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          marginTop: 1.4,
        }}
      >
        <Box
          sx={{
            marginTop: 0.3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {enterPageVisible
            ? renderWhenEnterPageNumberVisible()
            : renderWhenEnterPageNumberNotVisible()}
        </Box>
      </Grid>
    </Fragment>
  );
}

export default Paginator;

function isPositiveInteger(str) {
  if (typeof str !== "string") {
    return false;
  }

  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
}
