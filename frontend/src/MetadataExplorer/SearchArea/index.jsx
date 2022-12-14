import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import SimpleSearch from "./SimpleSearch";

export default function BasicCard() {
  return (
    <Card>
      <CardContent>
        <SimpleSearch></SimpleSearch>
      </CardContent>
    </Card>
  );
}
