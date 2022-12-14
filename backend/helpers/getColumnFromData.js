const getColumnFromData = (columnName, data) => {
  const mappedData = data.map((d) => d[columnName]);
  return mappedData;
};

module.exports = { getColumnFromData };
