const express = require("express");
const router = express.Router();

const { loadCsvFile } = require("../helpers/loadCsvFile");
const { getColumnsFromData } = require("../helpers/getColumnsFromData");

// Load the CSV file of data into memory
const data = loadCsvFile("backend/csv-files/data.csv");
const metadata = loadCsvFile("backend/csv-files/variable-level-metadata.csv");

// Test the endpoint
router.get("/records", (req, res) => {
  res.status(200).json(data);
});

// When the user sends a POST request to this endpoint
// with a list of variable DOI's in the body,
// the user will get the columns of the CSV file
// corresponding to those variables.
router.post("/getSelectedVariables", (req, res) => {
  const listOfVarDoisTokeep = req.body;
  const filteredMetadata = metadata.filter((d) =>
    listOfVarDoisTokeep.includes(d["var_doi"])
  );
  const varNames = filteredMetadata.map((d) => d["var_name"]);

  const selectedColumns = getColumnsFromData(varNames, data);
  res.status(200).json(selectedColumns);
});

module.exports = router;
