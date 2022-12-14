export const getBoxesByCategoricalColumn = (selectedCheckboxes) => {
  // What are the unique namesOfCategoricalColumns associated with the selectedCheckboxes?
  const allNamesOfCategoricalColumns = selectedCheckboxes.map(
    (item) => item.categoricalColumn
  );
  const uniqueNamesOfCategoricalColumns = [
    ...new Set(allNamesOfCategoricalColumns),
  ];

  // For each unique categoricalColumn, which checkboxes have been selected?
  const allBoxesBycategoricalColumn = [];
  for (const categoricalColumn of uniqueNamesOfCategoricalColumns) {
    const boxesForcategoricalColumn = {
      categoricalColumn,
      checkboxes: [],
    };
    for (const checkbox of selectedCheckboxes) {
      if (checkbox.categoricalColumn === categoricalColumn) {
        boxesForcategoricalColumn.checkboxes.push(checkbox);
      }
    }
    allBoxesBycategoricalColumn.push(boxesForcategoricalColumn);
  }

  return allBoxesBycategoricalColumn;
};
