import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "leaflet/dist/leaflet.css";

interface TableGridProps {
  dataset: Array<string>;
  chartParam: {
    param: string;
    currentValue: string;
  };
}

const TableGrid = ({ dataset, chartParam }: TableGridProps) => {
  function createData(
    id: number,
    assetName: string,
    businessCategory: string,
    riskRating: number,
    riskFactors: string,
    greatestRisk: string,
    year: number
  ) {
    return {
      id,
      assetName,
      businessCategory,
      riskRating,
      riskFactors,
      greatestRisk,
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
    { field: "greatestRisk", headerName: "Greatest Risk(s)", width: 400 },
    { field: "year", headerName: "Year", width: 60, type: "number" },
  ];

  const rows = dataset.map((element, index) => {
    const riskData = JSON.parse(element[5]);
    var riskArr = Object.keys(riskData).map(function (key) {
      return riskData[key];
    });
    let max = Math.max.apply(null, riskArr);
    let greatest: any = {};
    for (let element in riskData) {
      if (riskData[element] === 0.0) {
        delete riskData[element];
      }
      if (riskData[element] === max) {
        greatest[element] = max;
      }
    }
    const showRisk = Object.keys(riskData).join(",");
    let renderGreatest = JSON.stringify(greatest);
    return createData(
      index,
      element[0],
      element[3],
      Number(element[4]),
      showRisk,
      renderGreatest,
      Number(element[6]) // remove number conversion
    );
  });

  return (
    <Paper>
      <h3>
        Risk Data by {chartParam.param} for {chartParam.currentValue}
      </h3>
      <DataGrid
        rows={rows}
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
