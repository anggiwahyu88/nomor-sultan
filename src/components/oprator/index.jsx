import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ListOprator from "./list-oprator";

export default function Oprator() {
  const devaice = useMediaQuery({
    query: "(min-width: 68.5vmax)",
  });

  const [isDesktop, setIsDesktop] = useState();
  const [speed, setSpeed] = useState("");

  useEffect(() => {
    const width = Math.round(screen.width / 125);
    setSpeed(width);
    setIsDesktop(devaice);
  }, [devaice]);

  if(isDesktop !== undefined){
  return (
    <div
      className={`relative bg-white ${isDesktop === true ? "h-[26vmax]":"h-[36vmax]"
      }`}
    >
      {speed && (
        <marquee
          className="top-[10.6vmax] solid-y absolute"
          direction="left"
          scrollamount={speed}
        >
          <p className="font-semibold text-[4vmax] capitalize">
            melayani transaksi via{" "}
            <span style={{ color: "tomato" }}>Shopee</span>{" "}
            <span style={{ color: "green" }}>Tokopedia</span>{" "}
            <span style={{ color: "crimson" }}>Bukalapak</span>
          </p>
        </marquee>
      )}
      <div
        className={`absolute  md: w-full ${isDesktop && "h-[32%] bottom-0 "}${
          isDesktop === false && "h-[40%] bottom-[3.5%]"
        } `}
      >
        <div className="relative w-full h-full flex flex-wrap">
          <ListOprator title={"AXIS"} isDesktop={isDesktop} />
          <ListOprator title={"IM3"} isDesktop={isDesktop} />
          <ListOprator title={"AS"} isDesktop={isDesktop} />
          <ListOprator title={"HALO"} isDesktop={isDesktop} />
          <ListOprator title={"SIMPATI"} isDesktop={isDesktop} />
          <ListOprator title={"XL"} isDesktop={isDesktop} />
          <ListOprator title={"SMARTFREN"} isDesktop={isDesktop} />
          <ListOprator title={"THREE"} isDesktop={isDesktop} />
        </div>
      </div>
    </div>
  );}
}
