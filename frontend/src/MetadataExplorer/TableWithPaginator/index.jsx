import Grid from "@mui/material/Grid";
import TableDisplay from "./TableDisplay";

function TableWithPaginator({
  data,
  columnsOnMainTable,
  display,
  pageNumber,
  numResultsPerPage,
  varDoi,
}) {
  // Derive paginator props
  const startIndex = (pageNumber - 1) * numResultsPerPage + 1;
  const endIndex = Math.min(pageNumber * numResultsPerPage, data.length);
  const numPages = Math.ceil(data.length / numResultsPerPage);
  const numItems = data.length;

  const paginatorProps = {
    pageNumber,
    numPages,
    startIndex,
    endIndex,
    numItems,
  };

  // Derive table props
  const resultsInView = data.slice(startIndex - 1, endIndex);

  return (
    <Grid container>
      <TableDisplay
        data={resultsInView}
        columnsOnMainTable={columnsOnMainTable}
        display={display}
        varDoi={varDoi}
      ></TableDisplay>
    </Grid>
  );
}

export default TableWithPaginator;
