const express = require("express");

const { loadCsvFile } = require("../helpers/loadCsvFile");
const { getArrayOfVarDois } = require("../helpers/getArrayOfVarDois");

// Config
const varDoi = "var_doi";

// Main program
const router = express.Router();

const metadata = loadCsvFile("backend/csv-files/variable-level-metadata.csv");
const arrayOfVarDois = getArrayOfVarDois(metadata, varDoi);

// Test the endpoint
router.get("/records", (req, res) => {
  res.status(200).json(metadata);
});

router.get("/arrayOfVarDois", (req, res) => {
  res.status(200).json(arrayOfVarDois);
});

module.exports = router;
