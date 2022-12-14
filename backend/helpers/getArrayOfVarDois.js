const getArrayOfVarDois = (data, varDoi) => {
  return data.map((datum) => datum[varDoi]);
};

module.exports = { getArrayOfVarDois };
