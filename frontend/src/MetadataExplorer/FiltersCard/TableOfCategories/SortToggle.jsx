import React, { Fragment } from "react";

import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Box from "@mui/material/Box";

function SortToggle({
  isCurrentSortColumn,
  hovering,
  sortDescending,
  setSortColumn,
  setSortDescending,
  columnName,
}) {
  const renderWhenHoveringOverNonSortColumn = () => {
    // Display one arrow
    return (
      <IconButton
        aria-label="up-arrow"
        onClick={() => {
          setSortColumn(columnName);
        }}
      >
        <ArrowUpwardIcon fontSize="small" />
      </IconButton>
    );
  };

  const renderSortColumn = () => {
    // The currentSortColumn
    if (sortDescending) {
      return (
        <IconButton
          aria-label="down-arrow"
          onClick={() => {
            setSortDescending(false);
            setSortColumn(null);
          }}
        >
          <ArrowDownwardIcon fontSize="small" color="primary" />
        </IconButton>
      );
    } else {
      return (
        <Fragment>
          <IconButton
            aria-label="up-arrow"
            onClick={() => {
              setSortDescending(true);
            }}
          >
            <ArrowUpwardIcon fontSize="small" color="primary" />
          </IconButton>
        </Fragment>
      );
    }
  };

  if (!isCurrentSortColumn && !hovering) {
    return (
      <Box
        sx={{
          width: 36,
          height: 36,
        }}
      />
    );
  } else if (!isCurrentSortColumn && hovering) {
    return renderWhenHoveringOverNonSortColumn();
  } else {
    return renderSortColumn();
  }
}

export default SortToggle;
