import React, { useEffect, Fragment } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";

import {
  fetchArrayOfUidsAsync,
  fetchMetadataForMainTableAsync,
  fetchSearchableMetadataAsync,
  fetchCategoricalColumnsConfigAsync,
  fetchRawMetadataForCategoricalColumnsAsync,
} from "./slice";

function MetadataExplorer() {
  // Set up ability to dispatch actions
  const dispatch = useDispatch();

  useEffect(
    () => {
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
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
}

export default MetadataExplorer;
