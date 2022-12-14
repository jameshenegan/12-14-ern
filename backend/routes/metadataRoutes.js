const express = require("express");

const { loadCsvFile } = require("../helpers/loadCsvFile");
const { getArrayOfVarDois } = require("../helpers/getArrayOfVarDois");
const {
  getMetadataFieldsWithVarDoi,
} = require("../helpers/getMetadataFieldsWithVarDoi");

// Main program

// Set up the router
const router = express.Router();

// Load in some config/data
const varDoi = require("../config/varDoi.json");
const searchableFields = require("../config/searchableFields.json");
const columnsOnMainTable = require("../config/columnsOnMainTable.json");
const categoricalColumns = require("../config/categoricalColumns.json");

// Load data into the Node environment
const metadata = loadCsvFile("backend/csv-files/variable-level-metadata.csv");
const arrayOfVarDois = getArrayOfVarDois(metadata, varDoi);
const searchableMetadata = getMetadataFieldsWithVarDoi(
  searchableFields,
  metadata,
  varDoi
);

const metadataForMainTable = getMetadataFieldsWithVarDoi(
  columnsOnMainTable,
  metadata,
  varDoi
);

const rawMetadataForCategoricalColumns = getMetadataFieldsWithVarDoi(
  categoricalColumns.map((d) => d["categoricalColumn"]),
  metadata,
  varDoi
);

// Serve the data you loaded in through API Endpoints
router.get("/records", (req, res) => {
  res.status(200).json(metadata);
});

router.get("/arrayOfVarDois", (req, res) => {
  res.status(200).json(arrayOfVarDois);
});

router.get("/searchableMetadata", (req, res) => {
  res.status(200).json(searchableMetadata);
});

router.get("/metadataForMainTable", (req, res) => {
  res.status(200).json(metadataForMainTable);
});

router.get("/categoricalColumns", (req, res) => {
  res.status(200).json(categoricalColumns);
});

router.get("/rawMetadataForCategoricalColumns", (req, res) => {
  res.status(200).json(rawMetadataForCategoricalColumns);
});

module.exports = router;
