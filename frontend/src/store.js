import { configureStore } from "@reduxjs/toolkit";

import metadataExplorerReducer from "./MetadataExplorer/slice";

export const store = configureStore({
  reducer: {
    metadataExplorer: metadataExplorerReducer,
  },
});
