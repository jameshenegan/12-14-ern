import React from "react";

import FilterTableModal from "./FilterTableModal";

function FilterTableModals({ categoricalColumns, display }) {
  return categoricalColumns.map((exampleCategoricalColumn) => {
    const { categoricalColumn, categoriesAndCounts } = exampleCategoricalColumn;
    const categoricalColumnDisplay = display[categoricalColumn];

    return (
      <FilterTableModal
        categoricalColumn={categoricalColumn}
        categoricalColumnDisplay={categoricalColumnDisplay}
        categoriesAndCounts={categoriesAndCounts}
        key={categoricalColumn}
      ></FilterTableModal>
    );
  });
}

export default FilterTableModals;
