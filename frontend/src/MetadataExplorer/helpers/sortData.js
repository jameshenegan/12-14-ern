export const sortData = (sortColumn, sortDescending, originalTableData) => {
  let sortDirectionDescending;

  // let counter = 0;

  if (sortDescending) {
    sortDirectionDescending = 1;
  } else {
    sortDirectionDescending = -1;
  }

  if (!sortColumn) {
    return originalTableData;
  } else {
    const sortedData = [...originalTableData].sort(compare);

    return sortedData;
  }

  function compare(a, b) {
    // counter += 1;

    const aSortColumn = a[sortColumn];
    const bSortColumn = b[sortColumn];

    if (aSortColumn < bSortColumn) {
      return 1 * sortDirectionDescending;
    }
    if (aSortColumn > bSortColumn) {
      return -1 * sortDirectionDescending;
    }
    return 0;
  }
};
