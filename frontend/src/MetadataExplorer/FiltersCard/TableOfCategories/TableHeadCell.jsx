import React, { useState } from "react";

import { Stack } from "@mui/material";

import SortToggle from "./SortToggle";

function TableHeadCell({
  columnName,
  columnDisplayName,
  sortColumn,
  sortDescending,
  setSortColumn,
  setSortDescending,
}) {
  const [hovering, setHovering] = useState(false);

  const onMouseEnter = () => {
    setHovering(true);
  };

  const onMouseLeave = () => {
    setHovering(false);
  };

  const isCurrentSortColumn = columnName === sortColumn;

  return (
    <Stack
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      direction="row"
      alignItems="center"
    >
      {columnDisplayName}
      <SortToggle
        hovering={hovering}
        isCurrentSortColumn={isCurrentSortColumn}
        sortDescending={sortDescending}
        setSortColumn={setSortColumn}
        setSortDescending={setSortDescending}
        columnName={columnName}
      ></SortToggle>
    </Stack>
  );
}

export default TableHeadCell;
