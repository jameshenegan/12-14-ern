/*
When we open up a table of categories,
we will want to know how many matches there are in the unfiltered data...
*/

const getCounts = (rawData, categoricalColumn, categoriesAndCounts, uid) => {
  const mappedData = rawData.map((d) => d[categoricalColumn]);

  const results = {};
  for (const categoryAndCount of categoriesAndCounts) {
    const { category } = categoryAndCount;
    results[category] = 0;
  }

  for (const category of mappedData) {
    results[category] += 1;
  }

  return results;
};

export { getCounts };
