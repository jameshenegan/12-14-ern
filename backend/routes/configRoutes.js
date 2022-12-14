const express = require("express");
const router = express.Router();

const display = require("../config/display.json");
const varDoi = require("../config/varDoi.json");
const columnsOnMainTable = require("../config/columnsOnMainTable.json");
const categoricalColumns = require("../config/categoricalColumns.json");

router.get("/display", (req, res) => {
  res.status(200).json(display);
});

router.get("/varDoi", (req, res) => {
  res.status(200).json(varDoi);
});

router.get("/categoricalColumns", (req, res) => {
  res.status(200).json(categoricalColumns);
});

router.get("/columnsOnMainTable", (req, res) => {
  res.status(200).json(columnsOnMainTable);
});

module.exports = router;
