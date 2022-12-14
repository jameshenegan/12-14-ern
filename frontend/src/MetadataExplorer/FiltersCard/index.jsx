import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import FilterTableModals from "./FilterTableModals";

import InfoOnSelectedCheckboxes from "./InfoOnSelectedCheckboxes";

export default function BasicCard({ display, categoricalColumns }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom component="div">
          Filters
        </Typography>
        <InfoOnSelectedCheckboxes></InfoOnSelectedCheckboxes>

        <FilterTableModals
          display={display}
          categoricalColumns={categoricalColumns.filter(
            (d) => d["type"] === "primary"
          )}
        ></FilterTableModals>
      </CardContent>
    </Card>
  );
}
