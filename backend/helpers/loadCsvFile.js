const fs = require("fs");
const Papa = require("papaparse");

const loadCsvFile = (pathToData) => {
  const rawText = fs.readFileSync(pathToData, {
    encoding: "utf8",
    flag: "r",
  });
  const results = Papa.parse(rawText, {
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true,
  });

  const { data } = results;

  return data;
};

module.exports = { loadCsvFile };
