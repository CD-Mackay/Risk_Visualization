import getDataSet from "@/app/api/dataset/route";
// import ShowMap from "@/components/Map/ShowMap";
import ShowChart from "@/components/Chart/ShowChart";
import TableGrid from "@/components/TableGrid/TableGrid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ShowMap = dynamic(() => import("@/components/Map/ShowMap"), {
  ssr: false,
});

interface Props {
  dataset: Array<string>;
}

// [key: string]: number; Syntax for proptype to be used in DataTable component

const Data: NextPage<Props> = ({ dataset }) => {

  const [decade, setDecade] = useState(2030);
  const [isMounted, setIsMounted] = useState(false);
  const [geoData, setGeoData] = useState({ lat: 53.51684, lng: -113.3187 });

  const center: [number, number] = [geoData.lat, geoData.lng];

  
  // Testing data section //

  let sameBusiness = dataset.filter((element) => {
    return element[1] === "45.44868";
  });

  let locationData = dataset.filter((element) => {
    return Number(element[1]) === geoData.lat && Number(element[2]) === geoData.lng
  });

  console.log("locationData:", locationData);

  let assetData = dataset.filter((element) => {
    return element[0] === 'Ware PLC'
  });

  // console.log("assetData:", assetData);


  // NOTES: Same business asset can have multiple sectors and locations
  //        - Same location can have multiple Business assets at multiple decades

  /// End testing data section
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slicedData = dataset.slice(1, dataset.length);
  const headers = dataset.slice(0, 1);

  const dummyChartData = dataset.slice(2, 3);

  const handleFilterData = (array: Array<string>, number: Number) => {
    return array.filter((element) => {
      return Number(element[6]) === decade;
    });
  };

  const handleDecadeChange = (event: any) => {
    setDecade(event.target.value);
  };

  let passedData = handleFilterData(slicedData, decade);

  const handleChangeCenter = (lat:number, lng:number) => {
    setGeoData({
      lat: lat,
      lng: lng
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Select Decade</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={decade}
          label="Set Decade"
          onChange={handleDecadeChange}
        >
          <MenuItem value={2030}>2030</MenuItem>
          <MenuItem value={2040}>2040</MenuItem>
          <MenuItem value={2050}>2050</MenuItem>
          <MenuItem value={2060}>2060</MenuItem>
          <MenuItem value={2070}>2070</MenuItem>
        </Select>
      </FormControl>
      <ShowChart dataset={locationData} headers={headers} />
      {isMounted === true && <ShowMap dataset={passedData} handleChangeCenter={handleChangeCenter} geoData={geoData} center={center} />}
      <TableGrid dataset={passedData} />
    </main>
  );
};

export async function getStaticProps() {
  // Warning: data for page "/data" is 955 kB which exceeds the threshold of 128 kB, this amount of data can reduce performance.
  const dataset = await getDataSet();
  return {
    props: {
      dataset,
    },
  };
}

export default Data;
