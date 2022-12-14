import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  status: "idle",
  display: {},
  varDoi: "varDoi",
  columnsOnMainTable: [],
  arrayOfUids: [],
  metadataForMainTable: [],
  filteredMetadataForMainTable: [],
  searchableMetadata: [],
  categoricalColumns: [],
  rawMetadataForCategoricalColumns: [],
  pageNumber: 1,
  numResultsPerPage: 15,
};

export const fetchVarDoiAsync = createAsyncThunk(
  "metadataExplorer/fetchVarDoiAsync",
  async () => {
    const response = await axios.get("api/config/varDoi");
    return response.data;
  }
);

export const fetchDisplayConfigAsync = createAsyncThunk(
  "metadataExplorer/fetchdisplayConfigAsync",
  async () => {
    const response = await axios.get("api/config/display");
    return response.data;
  }
);

export const fetchColsOnMainTableConfigAsync = createAsyncThunk(
  "metadataExplorer/fetchColsOnMainTableConfigAsync",
  async () => {
    const response = await axios.get("api/config/columnsOnMainTable");
    return response.data;
  }
);

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
    const response = await axios.get("api/config/categoricalColumns");
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
      .addCase(fetchVarDoiAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVarDoiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.varDoi = action.payload;
      })
      .addCase(fetchDisplayConfigAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDisplayConfigAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.display = action.payload;
      })
      .addCase(fetchColsOnMainTableConfigAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColsOnMainTableConfigAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.columnsOnMainTable = action.payload;
      })
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

export const selectVarDoiConfig = (state) => {
  return state.metadataExplorer.varDoi;
};

export const selectDisplayConfig = (state) => {
  return state.metadataExplorer.display;
};

export const selectColsOnMainTableConfig = (state) => {
  return state.metadataExplorer.columnsOnMainTable;
};

export const selectFilteredMetadataForMainTable = (state) => {
  return state.metadataExplorer.filteredMetadataForMainTable;
};

export const selectPageNumber = (state) => {
  return state.metadataExplorer.pageNumber;
};

export const selectNumResultsPerPage = (state) => {
  return state.metadataExplorer.numResultsPerPage;
};

export default metadataExplorerSlice.reducer;
