import { useEffect } from 'react';

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1) {
      router.push("/shop")
    } else {
      router.push("/shop.html")
    }
  }, []);


  return (
    <Head>
      <title>Agile Veículos</title>
    </Head>
  )
}

export default Home
