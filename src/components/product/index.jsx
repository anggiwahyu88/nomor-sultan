import { useEffect, useState } from "react";
import { rupiahConvert } from "../../../src/utils/rupiahConvert";
import dynamic from "next/dynamic";
import ProductSkeleton from "./skeleton";

// import Card from "../card";

const Card = dynamic(() => import("../card"), {
  ssr: false,
  loading: () => <ProductSkeleton />,
});
const NotFound = dynamic(() => import("../notFound"), {
  ssr: false,
});

export default function Product({
  data,
  totalProductDisplayed,
  setTotalProductDisplayed,
}) {
  const [filterData, setFilterData] = useState(data);
  useEffect(() => {
    setFilterData(data);
  }, [data]);

  useEffect(() => {
    if (totalProductDisplayed && data) {
      if (data.length - 1 <= totalProductDisplayed) {
        setTotalProductDisplayed(false);
      }
      setFilterData(data.slice(0, totalProductDisplayed));
    }
  }, [totalProductDisplayed, data, setTotalProductDisplayed]);

  if (!filterData) return <NotFound />;
  return (
    <div className="flex justify-evenly flex-wrap gap-[1.2vmax]">
      {filterData.map((products, i) => {
        const price = rupiahConvert(products.harga);
        return <Card key={i} data={products} price={price} />;
      })}
    </div>
  );
}
