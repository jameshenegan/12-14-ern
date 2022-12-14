import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  arrayOfUids: [],
  metadataForMainTable: [],
  filteredMetadataForMainTable: [],
  searchableMetadata: [],
  status: "idle",
};

export const fetchArrayOfUidsAsync = createAsyncThunk(
  "metadataExplorer/fetchArrayOfUidsAsync",
  async () => {
    const response = await axios.get("api/metadata/arrayOfVarDois");
    return response.data;
  }
);

export const fetchMetadataForMainTableAsync = createAsyncThunk(
  "metadataExplorer/fetchMetadataForMainTable",
  async () => {
    const response = await axios.get("api/metadata/metadataForMainTable");
    return response.data;
  }
);

export const fetchSearchableMetadataAsync = createAsyncThunk(
  "metadataExplorer/fetchSearchableMetadataAsync",
  async () => {
    const response = await axios.get("api/metadata/searchableMetadata");
    return response.data;
  }
);

export const metadataExplorerSlice = createSlice({
  name: "metadataExplorer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArrayOfUidsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArrayOfUidsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.arrayOfUids = action.payload;
      })
      .addCase(fetchMetadataForMainTableAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMetadataForMainTableAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.metadataForMainTable = action.payload;
        state.filteredMetadataForMainTable = action.payload;
      })
      .addCase(fetchSearchableMetadataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchableMetadataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.searchableMetadata = action.payload;
      });
  },
});

export default metadataExplorerSlice.reducer;
