import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../src/utils/provider";
import axios from "axios";
import Head from "next/head";
import io from "socket.io-client";
import Navbar from "../src/components/navbar";
import Oprator from "../src/components/oprator";
import KoleksiTerbaik from "../src/components/koleksi-terbaik";
import Product from "../src/components/product";
import Footer from "../src/components/footer";

export default function Home({ data }) {
  const [totalProductDisplayed, setTotalProductDisplayed] = useState(5);
  // const [data, setData] = useState();
  const { slide } = useContext(ItemContext);

  // const handleProduct = async () => {
  //   try {
  //     const response = await axios.get("/api/product/home");
  //     setData(response.data.products);
  //   } catch {
  //     setData(false);
  //   }
  // };

  // useEffect(() => {
  //   const socket = io({
  //     pingInterval: 20000,
  //     pingTimeout: 10000,
  //   });

  //   socket.on("product-update", async (data) => {
  //     await handleProduct();
  //   });

  //   const socketInitializer = async () => {
  //     await handleProduct();
  //     await fetch("/api/socket");
  //   };
  //   socketInitializer();
  // }, []);

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
        <KoleksiTerbaik title={"terbaik"} slide={slide} />
        <KoleksiTerbaik title={"termurah"} slide={slide} />
        <section className="bg-white">
          <div className="mt-[1.2vmax] h-[5.5vmax] flex text-[2.6vmax] border-b mb-[1.4vmax]">
            <h1 className="m-auto">REKOMENDASI</h1>
          </div>
          <Product
            data={data}
            totalProductDisplayed={totalProductDisplayed}
            setTotalProductDisplayed={setTotalProductDisplayed}
          />
          {totalProductDisplayed && (
            <div className="w-full flex py-[1vmax]">
              <button
                className="m-auto solid h-[3vmax] w-[10.5vmax] rounded-[2.5vmax] btn-secondary text-[1.3vmax]"
                onClick={() => setTotalProductDisplayed((prev) => prev + 3)}
              >
                Lihat Lainnya
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(contex) {
  try {
    const response = await axios.get("http://localhost:3000/api/product/home");
    const data = response.data.products;
    console.log("hit")
    return {
      props: { data },
    };
  } catch {
    const data = false;
    return {
      props: { data },
    };
  }
}
