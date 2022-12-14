import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "Hello" };

export const metadataExplorerSlice = createSlice({
  name: "metadataExplorer",
  initialState,
  reducers: {},
});

export default metadataExplorerSlice.reducer;
