import * as React from "react";

import { useState, useEffect, useMemo } from "react";

import Grid from "@mui/material/Grid";

import { sortData } from "../../helpers/sortData";
import TableDisplay from "./TableDisplay";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useSelector } from "react-redux";

import { getCounts } from "../../helpers/getCounts";

import {
  selectRawMetadataForCategoricalColumns,
  selectFilteredIdsBasedOnSearchBox,
  selectVarDoiConfig,
} from "../../slice";

export default function TableOfCategories({
  categoricalColumn,
  categoricalColumnDisplay,
  categoriesAndCounts,
}) {
  const rawMetadataForCategoricalColumns = useSelector(
    selectRawMetadataForCategoricalColumns
  );

  const filteredIdsBasedOnSearchBox = useSelector(
    selectFilteredIdsBasedOnSearchBox
  );

  const varDoi = useSelector(selectVarDoiConfig);

  const filteredIdsBasedOnCheckboxes = useSelector(
    (state) => state.filteredIdsBasedOnCheckboxes
  );

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDescending, setSortDescending] = useState(false);

  const [searchString, setSearchString] = useState("");

  const originalTableData = useMemo(
    () => {
      const results = getCounts(
        rawMetadataForCategoricalColumns,
        categoricalColumn,
        categoriesAndCounts
      );

      const originalTableData = [];
      for (const datum of categoriesAndCounts) {
        const tableDatum = {};
        tableDatum[categoricalColumn] = datum["category"];
        tableDatum["variables"] = results[datum["category"]];

        originalTableData.push(tableDatum);
      }

      return originalTableData;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoriesAndCounts, categoricalColumn, filteredIdsBasedOnSearchBox]
  );

  useEffect(
    () => {
      const results = getCounts(
        rawMetadataForCategoricalColumns,
        categoricalColumn,
        categoriesAndCounts,
        varDoi
      );

      const originalTableData = [];
      for (const datum of categoriesAndCounts) {
        const tableDatum = {};
        tableDatum[categoricalColumn] = datum["category"];
        tableDatum["variables"] = results[datum["category"]];

        originalTableData.push(tableDatum);
      }
      setSortedData(sortData(sortColumn, sortDescending, originalTableData));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredIdsBasedOnCheckboxes]
  );

  const [sortedData, setSortedData] = useState(originalTableData);

  useEffect(() => {
    const results = getCounts(
      rawMetadataForCategoricalColumns,
      categoricalColumn,
      categoriesAndCounts,
      varDoi
    );

    const originalTableData = [];
    for (const datum of categoriesAndCounts) {
      const tableDatum = {};
      tableDatum[categoricalColumn] = datum["category"];
      tableDatum["variables"] = results[datum["category"]];

      originalTableData.push(tableDatum);
    }

    setSortedData(sortData(sortColumn, sortDescending, originalTableData));
  }, [
    sortColumn,
    sortDescending,
    originalTableData,
    rawMetadataForCategoricalColumns,
    categoricalColumn,
    categoriesAndCounts,
    varDoi,
  ]);

  // handle textField change
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Filter Terms Below..."
            variant="outlined"
            value={searchString}
            onChange={handleChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TableDisplay
          categoricalColumn={categoricalColumn}
          categoricalColumnDisplay={categoricalColumnDisplay}
          sortedData={sortedData}
          sortColumn={sortColumn}
          sortDescending={sortDescending}
          setSortColumn={setSortColumn}
          setSortDescending={setSortDescending}
          searchString={searchString}
        ></TableDisplay>
      </Grid>
    </Grid>
  );
}
