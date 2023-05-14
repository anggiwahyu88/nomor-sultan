import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { SwiperSlide, Swiper } from "swiper/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rupiahConvert } from "../../../src/utils/rupiahConvert";
import { useQuery } from "react-query";
import Link from "next/link";
import SkeletonKoleksi from "./skeleton-koleksi";
import Card from "../card";
import "swiper/css";

export default function KoleksiTerbaik({ title, slide, getProductKoleksi }) {
  const [my_swiper, set_my_swiper] = useState({});
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [onSwiper, setOnSwiper] = useState(true);

  const { data } = useQuery(
    `products-koleksi-${title}`,
    () => getProductKoleksi(title),
    {
      refetchInterval: 20000,
    }
  );

  const handleNextSlide = () => {
    my_swiper.slideTo(+slide);
  };

  const handlePrevSlide = () => {
    my_swiper.slideTo(-slide);
  };

  useEffect(() => {
    setIsEnd(my_swiper.isEnd);
    setIsBeginning(my_swiper.isBeginning);
  }, [my_swiper.isEnd, my_swiper.isBeginning]);

  if (!slide) return <SkeletonKoleksi />;

  return (
    <>
      <section className="h-[30vmax] relative mt-4 bg-white">
        <div className="h-[20%] border-b capitalize text-[2vmax] flex items-center">
          <p className="pl-[15px]">Produk {title}</p>
          <Link
            className="absolute right-[15px] hover:text-[red]"
            href={`produk/${title}`}
          >
            Lihat Semua
          </Link>
        </div>

        <div className="flex relative w-full h-[80%] items-center pl-[1vw]">
          {!isBeginning && (
            <button
              onClick={() => handlePrevSlide()}
              className="text-[2.5vmax] absolute left-3 rounded-full hover:text-white hover:bg-slate-200 z-[2] h-[3.8vmax] w-[3.8vmax] flex"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="m-auto" />
            </button>
          )}

          <Swiper
            slidesPerView={slide}
            onInit={(ev) => {
              set_my_swiper(ev);
            }}
            onSlideChange={() => setOnSwiper(!onSwiper)}
            speed={1100}
            className="flex"
          >
            {data &&
              data.map((products, i) => {
                const price = rupiahConvert(products.harga);
                return (
                  <SwiperSlide key={i}>
                    <Card data={products} price={price} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          {!isEnd && (
            <button
              onClick={() => handleNextSlide()}
              className="text-[2.5vmax] absolute right-3 rounded-full hover:text-white hover:bg-slate-200 z-[2] h-[3.8vmax] w-[3.8vmax] flex"
            >
              <FontAwesomeIcon icon={faAngleRight} className="m-auto" />
            </button>
          )}
        </div>
      </section>
    </>
  );
}
