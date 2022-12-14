import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { useSelector, useDispatch } from "react-redux";

import TableHeadCell from "./TableHeadCell";

import { selectSelectedCheckboxes } from "../../slice";

import {
  handleToggleCheckbox,
  updateFilteredIdsBasedOnCheckbox,
  updateFilteredData,
} from "../../slice";

function TableDisplay({
  categoricalColumn,
  categoricalColumnDisplay,
  sortedData,
  sortColumn,
  sortDescending,
  setSortColumn,
  setSortDescending,
  searchString,
}) {
  const dispatch = useDispatch();
  const selectedCheckboxes = useSelector(selectSelectedCheckboxes);

  const filteredData = sortedData.filter((datum) =>
    String(datum[categoricalColumn])
      .toLowerCase()
      .includes(searchString.toLowerCase())
  );

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table size="small" stickyHeader aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <TableHeadCell
                columnName={categoricalColumn}
                columnDisplayName={categoricalColumnDisplay}
                sortColumn={sortColumn}
                sortDescending={sortDescending}
                setSortColumn={setSortColumn}
                setSortDescending={setSortDescending}
              ></TableHeadCell>
            </TableCell>
            <TableCell>
              <TableHeadCell
                columnName={"variables"}
                columnDisplayName={"Variables"}
                sortColumn={sortColumn}
                sortDescending={sortDescending}
                setSortColumn={setSortColumn}
                setSortDescending={setSortDescending}
              ></TableHeadCell>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row, i) => {
            const category = row[categoricalColumn];
            const checkboxIsSelected = !!selectedCheckboxes.find(
              (checkbox) =>
                checkbox["categoricalColumn"] === categoricalColumn &&
                checkbox["category"] === category
            );
            return (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>
                  <Checkbox
                    size="small"
                    sx={{ width: 10, height: 10 }}
                    checked={checkboxIsSelected}
                    onChange={() => {
                      dispatch(
                        handleToggleCheckbox({ categoricalColumn, category })
                      );

                      dispatch(updateFilteredIdsBasedOnCheckbox());

                      dispatch(updateFilteredData());
                      dispatch({
                        type: "SET_PAGE_NUMBER",
                        payload: 1,
                      });
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell>{row[categoricalColumn]}</TableCell>

                <TableCell>{row["variables"]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableDisplay;
