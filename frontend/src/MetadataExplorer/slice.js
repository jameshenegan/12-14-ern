import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { getFilteredIdsBasedOnSearchBox } from "./helpers/getFilteredIdsBasedOnSearchBox";
import { getFilteredData } from "./helpers/getFilteredData";

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
  simpleSearchString: "",
  fieldsToSearch: [],
  selectedCheckboxes: [],
  filteredIdsBasedOnSearchBox: [],
  filteredIdsBasedOnCheckboxes: [],
  idsOfFilteredMetadata: [],
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

export const fetchFieldsToSearchConfigAsync = createAsyncThunk(
  "metadataExplorer/fetchFieldsToSearchConfigAsync",
  async () => {
    const response = await axios.get("api/config/fieldsToSearch");
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
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setNumResultsPerPage: (state, action) => {
      state.numResultsPerPage = action.payload;
    },
    handleSimpleSearchStringChange: (state, action) => {
      state.simpleSearchString = action.payload;
    },
    filterIdsBasedOnSearchBox: (state, action) => {
      const searchableMetadata = state.searchableMetadata;
      const simpleSearchString = state.simpleSearchString;
      const varDoi = state.varDoi;
      const fieldsToSearch = state.fieldsToSearch;

      const filteredIdsBasedOnSearchBox = getFilteredIdsBasedOnSearchBox(
        searchableMetadata,
        simpleSearchString,
        varDoi,
        fieldsToSearch
      );

      state.filteredIdsBasedOnSearchBox = filteredIdsBasedOnSearchBox;
    },
    updateFilteredData: (state, action) => {
      const metadataForMainTable = state.metadataForMainTable;
      const filteredIdsBasedOnSearchBox = state.filteredIdsBasedOnSearchBox;
      const filteredIdsBasedOnCheckboxes = state.filteredIdsBasedOnCheckboxes;
      const varDoi = state.varDoi;

      const { idsOfFilteredData, filteredData } = getFilteredData(
        metadataForMainTable,
        filteredIdsBasedOnSearchBox,
        filteredIdsBasedOnCheckboxes,
        varDoi
      );

      state.idsOfFilteredMetadata = idsOfFilteredData;
      state.filteredMetadataForMainTable = filteredData;
    },
  },
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
      .addCase(fetchFieldsToSearchConfigAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFieldsToSearchConfigAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.fieldsToSearch = action.payload;
      })
      .addCase(fetchArrayOfUidsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArrayOfUidsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.arrayOfUids = action.payload;
        state.filteredIdsBasedOnSearchBox = action.payload;
        state.filteredIdsBasedOnCheckboxes = action.payload;
        state.idsOfFilteredMetadata = action.payload;
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

export const selectSimpleSearchString = (state) => {
  return state.metadataExplorer.simpleSearchString;
};

export const {
  setPageNumber,
  setNumResultsPerPage,
  handleSimpleSearchStringChange,
  filterIdsBasedOnSearchBox,
  updateFilteredData,
} = metadataExplorerSlice.actions;

export default metadataExplorerSlice.reducer;
