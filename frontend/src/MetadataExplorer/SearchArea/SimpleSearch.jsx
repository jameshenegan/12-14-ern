import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";

import {
  selectSimpleSearchString,
  handleSimpleSearchStringChange,
  filterIdsBasedOnSearchBox,
  updateFilteredData,
} from "../slice";

function SimpleSearch() {
  const dispatch = useDispatch();
  const searchString = useSelector(selectSimpleSearchString);

  const handleChange = (e) => {
    dispatch(handleSimpleSearchStringChange(e.target.value));
    dispatch(filterIdsBasedOnSearchBox());
    dispatch(updateFilteredData());
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h5" gutterBottom component="div">
        Overall Search
      </Typography>
      <TextField
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        value={searchString}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </Stack>
  );
}

export default SimpleSearch;
