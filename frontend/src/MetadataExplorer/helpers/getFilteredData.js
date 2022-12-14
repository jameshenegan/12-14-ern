import { getIdsOfItemsMatchingSearchResults } from "./getIdsOfItemsMatchingSearchResults";

const getFilteredData = (
  rawData,
  filteredIdsBasedOnSearchBox,
  filteredIdsBasedOnCheckboxes,
  uid
) => {
  const idsToCheck = rawData.map((d) => d[uid]);

  const filteredBySearchAndCheckbox = getIdsOfItemsMatchingSearchResults(
    idsToCheck,

    filteredIdsBasedOnCheckboxes,
    filteredIdsBasedOnSearchBox
  );

  const data = rawData.filter((d) =>
    filteredBySearchAndCheckbox.includes(d[uid])
  );

  const idsOfFilteredData = filteredBySearchAndCheckbox;
  const filteredData = data;

  return { idsOfFilteredData, filteredData };
};

export { getFilteredData };
