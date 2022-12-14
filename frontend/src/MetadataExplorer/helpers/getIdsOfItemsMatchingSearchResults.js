const getIdsOfItemsMatchingSearchResults = (
  idsToCheck,
  filteredIdsBasedOnCheckboxes,
  filteredIdsBasedOnSearchBox
) => {
  // Find the intersection of the ids from search and ids from checkbox

  let filteredBySearchAndCheckbox;

  const filteredBySearch = idsToCheck.filter((d) =>
    filteredIdsBasedOnSearchBox.includes(d)
  );

  filteredBySearchAndCheckbox = filteredBySearch.filter((d) =>
    filteredIdsBasedOnCheckboxes.includes(d)
  );

  return filteredBySearchAndCheckbox;
};

export { getIdsOfItemsMatchingSearchResults };
