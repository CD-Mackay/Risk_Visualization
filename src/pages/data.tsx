import getDataSet from "@/app/api/dataset/route";
// import ShowMap from "@/components/Map/ShowMap";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
const DynamicMap = dynamic(() => import('@/components/Map/ShowMap'), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] });

type Props = {
  dataset: Array<string>
};

// [key: string]: number; Syntax for proptype to be used in DataTable component

const Data: NextPage<Props> = ({ dataset }) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log("dataset:", dataset)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isMounted === true && <DynamicMap />}
      {/* {isMounted === true && <ShowMap />} */}
    </main>
  );
};

export async function getStaticProps() {
  const dataset = await getDataSet();
  return { props: { 
    dataset,
  } };
}

export default Data;
