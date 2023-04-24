//  import { NextPage } from "next";

//  type Props = {
//    title: string;
//  };

//  const HomePage: NextPage<Props> = ({ title }) => {
//    return (
//      <div>
//        <h1>{title}</h1>
//        <p>Welcome to my home page!</p>
//      </div>
//    );
//  };

//  HomePage.getInitialProps = async () => {
//    // fetch some data here
//    return { title: "My Home Page" };
//  };

import { NextPage } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  data: string;
};

const Home: NextPage<Props> = ({ data }) => {
  console.log("dataset:", data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hi Karl</p>
      <p>{data}</p>
    </main>
  );
};

// export async function getStaticProps() {
//   // const dataset = await getDataSet();
//   console.log("Ran getInitialProps");
//   const data = "This is the initial prop";
//   return { props: { data } };
// };

export default Home;
