import { useQuery, QueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { dehydrate } from "react-query/hydration";
import KoleksiTerbaik from "../src/components/koleksi-terbaik";
import Product from "../src/components/product";
import Oprator from "../src/components/oprator";
import Navbar from "../src/components/navbar";
import Footer from "../src/components/footer";
import axios from "axios";
import Head from "next/head";

const getProduct = async () => {
  const response = await axios.get("http://localhost:3000/api/product/home");
  const data = response.data.products;
  return data;
};
const getProductKoleksi = async (title) => {
  const response = await axios.get(
    `http://localhost:3000/api/product/jenis-product/${title}`
  );
  const data = response.data.products;
  return data;
};

export default function Home() {
  const [totalProductDisplayed, setTotalProductDisplayed] = useState(5);
  const [slide, setSlide] = useState();

  const device1 = useMediaQuery({
    maxWidth: `${83.5}vmax`,
    minWidth: `${67.1}vmax`,
  });
  const device2 = useMediaQuery({
    maxWidth: `${67}vmax`,
    minWidth: `${50.6}vmax`,
  });
  const device3 = useMediaQuery({
    maxWidth: `${55.5}vmax`,
    minWidth: `${33.1}vmax`,
  });
  const device4 = useMediaQuery({
    maxWidth: `${33}vmax`,
  });

  useEffect(() => {
    if (device1) setSlide(4);
    else if (device2) setSlide(2);
    else if (device3) setSlide(3);
    else if (device4) setSlide(1);
    else setSlide(5);
  }, [device1, device2, device3, device4]);

  const { data } = useQuery("products-home", () => getProduct(), {
    refetchInterval: 20000,
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="nomor cantik. nomor mengambarkan identitasmu"
        />
        <title>Nomor Sultan</title>
      </Head>
      <Navbar />
      <main className="flex-1">
        <Oprator />
        <KoleksiTerbaik
          title={"terbaik"}
          slide={slide}
          getProductKoleksi={getProductKoleksi}
        />
        <KoleksiTerbaik
          title={"termurah"}
          slide={slide}
          getProductKoleksi={getProductKoleksi}
        />
        <section className="bg-white">
          <div className="mt-[1.2vmax] h-[5.5vmax] flex text-[2.6vmax] border-b mb-[1.4vmax]">
            <h1 className="m-auto">REKOMENDASI</h1>
          </div>

          <Product
            data={data}
            totalProductDisplayed={totalProductDisplayed}
            setTotalProductDisplayed={setTotalProductDisplayed}
          />
          {totalProductDisplayed && data ? (
            <div className="w-full flex py-[1vmax]">
              <button
                className="m-auto solid h-[3vmax] w-[10.5vmax] rounded-[2.5vmax] btn-secondary text-[1.3vmax]"
                onClick={() => setTotalProductDisplayed((prev) => prev + 3)}
              >
                Lihat Lainnya
              </button>
            </div>
          ) : (
            ""
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("products-home", () => getProduct());
  await queryClient.prefetchQuery("products-koleksi-terbaik", () =>
    getProductKoleksi("terbaik")
  );
  await queryClient.prefetchQuery("products-koleksi-termurah", () =>
    getProductKoleksi("termurah")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
