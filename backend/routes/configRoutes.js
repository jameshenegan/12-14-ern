const express = require("express");
const router = express.Router();

const display = require("../config/display.json");
const varDoi = require("../config/varDoiFrontend.json");
const columnsOnMainTable = require("../config/columnsOnMainTable.json");
const categoricalColumns = require("../config/categoricalColumns.json");
const fieldsToSearch = require("../config/fieldsToSearch.json");

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

router.get("/fieldsToSearch", (req, res) => {
  res.status(200).json(fieldsToSearch);
});

module.exports = router;
