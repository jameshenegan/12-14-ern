const filterByKeyWord = (keyword, inputData, fieldsToSearch, exactMatchOn) => {
  // for each datum of inputData, check to see:
  //   is the current keyword in any of the fieldsToSearch?
  const outputData = [];
  for (const datum of inputData) {
    let shouldIncludeDatum = false;
    for (const field of fieldsToSearch) {
      let value = datum[field];

      if (typeof value === "number") {
        value = value.toString();
      }

      if (value) {
        value = value.toLowerCase();

        if (exactMatchOn) {
          if (value === keyword) {
            shouldIncludeDatum = true;
          }
        } else {
          if (value.includes(keyword)) {
            shouldIncludeDatum = true;
          }
        }
      }
    }
    if (shouldIncludeDatum) {
      outputData.push(datum);
    }
  }

  return outputData;
};

export { filterByKeyWord };
