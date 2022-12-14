import { filterByKeyWord } from "./filterByKeyword";

const getFilteredIdsBasedOnSearchBox = (
  searchableMetadata,
  queryString,
  uid,
  fieldsToSearch
) => {
  let unfilteredData = [...searchableMetadata];

  /*
  Parse the queryString using the following approach.
  https://thewebdev.info/2022/02/13/how-to-get-text-between-double-quotes-with-javascript/
  For now, just check to see if there is a single pair of double quotes.
  If so, pull that out and pass it into `filterByKeywords` with the `exactMatchOn` flag.
  */

  const match = queryString.match(/"((?:\\.|[^"\\])*)"/);
  if (match) {
    const [_, textInQuotes] = match;
    console.log(_);

    let filteredByQueryString = unfilteredData;

    const exactMatchOn = true;
    filteredByQueryString = filterByKeyWord(
      textInQuotes.toLowerCase(),
      filteredByQueryString,
      fieldsToSearch,
      exactMatchOn
    );

    const filteredIdsBasedOnSearchBox = filteredByQueryString.map(
      (datum) => datum[uid]
    );

    return filteredIdsBasedOnSearchBox;
  }

  /*
  If you don't see a single pair of double quotes, then do what you have always done...
  */
  const keywords = queryString.split(" ");
  let filteredByQueryString = unfilteredData;

  for (const keyword of keywords) {
    filteredByQueryString = filterByKeyWord(
      keyword.toLowerCase(),
      filteredByQueryString,
      fieldsToSearch
    );
  }

  const filteredIdsBasedOnSearchBox = filteredByQueryString.map(
    (datum) => datum[uid]
  );

  return filteredIdsBasedOnSearchBox;
};

export { getFilteredIdsBasedOnSearchBox };
