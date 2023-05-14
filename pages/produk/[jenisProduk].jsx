import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import axios from "axios";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../src/components/navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../src/components/footer"), {
  ssr: false,
});
const Product = dynamic(() => import("../../src/components/product"), {
  ssr: false,
});

const getProduct = async (jenisProduk) => {
  const response = await axios.get(
    `http://localhost:3000/api/product/jenis-product/${jenisProduk}`
  );
  const data = response.data.products;
  return data;
};

export default function JenisProduk({ jenisProduk }) {
  const { data } = useQuery(
    `products-jenisProduk-${jenisProduk}`,
    () => getProduct(jenisProduk),
    {
      refetchInterval: 20000,
    }
  );
  return (
    <>
      <Navbar />
      <main className="pt-[9vmax] flex-1">
        <div className="bg-white">
          <div className="mt-[1.2vmax] h-[5.5vmax] flex text-[2.6vmax] border-b mb-[1.4vmax]">
            <h1 className="m-auto uppercase">Produk {jenisProduk}</h1>
          </div>
          <Product data={data} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get("http://localhost:3000/api/jenis-product");
    const data = response.data.product;
    const paths = data.map((products) => ({
      params: {
        jenisProduk: products.jenisProduk.toString(),
      },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch {
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(contex) {
  const jenisProduk = contex?.params?.jenisProduk || null;
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(`products-jenisProduk-${jenisProduk}`, () =>
      getProduct(jenisProduk)
    );
    const dehydratedState = { dehydratedState: dehydrate(queryClient) };
    return {
      props: {
        dehydratedState,
        jenisProduk,
      },
    };
  } catch (err) {
    console.error(err);
  }
}
