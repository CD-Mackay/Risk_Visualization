import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "leaflet/dist/leaflet.css";

interface ShowTableProps {
  dataset: Array<string>;
  headers: Array<string>;
}

const ShowTable = ({ dataset, headers }: ShowTableProps) => {

  function createData(
    assetName: string,
    lat: string,
    lng: string,
    businessCategory: string,
    riskRating: string,
    riskFactors: string,
    year: string
  ) {
    return { assetName, lat, lng, businessCategory, riskRating, riskFactors, year}
  }

  const rows = dataset.map((element) => {
    return createData(element[0], element[1], element[2], element[3], element[4], element[5], element[6])
  })

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Asset Name</TableCell>
          <TableCell align="right">latitude</TableCell>
          <TableCell align="right">longtitude</TableCell>
          <TableCell align="right">Business Category</TableCell>
          <TableCell align="right">Risk Rating</TableCell>
          <TableCell align="right">Risk Factors</TableCell>
          <TableCell align="right">Year</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row:any) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.assetName}
            </TableCell>
            <TableCell align="right">{row.lat}</TableCell>
            <TableCell align="right">{row.lng}</TableCell>
            <TableCell align="right">{row.businessCategory}</TableCell>
            <TableCell align="right">{row.riskRating}</TableCell>
            <TableCell align="right">{row.riskFactors}</TableCell>
            <TableCell align="right">{row.year}</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default ShowTable;
