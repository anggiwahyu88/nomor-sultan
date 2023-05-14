import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SkeletonTheme } from "react-loading-skeleton";
import { ItemContext } from "../src/utils/provider";
import { useState } from "react";
import { Hydrate } from "react-query/hydration";
import dynamic from "next/dynamic";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";

const queryClient = new QueryClient();

const LoadingPage = dynamic(() => import("../src/components/loadingPage"), {
  ssr: false,
});
const Loading = dynamic(() => import("../src/components/loading"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ItemContext.Provider value={{ setLoading }}>
          <SkeletonTheme
            baseColor="#d1d5db"
            highlightColor="rgba(255,255,255,.56)"
          >
            <div className="w-full h-screen bg-gray-100 relative flex flex-col ">
              {loading && <Loading />}
              <LoadingPage />
              <Component {...pageProps} />
            </div>
          </SkeletonTheme>
          <ReactQueryDevtools />
        </ItemContext.Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
