import getDataSet from "@/app/api/dataset/route";
// import ShowMap from "@/components/Map/ShowMap";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
const ShowMap = dynamic(() => import('@/components/Map/ShowMap'), {
  ssr: false,
})

interface Props {
  dataset: Array<string>
};

// [key: string]: number; Syntax for proptype to be used in DataTable component

const Data: NextPage<Props> = ({ dataset }) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const slicedData = dataset.slice(1, dataset.length);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isMounted === true && <ShowMap dataset={slicedData } />}
    </main>
  );
};

export async function getStaticProps() {
  // Warning: data for page "/data" is 955 kB which exceeds the threshold of 128 kB, this amount of data can reduce performance.
  const dataset = await getDataSet();
  return { props: { 
    dataset,
  } };
}

export default Data;
