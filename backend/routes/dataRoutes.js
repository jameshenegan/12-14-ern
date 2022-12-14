const express = require("express");
const router = express.Router();

const { loadCsvFile } = require("../helpers/loadCsvFile");

// Load the CSV file of data into memory
const data = loadCsvFile("backend/csv-files/data.csv");

console.log({ data });

// Test the endpoint
router.get("/records", (req, res) => {
  res.status(200).json(data);
});

module.exports = router;
