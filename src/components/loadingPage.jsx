import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

export default function LoadingPage() {
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      ref.current.continuousStart();
    };

    const handleRouteChangeComplete = () => {
      ref.current.complete();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <LoadingBar
      color="#6c7afa"
      ref={ref}
      shadow={false}
      className="mt-[9vmax]"
    />
  );
}
