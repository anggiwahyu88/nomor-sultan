import { ItemContext } from "../../src/utils/provider";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const Navbar = dynamic(() => import("../../src/components/navbar"), {
  ssr: false,
});

const Product = dynamic(() => import("../../src/components/product"), {
  ssr: false,
});
const Filter = dynamic(() => import("../../src/components/filter"), {
  ssr: false,
});

const FormFilter = dynamic(() => import("../../src/components/filter/form"), {
  ssr: false,
});
const Sort = dynamic(() => import("../../src/components/sort"), {
  ssr: false,
});

const Footer = dynamic(() => import("../../src/components/footer"), {
  ssr: false,
});

export default function Search({ data, query }) {
  const [onForm, setOnForm] = useState(false);
  const [typeSort, setTypeSort] = useState("paling sesuai");

  useEffect(() => {
    if (query.sort === "DCS") setTypeSort("harga tertinggi");
    if (query.sort === "ASC") setTypeSort("harga terendah");
  }, [query.sort]);

  return (
    <ItemContext.Provider value={{ setOnForm }}>
      {onForm && <FormFilter data={query} />}
      <Navbar data={query} />
      <main>
        <Filter data={query} />
        <section className="bg-white">
          <div className="mt-[10px] h-[5.5vmax] flex text-[2.6vmax] border-b">
            <h1 className="m-auto">Hasil Pencarian</h1>
          </div>
          <Sort title={typeSort} setTypeSort={setTypeSort} data={query} />
          <Product data={data} />
        </section>
      </main>
      <Footer />
    </ItemContext.Provider>
  );
}

export async function getServerSideProps(contex) {
  const nomor = contex?.query?.nomor || null;
  const oprator = contex?.query?.oprator || null;
  const kategori = contex?.query?.kategori || null;
  const digit = contex?.query?.digit || null;
  const sort = contex?.query?.sort || null;
  if (
    nomor === null ||
    oprator === null ||
    kategori === null ||
    digit === null ||
    sort === null
  ) {
    return {
      notFound: true,
    };
  }
  const query = { nomor, oprator, kategori, digit, sort };
  let data = false;
  try {
    let onOprator = oprator;
    if (onOprator === "all") onOprator = "";
    let onKategori = kategori;
    if (onKategori === "all") onKategori = "";
    let onDigit = digit;
    if (onDigit === "all") onDigit = "";
    const response = await axios.put(
      `http://localhost:3000/api/product/search?type=${sort}`,
      {
        nomor: nomor,
        oprator: onOprator,
        kategori: onKategori,
        digit: onDigit,
      }
      );

    data = response.data.products;

    return {
      props: { data, query },
    };
  } catch {
    return {
      props: { data, query },
    };
  }
}
