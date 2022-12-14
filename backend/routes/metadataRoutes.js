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
const varDoiBackend = require("../config/varDoiBackend.json");
const searchableFields = require("../config/searchableFields.json");
const columnsOnMainTable = require("../config/columnsOnMainTable.json");
const categoricalColumns = require("../config/categoricalColumns.json");

// Load data into the Node environment
const metadata = loadCsvFile("backend/csv-files/variable-level-metadata.csv");
const arrayOfVarDois = getArrayOfVarDois(metadata, varDoiBackend);
const searchableMetadata = getMetadataFieldsWithVarDoi(
  searchableFields,
  metadata,
  varDoiBackend
);

const metadataForMainTable = getMetadataFieldsWithVarDoi(
  columnsOnMainTable,
  metadata,
  varDoiBackend
);

const rawMetadataForCategoricalColumns = getMetadataFieldsWithVarDoi(
  categoricalColumns.map((d) => d["categoricalColumn"]),
  metadata,
  varDoiBackend
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

router.get("/rawMetadataForCategoricalColumns", (req, res) => {
  res.status(200).json(rawMetadataForCategoricalColumns);
});

module.exports = router;
