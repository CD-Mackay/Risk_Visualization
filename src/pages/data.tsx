import getDataSet from "@/app/api/dataset/route";
import { NextPage } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface riskFactors {

}

type Props = {
  dataset: Array<string>
};

// [key: string]: number; Syntax for proptype to be used in DataTable component

const Data: NextPage<Props> = ({ dataset }) => {

  console.log("dataset:", dataset)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
