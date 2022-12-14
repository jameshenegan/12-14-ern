import React, { Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";

import { getBoxesByCategoricalColumn } from "../helpers/getBoxesByCategoricalColumn";

import { useDispatch, useSelector } from "react-redux";

import {
  selectSelectedCheckboxes,
  handleToggleCheckbox,
  updateFilteredIdsBasedOnCheckbox,
  updateFilteredData,
} from "../slice";

function InfoOnSelectedCheckboxes() {
  const selectedCheckboxes = useSelector(selectSelectedCheckboxes);
  const allBoxesBycategoricalColumn =
    getBoxesByCategoricalColumn(selectedCheckboxes);

  const dispatch = useDispatch();

  const handleToggle = (filterColumn, value) => {
    const categoricalColumn = filterColumn;
    const category = value;

    dispatch(handleToggleCheckbox({ categoricalColumn, category }));
    dispatch(updateFilteredIdsBasedOnCheckbox());
    dispatch(updateFilteredData());
    dispatch({
      type: "SET_PAGE_NUMBER",
      payload: 1,
    });
  };

  // render-helpers
  const renderCheckedValuesForAllFilterColumns = (
    allBoxesBycategoricalColumn
  ) => {
    return (
      <Typography variant="caption">
        {allBoxesBycategoricalColumn
          .map((boxesForFilterColumn, i) => {
            return mapFunctionForAllColumns(
              boxesForFilterColumn,
              renderCheckedValuesForSingleFilterColumn,
              i
            );
          })
          .reduce((prev, curr) => [prev, " and ", curr])}
      </Typography>
    );
  };

  const renderCheckedValuesForSingleFilterColumn = (
    filterColumn,
    checkedValuesForFilterColumn
  ) => {
    return (
      <Typography variant="caption">
        {checkedValuesForFilterColumn
          .map((value, i) => {
            const key = `${value}-${i}`;
            return mapFunctionForSingleColumn(filterColumn, value, key);
          })
          .reduce((prev, curr) => [prev, " or ", curr])}
      </Typography>
    );
  };

  // Map functions

  const mapFunctionForAllColumns = (
    boxesForFilterColumn,
    renderCheckedValuesForSingleFilterColumn,
    i
  ) => {
    const { categoricalColumn } = boxesForFilterColumn;

    const checkedValuesForFilterColumn = boxesForFilterColumn.checkboxes.map(
      (box) => box["category"]
    );

    return (
      <Fragment key={i}>
        <Typography variant="caption">
          <code>{categoricalColumn}</code> {"is"}{" "}
        </Typography>
        <br></br>

        {renderCheckedValuesForSingleFilterColumn(
          categoricalColumn,
          checkedValuesForFilterColumn
        )}
        <br></br>
      </Fragment>
    );
  };

  const mapFunctionForSingleColumn = (filterColumn, value, key) => {
    return (
      <Fragment key={key}>
        <Chip
          label={value}
          variant="outlined"
          onDelete={() => {
            handleToggle(filterColumn, value);
          }}
        />
      </Fragment>
    );
  };

  // Main
  if (allBoxesBycategoricalColumn.length > 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="caption">
            <u>Selected Filters</u>
          </Typography>
          <br></br>
          {renderCheckedValuesForAllFilterColumns(allBoxesBycategoricalColumn)}
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
}

export default InfoOnSelectedCheckboxes;
