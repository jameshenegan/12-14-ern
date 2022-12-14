import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = { arrayOfUids: [] };

export const fetchArrayOfUidsAsync = createAsyncThunk(
  "metadataExplorer/fetchArrayOfUidsAsync",
  async () => {
    const response = await axios.get("api/metadata/arrayOfVarDois");
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
      });
  },
});

export default metadataExplorerSlice.reducer;
