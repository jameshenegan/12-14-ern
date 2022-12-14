import React from "react";
import Checkbox from "@mui/material/Checkbox";

import { useSelector, useDispatch } from "react-redux";
import {
  handleStagingCheckboxClick,
  selectIdsOfItemsInStagingArea,
} from "../slice";

function StagingCheckbox({ uid }) {
  const idsOfItemsInStagingArea = useSelector(selectIdsOfItemsInStagingArea);
  const checked = idsOfItemsInStagingArea.includes(uid);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(handleStagingCheckboxClick(uid));
  };

  return (
    <Checkbox
      size="small"
      sx={{ width: 10, height: 10 }}
      onClick={handleClick}
      checked={checked}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

export default StagingCheckbox;
