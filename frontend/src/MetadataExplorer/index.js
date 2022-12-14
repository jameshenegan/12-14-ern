import React, { useEffect, Fragment } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";

import TableWithPaginator from "./TableWithPaginator";

import {
  fetchVarDoiAsync,
  fetchDisplayConfigAsync,
  fetchColsOnMainTableConfigAsync,
  fetchArrayOfUidsAsync,
  fetchMetadataForMainTableAsync,
  fetchSearchableMetadataAsync,
  fetchCategoricalColumnsConfigAsync,
  fetchRawMetadataForCategoricalColumnsAsync,
  selectVarDoiConfig,
  selectDisplayConfig,
  selectColsOnMainTableConfig,
  selectFilteredMetadataForMainTable,
  selectPageNumber,
  selectNumResultsPerPage,
} from "./slice";

function MetadataExplorer() {
  const filteredMetadataForMainTable = useSelector(
    selectFilteredMetadataForMainTable
  );

  const varDoi = useSelector(selectVarDoiConfig);
  const display = useSelector(selectDisplayConfig);
  const columnsOnMainTable = useSelector(selectColsOnMainTableConfig);
  const pageNumber = useSelector(selectPageNumber);
  const numResultsPerPage = useSelector(selectNumResultsPerPage);

  // Set up ability to dispatch actions
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchVarDoiAsync());
      dispatch(fetchDisplayConfigAsync());
      dispatch(fetchColsOnMainTableConfigAsync());
      dispatch(fetchArrayOfUidsAsync());
      dispatch(fetchMetadataForMainTableAsync());
      dispatch(fetchSearchableMetadataAsync());
      dispatch(fetchCategoricalColumnsConfigAsync());
      dispatch(fetchRawMetadataForCategoricalColumnsAsync());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="caption">
                Note: the data for this application was generated by a random
                number generator. It's not real!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TableWithPaginator
                data={filteredMetadataForMainTable}
                columnsOnMainTable={columnsOnMainTable}
                display={display}
                pageNumber={pageNumber}
                numResultsPerPage={numResultsPerPage}
                varDoi={varDoi}
              ></TableWithPaginator>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
}

export default MetadataExplorer;
