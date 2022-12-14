const getMetadataFieldsWithVarDoi = (columnsToKeep, data, varDoi) => {
  const mappedData = [];

  for (const datum of data) {
    const mappedDatum = {};
    mappedDatum["varDoi"] = datum[varDoi];
    for (const column of columnsToKeep) {
      mappedDatum[column] = datum[column];
    }
    mappedData.push(mappedDatum);
  }

  return mappedData;
};

module.exports = { getMetadataFieldsWithVarDoi };
