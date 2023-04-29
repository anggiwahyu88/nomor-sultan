import Link from "next/link";

export default function Card({ data, key, price }) {
  return (
    <Link
      key={key}
      href={{
        pathname: "/nomor",
      }}
      className="solid w-[16vmax] h-[20vmax] rounded-[1.5vmax] flex-wrap text-center text-[2.3vmax] hover:text-red-500 p-[1vmax] flex"
    >
      <div className="h-full w-full rounded-[1.5vmax] relative">
        <div className="absolute top-[6%] solid rounded-full h-[5vmax] w-[5vmax]"></div>
        <div className="h-[30%] absolute top-[42%] font-bold text-[2vmax] flex border-bottom">
          <p className="my-auto">{data.nomor}</p>
        </div>
        <div className="absolute bottom-[2%] font-bold text-[1.5vmax]  text-secondary">
          <p>{price}</p>
        </div>
      </div>
    </Link>
  );
}
