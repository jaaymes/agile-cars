import { useEffect, useState } from 'react';

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  // setRodandoLocal
  const [rodandoLocal, setRodandoLocal] = useState(false)

  const router = useRouter();

  useEffect(() => {
    rodandoLocal ? router.push("/shop") : router.push("/shop.html")
  }, [rodandoLocal]);

  useEffect(() => {
    if (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1)
      setRodandoLocal(true);
    else
      setRodandoLocal(false);
  }, [router]);

  return (
    <Head>
      <title>Agile Veículos</title>
    </Head>
  )
}

export default Home
