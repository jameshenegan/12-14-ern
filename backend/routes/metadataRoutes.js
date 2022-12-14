const express = require("express");

const { loadCsvFile } = require("../helpers/loadCsvFile");
const { getArrayOfVarDois } = require("../helpers/getArrayOfVarDois");
const {
  getMetadataFieldsWithVarDoi,
} = require("../helpers/getMetadataFieldsWithVarDoi");

// Config
const varDoi = require("../config/varDoi.json");
const searchableFields = require("../config/searchableFields.json");

// Main program
const router = express.Router();

const metadata = loadCsvFile("backend/csv-files/variable-level-metadata.csv");
const arrayOfVarDois = getArrayOfVarDois(metadata, varDoi);
const searchableMetadata = getMetadataFieldsWithVarDoi(
  searchableFields,
  metadata,
  varDoi
);

// Endpoints
router.get("/records", (req, res) => {
  res.status(200).json(metadata);
});

router.get("/arrayOfVarDois", (req, res) => {
  res.status(200).json(arrayOfVarDois);
});

router.get("/searchableMetadata", (req, res) => {
  res.status(200).json(searchableMetadata);
});

module.exports = router;
