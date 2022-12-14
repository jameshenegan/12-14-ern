const getFilteredIdsBasedOnCheckboxes = (rawData, selectedCheckboxes, uid) => {
  /*
    Apply conditions inferred by selectedCheckboxes to the rawData 
    to getFilteredIdsBasedOnCheckboxes 
    
    - Look at the selectedCheckboxes, get listOfNamesOfCategoricalColumns to consider
    
    - For each categoricalColumn in the list, apply "or" filtering to rawData
      and record the "matches" (i.e., which elements of rawData are
      kept for the current categoricalColumn?)
    
      - Once that is done, apply "and" filtering accross all categoricalColumns
    
      */

  // Look at the selectedCheckboxes, get listOfNamesOfCategoricalColumns to consider
  const listOfNamesOfCategoricalColumns = [
    ...new Set(selectedCheckboxes.map((datum) => datum.categoricalColumn)),
  ];

  // records over all categories
  const allFilterColumnMatches = [];

  for (const categoricalColumn of listOfNamesOfCategoricalColumns) {
    /*
       apply "or" filtering for this categoricalColumn
      */

    // records for single category
    const matchesForCurrentColumn = [];

    // only look at checkboxes corresponding to current categoricalColumn
    const checkboxesToConsider = selectedCheckboxes.filter(
      (checkbox) => checkbox["categoricalColumn"] === categoricalColumn
    );

    // look at each "checkbox + datum" combination
    for (const checkbox of checkboxesToConsider) {
      for (const datum of rawData) {
        // To which category does this datum belong?
        const categoryForDatum = datum[checkbox["categoricalColumn"]];

        // Does this match the checkbox we're looking at now?
        if (categoryForDatum === checkbox["category"]) {
          // if so, we want to include this datum for this categorical column
          matchesForCurrentColumn.push(datum[uid]);
        }
      }
    }
    // Record results for this current column
    allFilterColumnMatches.push({
      categoricalColumn,
      matchesForCurrentColumn,
    });
  }

  // apply "and" filtering across all listOfNamesOfCategoricalColumns
  let filteredIdsBasedOnCheckboxes = rawData.map((datum) => datum[uid]);
  for (const result of allFilterColumnMatches) {
    filteredIdsBasedOnCheckboxes = filteredIdsBasedOnCheckboxes.filter(
      (datum) => result["matchesForCurrentColumn"].includes(datum)
    );
  }

  return filteredIdsBasedOnCheckboxes;
};

export { getFilteredIdsBasedOnCheckboxes };
