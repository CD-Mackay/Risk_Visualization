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
  const [chartParam, setChartParam] = useState({
    param: "location",
    currentValue: JSON.stringify(geoData),
  });

  const center: [number, number] = [geoData.lat, geoData.lng];

  // Testing data section //

  let sameCategoryData = dataset.filter((element) => {
    return element[1] === "45.44868";
  });

  let sameLocationData = dataset.filter((element) => {
    return (
      Number(element[1]) === geoData.lat && Number(element[2]) === geoData.lng
    );
  });

  let sameAssetData = dataset.filter((element) => {
    return element[0] === chartParam.currentValue;
  });

  let bus: Array<string> = [];
  dataset.map((element) => {
    bus.push(element[0]);
  });

  let uniqNames = bus.filter(function (item, pos) {
    return bus.indexOf(item) == pos;
  });

  let cat: Array<string> = [];
  dataset.map((element) => {
    cat.push(element[3]);
  });

  let uniqCategory = cat.filter(function (item, pos) {
    return cat.indexOf(item) == pos;
  });

  const decades = [2030, 2040, 2050, 2060, 2070];


  // NOTES: Same business asset can have multiple sectors and locations
  //        - Same location can have multiple Business assets at multiple decades

  /// End testing data section

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slicedData = dataset.slice(1, dataset.length);
  const headers = dataset.slice(0, 1);

  const handleFilterData = (array: Array<string>, number: Number) => {
    return array.filter((element) => {
      return Number(element[6]) === decade;
    });
  };

  const handleDecadeChange = (event: any) => {
    setDecade(event.target.value);
  };

  const handleParamChange = (event: any, input: string) => {
    setChartParam({
      param: input,
      currentValue: event.target.value,
    });
  };

  let passedData = handleFilterData(slicedData, decade);

  const handleChangeCenter = (lat: number, lng: number) => {
    setGeoData({
      lat: lat,
      lng: lng,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">
          Search by Business Asset
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          // value={chartParam.param}
          label="Search By Business Asset"
          onChange={(event) => handleParamChange(event, "Business Asset")}
          defaultValue={""}
        >
          {uniqNames.map((element, index) => {
            return (
              <MenuItem key={index} value={element}>
                {element}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">
          Search by Business Category
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          // value={chartParam.param}
          label="Search By Business Category"
          onChange={(event) => handleParamChange(event, "Business Category")}
          defaultValue={""}
        >
          {uniqCategory.map((element, index) => {
            return (
              <MenuItem key={index} value={element}>
                {element}
              </MenuItem>
            );
          })}
        </Select>
        <span>
          Note: Line Chart displays risk factor by geographic location, use
          dropdown to select business
        </span>
      </FormControl>
      <ShowChart
        dataset={sameLocationData}
        geoData={geoData}
        chartParam={chartParam}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Select Decade</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          // value={decade}
          label="Set Decade"
          onChange={handleDecadeChange}
          defaultValue={""}
        >
          {/* {decades.map((element, index) => {
            return <MenuItem key={index} value={element}>{element}</MenuItem>
          })} */}
          <MenuItem value={2030}>2030</MenuItem>
          <MenuItem value={2040}>2040</MenuItem>
          <MenuItem value={2050}>2050</MenuItem>
          <MenuItem value={2060}>2060</MenuItem>
          <MenuItem value={2070}>2070</MenuItem>
        </Select>
      </FormControl>
      {isMounted === true && (
        <ShowMap
          dataset={
            chartParam.param === "location"
              ? sameLocationData
              : chartParam.param === "Asset Name"
              ? sameAssetData
              : chartParam.param === "Category"
              ? sameCategoryData
              : sameLocationData
          }
          handleChangeCenter={handleChangeCenter}
          geoData={geoData}
          center={center}
        />
      )}
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
