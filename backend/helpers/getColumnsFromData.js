const getColumnsFromData = (columnsToKeep, data) => {
  const mappedData = [];

  for (const datum of data) {
    const mappedDatum = {};
    for (const column of columnsToKeep) {
      mappedDatum[column] = datum[column];
    }
    mappedData.push(mappedDatum);
  }

  return mappedData;
};

module.exports = { getColumnsFromData };
