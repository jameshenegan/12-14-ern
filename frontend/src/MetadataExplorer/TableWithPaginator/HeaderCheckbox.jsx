import React from "react";
import Checkbox from "@mui/material/Checkbox";

import { useSelector, useDispatch } from "react-redux";

import {
  selectIdsOfFilteredMetadata,
  selectIdsOfItemsInStagingArea,
  resetIdsOfItemsInStagingArea,
  setIdsOfItemsInStagingArea,
} from "../slice";

function HeaderCheckbox() {
  const dispatch = useDispatch();
  const idsOfFilteredData = useSelector(selectIdsOfFilteredMetadata);
  const idsOfItemsInStagingArea = useSelector(selectIdsOfItemsInStagingArea);

  const shouldBeChecked = (idsOfFilteredData, idsOfItemsInStagingArea) => {
    let shouldBeChecked = true;
    for (const id of idsOfFilteredData) {
      if (!idsOfItemsInStagingArea.includes(id)) {
        shouldBeChecked = false;
        return shouldBeChecked;
      }
    }
    return shouldBeChecked;
  };

  const checked = shouldBeChecked(idsOfFilteredData, idsOfItemsInStagingArea);

  const handleClick = () => {
    if (checked) {
      dispatch(resetIdsOfItemsInStagingArea());
    } else {
      const newIdsOfItemsInStagingArea = Array.from(
        new Set([...idsOfItemsInStagingArea, ...idsOfFilteredData])
      );

      dispatch(setIdsOfItemsInStagingArea(newIdsOfItemsInStagingArea));
    }
  };

  return (
    <Checkbox
      size="small"
      sx={{ width: 10, height: 10 }}
      checked={checked}
      onClick={handleClick}
    />
  );
}

export default HeaderCheckbox;
