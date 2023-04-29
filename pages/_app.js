import { useState, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import { ItemContext } from "../src/utils/provider";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingPage = dynamic(() => import("../src/components/loadingPage"), {
  ssr: false,
});
const Loading = dynamic(() => import("../src/components/loading"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
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

  const [loading, setLoading] = useState(false);
  const [slide, setSlide] = useState();

  useEffect(() => {
    if (device1) setSlide(4);
    else if (device2) setSlide(2);
    else if (device3) setSlide(3);
    else if (device4) setSlide(1);
    else setSlide(5);
  }, [device1, device2, device3, device4]);

  return (
    <ItemContext.Provider value={{ setLoading, slide }}>
      <SkeletonTheme baseColor="#d1d5db" highlightColor="rgba(255,255,255,.56)">
        <div className="w-full h-screen bg-gray-100 relative flex flex-col ">
          {loading && <Loading />}
          <LoadingPage />
          <Component {...pageProps} />
        </div>
      </SkeletonTheme>
    </ItemContext.Provider>
  );
}
