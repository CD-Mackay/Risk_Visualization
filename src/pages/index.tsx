import getDataSet from "@/app/api/dataset/route";
import ShowChart from "@/components/Chart/ShowChart";
import TableGrid from "@/components/TableGrid/TableGrid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import "./index.css";
const ShowMap = dynamic(() => import("@/components/Map/ShowMap"), {
  ssr: false,
});

interface Props {
  dataset: Array<string>;
}

const Data: NextPage<Props> = ({ dataset }) => {
  const [decade, setDecade] = useState(2030);
  const [isMounted, setIsMounted] = useState(false);
  const [geoData, setGeoData] = useState({ lat: 53.51684, lng: -113.3187 });
  const [chartParam, setChartParam] = useState({
    param: "location",
    currentValue: JSON.stringify(geoData),
  });

  const revertToDefaultChartParam = () => {
    setChartParam({
      param: "location",
      currentValue: JSON.stringify(geoData),
    });
  };

  const center: [number, number] = [geoData.lat, geoData.lng];

  const makeSameCatData = () => {
    return dataset.filter((element) => {
      return element[3] === chartParam.currentValue;
    });
  };

  const makeSameLocationData = () => {
    return dataset.filter((element) => {
      return (
        Number(element[1]) === geoData.lat && Number(element[2]) === geoData.lng
      );
    });
  };

  const makeSameAssetData = () => {
    return dataset.filter((element) => {
      return element[0] === chartParam.currentValue;
    });
  };

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slicedData = dataset.slice(1, dataset.length);

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

  const handleChangeGeoData = (num1: number, num2: number) => {
    setGeoData({
      lat: num1,
      lng: num2,
    });
  };

  let passedData = handleFilterData(slicedData, decade);

  let chartData =
    chartParam.param === "location"
      ? makeSameLocationData()
      : chartParam.param === "Asset Name"
      ? makeSameAssetData()
      : chartParam.param === "Business Category"
      ? makeSameCatData()
      : makeSameLocationData();

  const handleChangeCenter = (lat: number, lng: number) => {
    setGeoData({
      lat: lat,
      lng: lng,
    });
  };

  return (
    <div>
      <Head>
        <title>Climate Change Risk Visualizer</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="header-container">
          <h1>Climate Risk Visualizer</h1>
        <div className="map-controls-container">
          <div className="individual-control-wrapper">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Decade
              </InputLabel>
              <Select
                className="select"
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Set Decade"
                onChange={handleDecadeChange}
                defaultValue={""}
              >
                {decades.map((element, index) => {
                  return (
                    <MenuItem key={index} value={element}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button onClick={revertToDefaultChartParam}>
              Revert to default
            </Button>
          </div>
          <div className="individual-control-wrapper">
            <FormControl
              sx={{ m: 1, minWidth: 300, maxWidth: 400 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">
                Search by Asset Name
              </InputLabel>
              <Select
                className="select"
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Search By Asset Name"
                onChange={(event) => handleParamChange(event, "Asset Name")}
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
          </div>
          <div className="individual-control-wrapper">
            <FormControl
              sx={{ m: 1, minWidth: 300, maxWidth: 508 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">
                Search by Business Category
              </InputLabel>
              <Select
                className="select"
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Search By Business Category"
                onChange={(event) =>
                  handleParamChange(event, "Business Category")
                }
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
            </FormControl>
            <span>
              *Map displays risk data from 2030 by default, use dropdown to
              change decade
            </span>
          </div>
        </div>
        </div>
        <div className="upper-container">
          <div className="map-container">
            {isMounted === true && (
              <ShowMap
                dataset={passedData}
                handleChangeCenter={handleChangeCenter}
                geoData={geoData}
                center={center}
                handleChangeGeoData={handleChangeGeoData}
              />
            )}
          </div>
          <div className="line-container">
            <div className="line-controls-wrapper"></div>
            <ShowChart
              dataset={chartData}
              geoData={geoData}
              chartParam={chartParam}
            />
          </div>
        </div>
        <TableGrid
          dataset={chartData}
          chartParam={chartParam}
          geoData={geoData}
        />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const dataset = await getDataSet();
  return {
    props: {
      dataset,
    },
  };
}

export default Data;
