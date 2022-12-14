import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableDisplay({
  data,
  columnsOnMainTable,
  display,
  varDoi,
}) {
  const renderTableHead = (colNames) => {
    return (
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {colNames.map((colName, i) => {
            const key = `col-${i}`;
            return <TableCell key={key}>{display[colName]}</TableCell>;
          })}
        </TableRow>
      </TableHead>
    );
  };

  const renderTableBody = (data, colNames) => {
    return data.map((datum, i) => renderTableRow(datum, colNames, i));
  };

  const renderTableRow = (datum, colNames, i) => {
    return (
      <TableRow
        key={datum[varDoi]}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&:nth-of-type(odd)": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <TableCell></TableCell>
        {colNames.map((colName) => {
          return (
            <TableCell key={`${datum[colName]}::${i}::${colName}`}>
              {datum[colName]}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  // Main Render Function
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        {renderTableHead(columnsOnMainTable)}
        <TableBody>{renderTableBody(data, columnsOnMainTable)}</TableBody>
      </Table>
    </TableContainer>
  );
}
