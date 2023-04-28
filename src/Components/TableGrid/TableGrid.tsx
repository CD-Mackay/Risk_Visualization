import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

interface TableGridProps {
  dataset: Array<string>;
}

const TableGrid = ({ dataset }: TableGridProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Implement filter functionality on reasonable columns, especially risk factors.

  const handlePageSelect = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  function createData(
    id: number,
    assetName: string,
    // lat: string,
    // lng: string,
    businessCategory: string,
    riskRating: number,
    riskFactors: string,
    year: number
  ) {
    return {
      id,
      assetName,
      // lat,
      // lng,
      businessCategory,
      riskRating,
      riskFactors,
      year,
    };
  }

  const columns: GridColDef[] = [
    { field: "assetName", headerName: "Asset Name", width: 160 },
    { field: "businessCategory", headerName: "Sector", width: 120 },
    {
      field: "riskRating",
      headerName: "Risk Rating",
      width: 100,
      type: "number",
    },
    { field: "riskFactors", headerName: "Risk Factors", width: 600 },
    { field: "year", headerName: "Year", width: 60, type: "number" },
  ];

  const rows = dataset.map((element, index) => {
    const riskData = JSON.parse(element[5]);
    for (let element in riskData) {
      if (riskData[element] === 0.0) {
        delete riskData[element]
      }
    }
    const showRisk = Object.keys(riskData).join(",")
    return createData(
      index,
      element[0],
      // element[1],
      // element[2],
      element[3],
      Number(element[4]),
      showRisk, // Convert data type to eliminate string quotes on object
      Number(element[6]) // remove number conversion
    );
  });

  return (
    <Paper>
      <DataGrid
        rows={rows}
        // paginationModel={{ page: 0, pageSize: 10 }}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default TableGrid;
