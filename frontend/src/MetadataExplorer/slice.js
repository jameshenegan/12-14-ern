import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  status: "idle",
  arrayOfUids: [],
  metadataForMainTable: [],
  filteredMetadataForMainTable: [],
  searchableMetadata: [],
  categoricalColumns: [],
  rawMetadataForCategoricalColumns: [],
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

export const fetchCategoricalColumnsConfigAsync = createAsyncThunk(
  "metadataExplorer/fetchCategoricalColumnsConfigAsync",
  async () => {
    const response = await axios.get("api/metadata/categoricalColumns");
    return response.data;
  }
);

export const fetchRawMetadataForCategoricalColumnsAsync = createAsyncThunk(
  "metadataExplorer/fetchRawMetadataForCategoricalColumnsAsync",
  async () => {
    const response = await axios.get(
      "api/metadata/rawMetadataForCategoricalColumns"
    );
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
      })
      .addCase(fetchCategoricalColumnsConfigAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategoricalColumnsConfigAsync.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.categoricalColumns = action.payload;
        }
      )
      .addCase(fetchRawMetadataForCategoricalColumnsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRawMetadataForCategoricalColumnsAsync.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.rawMetadataForCategoricalColumns = action.payload;
        }
      );
  },
});

export default metadataExplorerSlice.reducer;
