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

const getProduct = async (oprator) => {
  const response = await axios.get(
    `http://localhost:3000/api/product/oprator/${oprator}`
  );
  const data = response.data.products;
  return data;
};

export default function Oprator({ oprator }) {
  const { data } = useQuery(
    `products-oprator-${oprator}`,
    () => getProduct(oprator),
    {
      refetchInterval: 20000,
    }
  );
  return (
    <>
      <Navbar />
      <main className="pt-[9vmax] h-screen bg-white">
        <div className="mt-[2vmax] bg-white h-[5.5vmax] flex text-[2.6vmax] border-b">
          <h1 className="m-auto uppercase">{oprator}</h1>
        </div>
        <Product data={data} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get("http://localhost:3000/api/oprator");
    const data = response.data.product;
    const paths = data.map((products) => ({
      params: {
        oprator: products.oprator.toString(),
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
  const oprator = contex?.params?.oprator || null;
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(`products-oprator-${oprator}`, () =>
      getProduct(oprator)
    );
    const dehydratedState = { dehydratedState: dehydrate(queryClient) };
    return {
      props: {
        dehydratedState,
        oprator,
      },
    };
  } catch (err) {
    console.error(err);
  }
}
