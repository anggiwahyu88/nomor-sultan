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

export default function oprator({ products, oprator }) {
  return (
    <>
      <Navbar />
      <main className="pt-[9vmax] h-screen bg-white">
        <div className="mt-[2vmax] bg-white h-[5.5vmax] flex text-[2.6vmax] border-b">
          <h1 className="m-auto uppercase">{oprator}</h1>
        </div>
        <Product data={products} />
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
  let products;
  try {
    const response = await axios.get(
      `http://localhost:3000/api/product/oprator/${oprator}`
    );
    products = response.data.product;
    return {
      props: { products, oprator },
      revalidate: 60,
    };
  } catch {
    return {
      props: { products, oprator },
      revalidate: 60,
    };
  }
}
