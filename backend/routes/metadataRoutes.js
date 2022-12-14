const express = require("express");
const router = express.Router();

const { loadCsvFile } = require("../helpers/loadCsvFile");

const metadata = loadCsvFile("backend/csv-files/variable-level-metadata.csv");

// Test the endpoint
router.get("/records", (req, res) => {
  res.status(200).json(metadata);
});

module.exports = router;
