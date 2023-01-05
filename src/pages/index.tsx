import { useEffect } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/shop");
  }, []);

  return (
    <Head>
      <title>Agile Veículos</title>
    </Head>
  );
};

export default Home;
